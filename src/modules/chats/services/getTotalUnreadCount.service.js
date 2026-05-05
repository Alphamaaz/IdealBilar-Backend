import Chat from '../models/chat.model.js';

const getTotalUnreadCountService = async (userId, userType) => {
  try {
    let query = {};

    if (userType === 'admin') {
      // For admin, get sum of adminUnreadCount from all chats
      const result = await Chat.aggregate([
        {
          $group: {
            _id: null,
            totalUnreadCount: { $sum: '$adminUnreadCount' }
          }
        }
      ]);
      return result[0]?.totalUnreadCount || 0;
    } else {
      // For user, get sum of userUnreadCount from chats where user is the owner
      const result = await Chat.aggregate([
        {
          $match: { 'user.id': userId }
        },
        {
          $group: {
            _id: null,
            totalUnreadCount: { $sum: '$userUnreadCount' }
          }
        }
      ]);
      return result[0]?.totalUnreadCount || 0;
    }
  } catch (error) {
    throw error;
  }
};

export { getTotalUnreadCountService };
