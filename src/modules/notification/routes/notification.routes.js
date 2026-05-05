import { Router } from "express";
import {
  notificationController,
  getAllNotificationController,
  getSingleNotificationController,
  updateNotificationController,
  deleteNotificationController,
  markAsReadController,
  markAllAsReadController,
  getNotificationsCountController,
  deleteAllNotificationController,
  getUserNotificationsController,
  getUserNotificationsCountController,
  markUserNotificationAsReadController,
} from "../controllers/notification.controller.js";
import { middlewareForVerifyJwtToken } from "../../../shared/middlewares/auth.middleware.js";

const router = Router();

// Admin notification endpoints
router.post("/notification", notificationController);
router.get("/notification", getAllNotificationController);
router.get("/notification/count", getNotificationsCountController);
router.delete("/notification", deleteAllNotificationController);
router.get("/notification/:id", getSingleNotificationController);
router.put("/notification/:id", updateNotificationController);
router.delete("/notification/:id", deleteNotificationController);
router.patch("/notification/read-all", markAllAsReadController);
router.patch("/notification/:id/read", markAsReadController);

// User notification endpoints (for chat message notifications)
router.get("/my-notifications", middlewareForVerifyJwtToken, getUserNotificationsController);
router.get("/my-notifications/count", middlewareForVerifyJwtToken, getUserNotificationsCountController);
router.patch("/my-notifications/:id/read", middlewareForVerifyJwtToken, markUserNotificationAsReadController);

export default router;