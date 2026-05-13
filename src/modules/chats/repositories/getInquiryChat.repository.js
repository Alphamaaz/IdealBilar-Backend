import Chat from '../models/chat.model.js';
import Message from '../models/chatMessage.model.js';
import RentACarBooking from '../../rentACarInquiry/models/rentACarBookingInquery.model.js';
import { BuyACar } from '../../buyACar/models/buyACar.model.js';
import DovraInquiry from '../../Dovra/models/dovraInquiry.model.js';
import CarWashBooking from '../../carWash/models/carWashBooking.model.js';

const fetchInquiry = async (inquiryType, inquiryId) => {
  switch (inquiryType) {
    case 'rentACarInquiry':
      return RentACarBooking.findById(inquiryId)
        .populate('carId', 'title make model year thumbnail pricing location')
        .lean();
    case 'buyACar':
      return BuyACar.findById(inquiryId)
        .select('carData name subject message status strategy lease')
        .lean();
    case 'dovra':
      return DovraInquiry.findById(inquiryId)
        .select('carImage firstName lastName interestedIn inquiryPreferences status')
        .lean();
    case 'carWash':
      return CarWashBooking.findById(inquiryId)
        .select('vehicleType carBrandAndModel selectedServices bookingDate bookingTime estimatedDurationHours totalEstimate currency status')
        .lean();
    case 'general':
      return {
        _id: inquiryId,
        type: 'General',
        title: 'General Support',
      };
    default:
      return null;
  }
};

const getInquiryChatRepository = async (inquiryId) => {
  const chatId = inquiryId.toString();

  const [chat, messages] = await Promise.all([
    Chat.findById(chatId).lean(),
    Message.find({ chatId })
      .sort({ createdAt: 1 })
      .limit(50)
      .select('_id sender message status createdAt')
      .lean(),
  ]);

  if (!chat) return null;

  const inquiry = await fetchInquiry(chat.inquiryType, chatId);

  return { chat, messages, inquiry };
};

export { getInquiryChatRepository };
