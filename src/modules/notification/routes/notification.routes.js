import { Router } from "express";
import { notificationController, getAllNotificationController, getSingleNotificationController, updateNotificationController, deleteNotificationController, markAsReadController, markAllAsReadController } from "../controllers/notification.controller.js";

const router = Router();

router.post("/notification", notificationController);
router.get("/notification", getAllNotificationController);
router.get("/notification/:id", getSingleNotificationController);
router.put("/notification/:id", updateNotificationController);
router.delete("/notification/:id", deleteNotificationController);

// Mark as read endpoints
router.patch("/notification/read-all", markAllAsReadController);
router.patch("/notification/:id/read", markAsReadController);

export default router;