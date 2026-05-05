import {
  createDovraInquiryRepository,
  deleteDovraInquiryRepository,
  getAllDovraInquiriesRepository,
} from "../repositories/dovraInquiry.repository.js";

const createDovraInquiryService = async (inquiryData, userId) => {
  const result = await createDovraInquiryRepository(inquiryData, userId);
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
