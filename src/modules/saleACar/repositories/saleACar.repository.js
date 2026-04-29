import { SaleACar } from "../models/saleACar.model.js";

const createSaleACarRepository = async (saleACarData) => {
  const result = await SaleACar.create(saleACarData);
  return result;
};

const getAllSaleACarInquiriesRepository = async () => {
  const result = await SaleACar.find().sort({ createdAt: -1 });
  return result;
};

const deleteSaleACarInquiryRepository = async (inquiryId) => {
  const result = await SaleACar.findByIdAndDelete(inquiryId);
  return result;
};

export {
  createSaleACarRepository,
  getAllSaleACarInquiriesRepository,
  deleteSaleACarInquiryRepository,
};
