import { Router } from "express";
import { adminOnlyMiddleware } from "../../../shared/middlewares/adminOnlyAuth.moddleware.js";
import { middlewareForVerifyJwtToken } from "../../../shared/middlewares/auth.middleware.js";
import { getDashboardSummaryController } from "../controllers/dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.get(
  "/dashboard-summary",
  middlewareForVerifyJwtToken,
  adminOnlyMiddleware,
  getDashboardSummaryController,
);

export default dashboardRouter;
