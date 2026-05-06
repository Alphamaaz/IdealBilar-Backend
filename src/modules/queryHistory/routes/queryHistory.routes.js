import express from "express";
import {
  recordQueryController,
  getAllQueriesController,
  getOrdersHistoryController,
  clearHistoryController,
  deleteQueryRecordController,
  getQueryRecordController,
} from "../controllers/queryHistory.controller.js";
import { middlewareForVerifyJwtToken } from "../../../shared/middlewares/auth.middleware.js";

const Router = express.Router();

// User routes (requires authentication)

// Record a new query
Router.post(
  "/query-history/record",
  middlewareForVerifyJwtToken,
  recordQueryController
);

// Get orders/bookings history for authenticated user
Router.get(
  "/query-history",
  middlewareForVerifyJwtToken,
  getOrdersHistoryController
);

// Get raw query logs for authenticated user
Router.get(
  "/query-history/logs",
  middlewareForVerifyJwtToken,
  getAllQueriesController
);

// Get specific query record
Router.get(
  "/query-history/:queryId",
  middlewareForVerifyJwtToken,
  getQueryRecordController
);

// Delete specific query record
Router.delete(
  "/query-history/:queryId",
  middlewareForVerifyJwtToken,
  deleteQueryRecordController
);

// Clear all query history
Router.delete(
  "/query-history",
  middlewareForVerifyJwtToken,
  clearHistoryController
);

export default Router;
