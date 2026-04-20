import DovraInquiry from "../models/dovraInquiry.model.js";

const createDovraInquiryRepository = async (inquiryData) => {
  const result = await DovraInquiry.create(inquiryData);
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
