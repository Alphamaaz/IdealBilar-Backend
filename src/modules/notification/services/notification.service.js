import { Notification } from "../models/notification.model.js";

const notificationServices = async (validatedData) => {
    try {
        const { type, message, model, name, referenceId } = validatedData;
        const notification = await Notification.create({
            type,
            message,
            model,
            name,
            referenceId,
        });
        return notification;
    } catch (error) {
        throw error;
    }
}

const getAllNotificationServices = async () => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        return notifications;
    } catch (error) {
        throw error;
    }
}

const getNotificationsCountService = async () => {
    try {
        const count = await Notification.countDocuments({ isRead: false });
        return count;
    } catch (error) {
        throw error;
    }
}

const getSingleNotificationService = async (id) => {
    try {
        const notification = await Notification.findById(id);
        return notification;
    } catch (error) {
        throw error;
    }
}

const updateNotificationService = async (id, validatedData) => {
    try {
        const notification = await Notification.findByIdAndUpdate(id, validatedData, { new: true });
        return notification;
    } catch (error) {
        throw error;
    }
}

const deleteNotificationService = async (id) => {
    try {
        const notification = await Notification.findByIdAndDelete(id);
        return notification;
    } catch (error) {
        throw error;
    }
}

const markAsReadService = async (id) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );
        return notification;
    } catch (error) {
        throw error;
    }
}

const markAllAsReadService = async () => {
    try {
        await Notification.updateMany({ isRead: false }, { isRead: true });
        return true;
    } catch (error) {
        throw error;
    }
}

const deleteAllNotificationService = async () => {
    try {
        await Notification.deleteMany();
        return true;
    } catch (error) {
        throw error;
    }
}

const getUserNotificationsService = async (userId) => {
    try {
        const notifications = await Notification.find({ recipientId: userId, recipientType: 'user' })
            .sort({ createdAt: -1 });
        return notifications;
    } catch (error) {
        throw error;
    }
}

const getUserNotificationsCountService = async (userId) => {
    try {
        const count = await Notification.countDocuments({ recipientId: userId, recipientType: 'user', isRead: false });
        return count;
    } catch (error) {
        throw error;
    }
}

const markUserNotificationAsReadService = async (id, userId) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: id, recipientId: userId, recipientType: 'user' },
            { isRead: true },
            { new: true }
        );
        return notification;
    } catch (error) {
        throw error;
    }
}

export {
    notificationServices,
    getAllNotificationServices,
    getSingleNotificationService,
    updateNotificationService,
    deleteNotificationService,
    markAsReadService,
    markAllAsReadService,
    getNotificationsCountService,
    deleteAllNotificationService,
    getUserNotificationsService,
    getUserNotificationsCountService,
    markUserNotificationAsReadService,
};