import { notificationServices } from "../../notification/services/notification.service.js";
import { sendInquiryEmail } from "../../user/utils/sendOTPEmail.js";
import DovraInquiry from "../models/dovraInquiry.model.js";

const createDovraInquiryRepository = async (inquiryData) => {
  const result = await DovraInquiry.create(inquiryData);
  await notificationServices({
    name: inquiryData.firstName,
    type: "Dovra",
    message: inquiryData.firstName + " " + "has sent a new Dovra inquiry",
    referenceId: result._id,
  });
  await sendInquiryEmail(inquiryData.email, inquiryData.firstName, "Dovra");
  return result;
};

const getAllDovraInquiriesRepository = async () => {
  const result = await DovraInquiry.find().sort({ createdAt: -1 });
  return result;
};

const deleteDovraInquiryRepository = async (inquiryId) => {
  const result = await DovraInquiry.findByIdAndDelete(inquiryId);
  return result;
};

export {
  createDovraInquiryRepository,
  getAllDovraInquiriesRepository,
  deleteDovraInquiryRepository,
};
