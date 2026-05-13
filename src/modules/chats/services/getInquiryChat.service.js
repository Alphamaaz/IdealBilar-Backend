import { getInquiryChatRepository } from '../repositories/getInquiryChat.repository.js';

const formatInquiryDetails = (inquiryType, inquiry) => {
  if (!inquiry) return null;

  switch (inquiryType) {
    case 'rentACarInquiry':
      return {
        id: inquiry._id,
        type: 'Rent a Car',
        car: inquiry.carId ? {
          id: inquiry.carId._id,
          title: inquiry.carId.title,
          make: inquiry.carId.make,
          model: inquiry.carId.model,
          year: inquiry.carId.year,
          thumbnail: inquiry.carId.thumbnail,
          pricePerDay: inquiry.carId.pricing?.perDay,
          currency: inquiry.carId.pricing?.currency,
          location: inquiry.carId.location,
        } : null,
        pickupLocation: inquiry.pickupLocation,
        pickupDate: inquiry.pickupDate,
        returnDate: inquiry.returnDate,
        perDayRent: inquiry.perDayRent,
        totalRent: inquiry.totalRent,
        status: inquiry.status,
      };

    case 'buyACar':
      return {
        id: inquiry._id,
        type: 'Buy a Car',
        car: inquiry.carData ? {
          name: inquiry.carData.name,
          brand: inquiry.carData.brand,
          model: inquiry.carData.model,
          thumbnail: inquiry.carData.thumbnail,
          vehicleType: inquiry.carData.vehicleType,
          fuel: inquiry.carData.fuel,
          gearbox: inquiry.carData.gearbox,
        } : null,
        subject: inquiry.subject,
        message: inquiry.message,
        pricing: inquiry.strategy
          ? { paymentType: 'strategy', ...inquiry.strategy }
          : inquiry.lease
          ? { paymentType: 'lease', ...inquiry.lease }
          : null,
        status: inquiry.status,
      };

    case 'dovra':
      return {
        id: inquiry._id,
        type: 'Dovra',
        carImage: inquiry.carImage,
        customer: `${inquiry.firstName} ${inquiry.lastName}`,
        interestedIn: inquiry.interestedIn,
        preferences: inquiry.inquiryPreferences,
        status: inquiry.status,
      };

    case 'carWash':
      return {
        id: inquiry._id,
        type: 'Car Wash',
        vehicle: inquiry.carBrandAndModel,
        vehicleType: inquiry.vehicleType,
        services: inquiry.selectedServices,
        schedule: {
          date: inquiry.bookingDate,
          time: inquiry.bookingTime,
          durationHours: inquiry.estimatedDurationHours,
        },
        totalEstimate: inquiry.totalEstimate,
        currency: inquiry.currency,
        status: inquiry.status,
      };

    case 'general':
      return {
        id: inquiry._id,
        type: 'General',
        title: inquiry.title || 'General Support',
      };

    default:
      return null;
  }
};

const formatMessages = (messages) =>
  messages.map((m) => ({
    id: m._id,
    message: m.message,
    sender: {
      id: m.sender.id,
      name: m.sender.name,
      type: m.sender.type,
    },
    status: m.status,
    sentAt: m.createdAt,
  }));

const getInquiryChatService = async (inquiryId, callerRole) => {
  const raw = await getInquiryChatRepository(inquiryId);
  if (!raw) return null;

  const { chat, messages, inquiry } = raw;

  return {
    chatId: chat._id,
    inquiryType: chat.inquiryType,
    status: chat.status,
    unreadCount: callerRole === 'admin' ? chat.adminUnreadCount : chat.userUnreadCount,
    user: chat.user,
    lastMessage: chat.lastMessage || null,
    lastMessageAt: chat.lastMessageAt || null,
    inquiry: formatInquiryDetails(chat.inquiryType, inquiry),
    messages: formatMessages(messages),
  };
};

export { getInquiryChatService };
