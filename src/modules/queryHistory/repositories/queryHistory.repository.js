// Internal modules
import QueryHistory from "../models/queryHistory.model.js";

// Create a new query history record
export const createQueryHistory = async (queryData) => {
  try {
    const queryHistory = new QueryHistory(queryData);
    return await queryHistory.save();
  } catch (error) {
    throw error;
  }
};

// Get all queries for a specific user
export const getUserQueryHistory = async (userId, options = {}) => {
  try {
    const {
      page = 1,
      limit = 20,
      queryType = null,
      module = null,
      sortBy = "createdAt",
      sortOrder = -1,
    } = options;

    const skip = (page - 1) * limit;
    const filter = { userId };

    if (queryType) {
      filter.queryType = queryType;
    }

    if (module) {
      filter.module = module;
    }

    const queries = await QueryHistory.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await QueryHistory.countDocuments(filter);

    return {
      queries,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Get single query history record
export const getQueryHistoryById = async (id) => {
  try {
    return await QueryHistory.findById(id).lean();
  } catch (error) {
    throw error;
  }
};

// Get user's query statistics
export const getUserQueryStatistics = async (userId, timeRange = null) => {
  try {
    const filter = { userId };

    if (timeRange) {
      const now = new Date();
      let startDate;

      switch (timeRange.toLowerCase()) {
        case "7days":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30days":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "90days":
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      filter.createdAt = { $gte: startDate };
    }

    const stats = await QueryHistory.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalQueries: { $sum: 1 },
          byQueryType: {
            $push: {
              queryType: "$queryType",
              count: 1,
            },
          },
          byModule: {
            $push: {
              module: "$module",
              count: 1,
            },
          },
          avgDuration: { $avg: "$duration" },
          totalDuration: { $sum: "$duration" },
        },
      },
    ]);

    // Process aggregation results
    if (stats.length > 0) {
      const result = stats[0];

      // Count by query type
      const queryTypeCounts = {};
      const moduleCounts = {};

      await QueryHistory.find(filter).then((records) => {
        records.forEach((record) => {
          queryTypeCounts[record.queryType] =
            (queryTypeCounts[record.queryType] || 0) + 1;
          moduleCounts[record.module] = (moduleCounts[record.module] || 0) + 1;
        });
      });

      return {
        totalQueries: result.totalQueries,
        avgDuration: Math.round(result.avgDuration),
        totalDuration: result.totalDuration,
        byQueryType: queryTypeCounts,
        byModule: moduleCounts,
      };
    }

    return {
      totalQueries: 0,
      avgDuration: 0,
      totalDuration: 0,
      byQueryType: {},
      byModule: {},
    };
  } catch (error) {
    throw error;
  }
};

// Search user query history
export const searchUserQueries = async (userId, searchTerm, options = {}) => {
  try {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;

    const queries = await QueryHistory.find({
      userId,
      $or: [
        { searchQuery: { $regex: searchTerm, $options: "i" } },
        { notes: { $regex: searchTerm, $options: "i" } },
        { queryType: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await QueryHistory.countDocuments({
      userId,
      $or: [
        { searchQuery: { $regex: searchTerm, $options: "i" } },
        { notes: { $regex: searchTerm, $options: "i" } },
        { queryType: { $regex: searchTerm, $options: "i" } },
      ],
    });

    return {
      queries,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Delete user's entire query history
export const deleteUserQueryHistory = async (userId) => {
  try {
    const result = await QueryHistory.deleteMany({ userId });
    return result.deletedCount;
  } catch (error) {
    throw error;
  }
};

// Delete specific query record
export const deleteQueryHistoryRecord = async (queryId) => {
  try {
    const result = await QueryHistory.findByIdAndDelete(queryId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Get trending queries across all users (Admin purpose)
export const getTrendingQueries = async (limit = 10) => {
  try {
    return await QueryHistory.aggregate([
      {
        $group: {
          _id: "$searchQuery",
          count: { $sum: 1 },
          lastSearched: { $max: "$createdAt" },
        },
      },
      { $match: { _id: { $ne: null } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);
  } catch (error) {
    throw error;
  }
};

// Get popular modules
export const getPopularModules = async (limit = 10) => {
  try {
    return await QueryHistory.aggregate([
      {
        $group: {
          _id: "$module",
          count: { $sum: 1 },
          avgDuration: { $avg: "$duration" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);
  } catch (error) {
    throw error;
  }
};

// Update query history record
export const updateQueryHistory = async (queryId, updateData) => {
  try {
    return await QueryHistory.findByIdAndUpdate(queryId, updateData, {
      new: true,
    });
  } catch (error) {
    throw error;
  }
};
