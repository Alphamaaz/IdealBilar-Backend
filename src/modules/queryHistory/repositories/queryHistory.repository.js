// Internal modules
import QueryHistory from "../models/queryHistory.model.js";
import CarWashBooking from "../../carWash/models/carWashBooking.model.js";
import RentACarBooking from "../../rentACarInquiry/models/rentACarBookingInquery.model.js";
import DovraInquiry from "../../Dovra/models/dovraInquiry.model.js";
import { BuyACar } from "../../buyACar/models/buyACar.model.js";
import Chat from "../../chats/models/chat.model.js";

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

const normalizePagination = (value, fallback) => {
  const parsedValue = Number.parseInt(value, 10);
  return Number.isNaN(parsedValue) || parsedValue <= 0 ? fallback : parsedValue;
};

const formatCurrencyAmount = (value, currency = "SEK") => ({
  value: value ?? null,
  currency: value == null ? null : currency,
  display:
    value == null
      ? null
      : `${currency} ${value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
});

const buildReference = (prefix, id) => `${prefix}-${id.toString().slice(-6).toUpperCase()}`;

const normalizeStatusFilter = (status) => {
  if (!status || typeof status !== "string") {
    return null;
  }

  return status.trim().toLowerCase();
};

const mapRequestedStatusToRentStatuses = (status) => {
  if (!status) return null;
  return [status];
};

const mapRequestedStatusToCarWashStatuses = (status) => {
  if (!status) return null;

  switch (status) {
    case "upcoming":
      return ["pending", "confirmed"];
    case "completed":
      return ["completed"];
    case "cancelled":
      return ["cancelled"];
    case "pending":
      return ["pending"];
    case "confirmed":
      return ["confirmed"];
    default:
      return [status];
  }
};

const mapRequestedStatusToDovraStatuses = (status) => {
  if (!status) return null;

  switch (status) {
    case "upcoming":
      return ["pending", "contacted"];
    case "completed":
      return ["closed"];
    default:
      return [status];
  }
};

const mapRequestedStatusToBuyCarStatuses = (status) => {
  if (!status) return null;

  switch (status) {
    case "upcoming":
      return ["pending"];
    case "completed":
      return ["approved"];
    case "cancelled":
      return ["rejected"];
    default:
      return [status];
  }
};

const normalizeHistoryStatus = (bookingType, rawStatus) => {
  const normalizedStatus = normalizeStatusFilter(rawStatus);

  if (!normalizedStatus) {
    return "pending";
  }

  if (bookingType === "carWash") {
    if (["pending", "confirmed"].includes(normalizedStatus)) {
      return "upcoming";
    }
    return normalizedStatus;
  }

  if (bookingType === "dovra") {
    if (["pending", "contacted"].includes(normalizedStatus)) {
      return "pending";
    }
    if (normalizedStatus === "closed") {
      return "completed";
    }
    return normalizedStatus;
  }

  if (bookingType === "buyACar") {
    if (normalizedStatus === "approved") {
      return "completed";
    }
    if (normalizedStatus === "rejected") {
      return "cancelled";
    }
    return normalizedStatus;
  }

  return normalizedStatus;
};

const mapRentBookingHistory = (booking) => {
  const image = booking.carId?.thumbnail || booking.carId?.images?.[0]?.url || null;
  const currency = booking.carId?.pricing?.currency || "SEK";

  return {
    id: booking._id,
    bookingType: "rent",
    reference: buildReference("RB", booking._id),
    carInfo: {
      title: booking.carId?.title || `${booking.carId?.make || ""} ${booking.carId?.model || ""}`.trim() || "Rental Car",
      image,
      hasImage: Boolean(image),
      fallbackLabel: "Rental",
    },
    personalInfo: {
      name: booking.userId?.name || "Unknown User",
      phone: booking.phone || null,
      email: booking.userId?.email || null,
    },
    amount: formatCurrencyAmount(booking.totalRent, currency),
    pickupDate: booking.pickupDate,
    returnDate: booking.returnDate,
    status: normalizeHistoryStatus("rent", booking.status),
    rawStatus: booking.status,
    createdAt: booking.createdAt,
  };
};

const mapCarWashBookingHistory = (booking) => {
  const title = booking.carBrandAndModel || booking.vehicleType || "Car Wash Booking";

  return {
    id: booking._id,
    bookingType: "carWash",
    reference: buildReference("CW", booking._id),
    carInfo: {
      title,
      image: null,
      hasImage: false,
      fallbackLabel: booking.vehicleType || "Car Wash",
    },
    personalInfo: {
      name: `${booking.firstName} ${booking.lastName}`.trim(),
      phone: booking.phoneNumber || null,
      email: booking.email || null,
    },
    amount: formatCurrencyAmount(booking.totalEstimate, booking.currency || "SEK"),
    pickupDate: booking.bookingDate,
    returnDate: null,
    status: normalizeHistoryStatus("carWash", booking.status),
    rawStatus: booking.status,
    createdAt: booking.createdAt,
  };
};

const mapDovraBookingHistory = (inquiry) => {
  const dovraTitle = Array.isArray(inquiry.interestedIn)
    ? inquiry.interestedIn.join(", ")
    : inquiry.interestedIn || "Dovra Inquiry";

  return {
    id: inquiry._id,
    bookingType: "dovra",
    reference: buildReference("DV", inquiry._id),
    carInfo: {
      title: dovraTitle,
      image: inquiry.carImage || null,
      hasImage: Boolean(inquiry.carImage),
      fallbackLabel: "Dovra",
    },
    personalInfo: {
      name: `${inquiry.firstName} ${inquiry.lastName}`.trim(),
      phone: inquiry.phoneNumber || null,
      email: inquiry.email || null,
    },
    amount: formatCurrencyAmount(null),
    pickupDate: null,
    returnDate: null,
    status: normalizeHistoryStatus("dovra", inquiry.status || "pending"),
    rawStatus: inquiry.status || "pending",
    createdAt: inquiry.createdAt,
  };
};

const mapBuyACarBookingHistory = (inquiry) => {
  const amount = inquiry.strategy?.totalEstimate || inquiry.lease?.totalEstimate || null;
  const buyCarTitle =
    inquiry.carData?.title ||
    `${inquiry.carData?.make || ""} ${inquiry.carData?.model || ""}`.trim() ||
    inquiry.carData?.name ||
    "Buy a Car";

  return {
    id: inquiry._id,
    bookingType: "buyACar",
    reference: buildReference("BC", inquiry._id),
    carInfo: {
      title: buyCarTitle,
      image: inquiry.carData?.thumbnail || inquiry.carData?.images?.[0]?.url || null,
      hasImage: Boolean(inquiry.carData?.thumbnail || inquiry.carData?.images?.[0]?.url),
      fallbackLabel: "Buy a Car",
    },
    personalInfo: {
      name: inquiry.name || "Unknown",
      phone: inquiry.phoneNumber || null,
      email: null,
    },
    amount: formatCurrencyAmount(amount),
    pickupDate: null,
    returnDate: null,
    status: normalizeHistoryStatus("buyACar", inquiry.status || "pending"),
    rawStatus: inquiry.status || "pending",
    createdAt: inquiry.createdAt,
  };
};

export const getUserBookingHistory = async (userId, userEmail, options = {}) => {
  const {
    bookingType = "all",
    status = null,
    page = 1,
    limit = 10,
  } = options;

  const normalizedPage = normalizePagination(page, 1);
  const normalizedLimit = normalizePagination(limit, 10);
  const normalizedStatus = normalizeStatusFilter(status);

  const userChats = await Chat.find({ "user.id": userId })
    .select("inquiryType inquiryId")
    .lean();

  const inquiryIdsByType = userChats.reduce(
    (accumulator, chat) => {
      if (!accumulator[chat.inquiryType]) {
        accumulator[chat.inquiryType] = [];
      }

      accumulator[chat.inquiryType].push(chat.inquiryId);
      return accumulator;
    },
    {
      rentACarInquiry: [],
      carWash: [],
      dovra: [],
      buyACar: [],
    },
  );

  const rentFilter = {
    $or: [
      { userId },
      { _id: { $in: inquiryIdsByType.rentACarInquiry } },
    ],
  };
  const carWashFilter = {
    $or: [
      { userId },
      ...(userEmail ? [{ email: userEmail }] : []),
      { _id: { $in: inquiryIdsByType.carWash } },
    ],
  };
  const dovraFilter = {
    $or: [
      { userId },
      ...(userEmail ? [{ email: userEmail }] : []),
      { _id: { $in: inquiryIdsByType.dovra } },
    ],
  };
  const buyACarFilter = {
    $or: [
      { userId },
      { _id: { $in: inquiryIdsByType.buyACar } },
    ],
  };

  const rentStatuses = mapRequestedStatusToRentStatuses(normalizedStatus);
  const carWashStatuses = mapRequestedStatusToCarWashStatuses(normalizedStatus);
  const dovraStatuses = mapRequestedStatusToDovraStatuses(normalizedStatus);
  const buyCarStatuses = mapRequestedStatusToBuyCarStatuses(normalizedStatus);

  if (rentStatuses) {
    rentFilter.status = { $in: rentStatuses };
  }

  if (carWashStatuses) {
    carWashFilter.status = { $in: carWashStatuses };
  }

  if (dovraStatuses) {
    dovraFilter.status = { $in: dovraStatuses };
  }

  if (buyCarStatuses) {
    buyACarFilter.status = { $in: buyCarStatuses };
  }

  const shouldFetchRent = bookingType === "all" || bookingType === "rent";
  const shouldFetchCarWash = bookingType === "all" || bookingType === "carWash";
  const shouldFetchDovra = bookingType === "all" || bookingType === "dovra";
  const shouldFetchBuyACar = bookingType === "all" || bookingType === "buyACar";

  const [rentBookings, carWashBookings, dovraInquiries, buyACarInquiries, rentTotal, carWashTotal, dovraTotal, buyACarTotal] = await Promise.all([
    shouldFetchRent
      ? RentACarBooking.find(rentFilter)
          .populate("carId", "title make model thumbnail images pricing")
          .populate("userId", "name email")
          .lean()
      : Promise.resolve([]),
    shouldFetchCarWash
      ? CarWashBooking.find(carWashFilter)
          .populate("userId", "name email")
          .lean()
      : Promise.resolve([]),
    shouldFetchDovra
      ? DovraInquiry.find(dovraFilter).lean()
      : Promise.resolve([]),
    shouldFetchBuyACar
      ? BuyACar.find(buyACarFilter).lean()
      : Promise.resolve([]),
    RentACarBooking.countDocuments(rentFilter),
    CarWashBooking.countDocuments(carWashFilter),
    DovraInquiry.countDocuments(dovraFilter),
    BuyACar.countDocuments(buyACarFilter),
  ]);

  const combinedHistory = [
    ...rentBookings.map(mapRentBookingHistory),
    ...carWashBookings.map(mapCarWashBookingHistory),
    ...dovraInquiries.map(mapDovraBookingHistory),
    ...buyACarInquiries.map(mapBuyACarBookingHistory),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const total = combinedHistory.length;
  const pages = Math.ceil(total / normalizedLimit) || 1;
  const skip = (normalizedPage - 1) * normalizedLimit;
  const paginatedHistory = combinedHistory.slice(skip, skip + normalizedLimit);

  return {
    records: paginatedHistory,
    pagination: {
      total,
      pages,
      currentPage: normalizedPage,
      limit: normalizedLimit,
    },
    summary: {
      allBookings: rentTotal + carWashTotal + dovraTotal + buyACarTotal,
      rentBookings: rentTotal,
      carWashBookings: carWashTotal,
      dovraInquiries: dovraTotal,
      buyACarInquiries: buyACarTotal,
    },
  };
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
