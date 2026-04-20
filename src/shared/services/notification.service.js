import Notification from "../modules/notification/models/notification.model.js";

/**
 * Creates a notification for a user.
 *
 * @param {Object} req - Express request object (containing req.user)
 * @param {string} message - The notification message
 * @param {string} userId - The ID of the user to notify
 */
export const createNotification = async (req, message, userId) => {
  try {
    const user = req.user;

    if (!user) {
      console.warn("Attempted to create notification without authenticated user");
      return;
    }

    // Create the notification
    await Notification.create({
      userId: userId || user._id,
      message: message,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

 * @param {string} resourceName - Name or title of the resource for display
 * @param {Object} [changes=null] - Object containing changes (optional)
 * @param {string} [details=""] - Additional details about the action (optional)
 */
export const logAdminActivity = async (
  req,
  action,
  resourceType,
  resource,
  resourceName,
  changes = null,
  details = "",
) => {
  try {
    const user = req.user;

    if (!user) {
      console.warn(
        "Attempted to log admin activity without authenticated user",
      );
      return;
    }

    // Do NOT log if user is super_admin
    if (user.role === "super_admin" || user.userType === "super_admin") {
      return;
    }

    // Create the activity log
    await AdminActivityLog.create({
      user: user._id,
      action,
      resourceType,
      resourceId: resource._id,
      resourceName: resourceName || "Unknown Resource",
      changes,
      details,
    });
  } catch (error) {
    // Log error but don't stop execution flow - logging shouldn't break the app
    console.error("Error logging admin activity:", error);
  }
};
