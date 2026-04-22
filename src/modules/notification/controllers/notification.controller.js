import {
    getAllNotificationServices,
    getSingleNotificationService,
    notificationServices,
    updateNotificationService,
    deleteNotificationService,
    markAsReadService,
    markAllAsReadService,
    getNotificationsCountService,
    deleteAllNotificationService,
} from "../services/notification.service.js";

const notificationController = async (req, res) => {

    try {
        const notification = await notificationServices(req.body);
        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create notification",
            error: error.message
        });
    }
}

const getAllNotificationController = async (req, res) => {
    try {
        const notifications = await getAllNotificationServices();
        res.status(200).json({
            success: true,
            message: "Notifications fetched successfully",
            data: notifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch notifications",
            error: error.message
        });
    }
}

const getSingleNotificationController = async (req, res) => {
    try {
        const notification = await getSingleNotificationService(req.params.id);
        res.status(200).json({
            success: true,
            message: "Notification fetched successfully",
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch notification",
            error: error.message
        });
    }
}

const updateNotificationController = async (req, res) => {
    try {
        const notification = await updateNotificationService(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Notification updated successfully",
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update notification",
            error: error.message
        });
    }
}

const deleteAllNotificationController = async (req, res) => {
    try {
        const notification = await deleteAllNotificationService();
        res.status(200).json({
            success: true,
            message: "All notifications deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete all notifications",
            error: error.message
        });
    }
}

const deleteNotificationController = async (req, res) => {
    try {
        const notification = await deleteNotificationService(req.params.id);
        res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete notification",
            error: error.message
        });
    }
}

const markAsReadController = async (req, res) => {
    try {
        const notification = await markAsReadService(req.params.id);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }
        res.status(200).json({
            success: true,
            message: "Notification marked as read",
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to mark notification as read",
            error: error.message
        });
    }
}

const markAllAsReadController = async (req, res) => {
    try {
        await markAllAsReadService();
        res.status(200).json({
            success: true,
            message: "All notifications marked as read",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to mark all notifications as read",
            error: error.message
        });
    }
}

const getNotificationsCountController = async (req, res) => {
    try {
        const count = await getNotificationsCountService();
        res.status(200).json({
            success: true,
            message: "Notifications count fetched successfully",
            data: { count }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch notifications count",
            error: error.message
        });
    }
}

export { notificationController, getAllNotificationController, getSingleNotificationController, updateNotificationController, deleteNotificationController, markAsReadController, markAllAsReadController, getNotificationsCountController, deleteAllNotificationController };