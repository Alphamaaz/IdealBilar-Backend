import { sendAdminInquiryEmail } from "../../../shared/utils/sendEmailNotificationToAdminOnInquiry.js";
import {
  createSaleACarRepository,
  deleteSaleACarInquiryRepository,
  getAllSaleACarInquiriesRepository,
} from "../repositories/saleACar.repository.js";

const createSaleACarService = async (saleACarData) => {
  const result = await createSaleACarRepository(saleACarData);
  const dataForEmailNotification = {
    name: saleACarData?.ownerInformation?.fullName,
    email: saleACarData?.ownerInformation?.email,
    message: "New Sale a car Inquirey",
    Inquiry: "Sale a car"
  }

  //send email notification to admin
  await sendAdminInquiryEmail(dataForEmailNotification); 

  return {
    success: true,
    status: 201,
    message: "Sale a car inquiry submitted successfully",
    data: result,
  };
};

const getAllSaleACarInquiriesService = async () => {
  const result = await getAllSaleACarInquiriesRepository();

  return {
    success: true,
    status: 200,
    message: "Sale a car inquiries fetched successfully",
    data: result,
  };
};

const deleteSaleACarInquiryService = async (inquiryId) => {
  const result = await deleteSaleACarInquiryRepository(inquiryId);

  if (!result) {
    return {
      success: false,
      status: 404,
      message: "Sale a car inquiry not found",
    };
  }

  return {
    success: true,
    status: 200,
    message: "Sale a car inquiry deleted successfully",
  };
};

export {
  createSaleACarService,
  getAllSaleACarInquiriesService,
  deleteSaleACarInquiryService,
};
