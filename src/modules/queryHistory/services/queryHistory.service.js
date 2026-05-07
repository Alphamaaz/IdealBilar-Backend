// Internal modules
import * as queryHistoryRepository from "../repositories/queryHistory.repository.js";
import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import { default as User } from "../../user/models/user.model.js";

// Create a new query history record
export const recordQuery = async (userId, queryData) => {
  try {
    const data = {
      userId,
      ...queryData,
      ipAddress: queryData.ipAddress || null,
      userAgent: queryData.userAgent || null,
    };

    const newQuery = await queryHistoryRepository.createQueryHistory(data);

    return {
      success: true,
      status: 201,
      message: "Query recorded successfully",
      data: newQuery,
    };
  } catch (error) {
    console.error("Error recording query:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to record query",
      error: error.message,
    };
  }
};

// Get all queries for a user
export const getAllUserQueries = async (userId, options) => {
  try {
    const result = await queryHistoryRepository.getUserQueryHistory(
      userId,
      options
    );

    if (!result.queries || result.queries.length === 0) {
      return {
        success: true,
        status: 200,
        message: "No query history found",
        data: [],
        pagination: result.pagination,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Query history retrieved successfully",
      data: result.queries,
      pagination: result.pagination,
    };
  } catch (error) {
    console.error("Error fetching query history:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to fetch query history",
      error: error.message,
    };
  }
};

export const getUserOrdersHistory = async (userId, options) => {
  try {
    // Fetch user email
    const user = await User.findById(userId).lean();
    const userEmail = user?.email || null;

    const result = await queryHistoryRepository.getUserBookingHistory(userId, userEmail, options);

    return {
      success: true,
      status: 200,
      message: result.records.length
        ? "Order history retrieved successfully"
        : "No order history found",
      data: result.records,
      pagination: result.pagination,
      summary: result.summary,
    };
  } catch (error) {
    console.error("Error fetching order history:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to fetch order history",
      error: error.message,
    };
  }
};

// Clear all user query history
export const clearAllQueryHistory = async (userId) => {
  try {
    const deletedCount =
      await queryHistoryRepository.deleteUserQueryHistory(userId);

    return {
      success: true,
      status: 200,
      message: `${deletedCount} query records deleted successfully`,
      data: { deletedCount },
    };
  } catch (error) {
    console.error("Error clearing query history:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to clear query history",
      error: error.message,
    };
  }
};

// Delete specific query record
export const deleteQueryRecord = async (queryId) => {
  try {
    const deletedRecord =
      await queryHistoryRepository.deleteQueryHistoryRecord(queryId);

    if (!deletedRecord) {
      return {
        success: false,
        status: 404,
        message: "Query record not found",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Query record deleted successfully",
      data: deletedRecord,
    };
  } catch (error) {
    console.error("Error deleting query record:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to delete query record",
      error: error.message,
    };
  }
};

// Get single query record
export const getQueryRecord = async (queryId) => {
  try {
    const query =
      await queryHistoryRepository.getQueryHistoryById(queryId);

    if (!query) {
      return {
        success: false,
        status: 404,
        message: "Query record not found",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Query record retrieved successfully",
      data: query,
    };
  } catch (error) {
    console.error("Error fetching query record:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to fetch query record",
      error: error.message,
    };
  }
};
