// Internal modules
import * as queryHistoryService from "../services/queryHistory.service.js";

// Helper function to handle service results
const handleServiceResult = (res, result, successStatus = 200) => {
  if (result instanceof Error) {
    return res.status(500).json({
      success: false,
      message: result.message,
    });
  }

  if (!result.success) {
    return res.status(result.status || 500).json(result);
  }

  return res.status(result.status || successStatus).json(result);
};

// Record a new query
export const recordQueryController = async (req, res) => {
  try {
    const userId = req.userId;
    const { queryType, module, searchQuery, metadata, status, notes } = req.body;

    const queryData = {
      queryType,
      module,
      searchQuery: searchQuery || null,
      metadata: metadata || {},
      status: status || "completed",
      notes: notes || null,
    };

    const result = await queryHistoryService.recordQuery(userId, queryData);
    return handleServiceResult(res, result, 201);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to record query",
      error: err.message,
    });
  }
};

// Get all queries for authenticated user
export const getAllQueriesController = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 20, queryType, module, sortBy = "createdAt", sortOrder = -1 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      queryType: queryType || null,
      module: module || null,
      sortBy,
      sortOrder: parseInt(sortOrder),
    };

    const result = await queryHistoryService.getAllUserQueries(userId, options);
    return handleServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch query history",
      error: err.message,
    });
  }
};

// Clear all query history
export const clearHistoryController = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await queryHistoryService.clearAllQueryHistory(userId);
    return handleServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to clear query history",
      error: err.message,
    });
  }
};

// Delete specific query record
export const deleteQueryRecordController = async (req, res) => {
  try {
    const { queryId } = req.params;
    const result = await queryHistoryService.deleteQueryRecord(queryId);
    return handleServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete query record",
      error: err.message,
    });
  }
};

// Get single query record
export const getQueryRecordController = async (req, res) => {
  try {
    const { queryId } = req.params;

    const result = await queryHistoryService.getQueryRecord(queryId);
    return handleServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch query record",
      error: err.message,
    });
  }
};
