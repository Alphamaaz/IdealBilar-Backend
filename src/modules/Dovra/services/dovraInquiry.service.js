//Internal modules
import { sendAdminInquiryEmail } from "../../../shared/utils/sendEmailNotificationToAdminOnInquiry.js";
import {
  createDovraInquiryRepository,
  deleteDovraInquiryRepository,
  getAllDovraInquiriesRepository,
} from "../repositories/dovraInquiry.repository.js";

const createDovraInquiryService = async (inquiryData, userId) => {
  const result = await createDovraInquiryRepository(inquiryData, userId);

  const CustomerName = inquiryData.firstName + " " + inquiryData.lastName;
  const message = `This notification from the Dovra and send by ${CustomerName}`
  const properObjectForEmail = {
    name: CustomerName,
    email: inquiryData.email,
    message: message,
    Inquiry: "Dovra",
    Motor: inquiryData.interestedIn,
    ClosestDealer: inquiryData.closestDealer
  }
  
   await sendAdminInquiryEmail(properObjectForEmail);

  return result;
};

const getAllDovraInquiriesService = async () => {
  const result = await getAllDovraInquiriesRepository();
  return result;
};

const deleteDovraInquiryService = async (inquiryId) => {
  const result = await deleteDovraInquiryRepository(inquiryId);
  return result;
};

export {
  createDovraInquiryService,
  getAllDovraInquiriesService,
  deleteDovraInquiryService,
};
