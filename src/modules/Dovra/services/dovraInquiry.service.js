import {
  createDovraInquiryRepository,
  deleteDovraInquiryRepository,
  getAllDovraInquiriesRepository,
} from "../repositories/dovraInquiry.repository.js";

const createDovraInquiryService = async (inquiryData) => {
  const result = await createDovraInquiryRepository(inquiryData);
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
