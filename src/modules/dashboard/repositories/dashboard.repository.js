import { BuyACar } from "../../buyACar/models/buyACar.model.js";
import CarWashBooking from "../../carWash/models/carWashBooking.model.js";
import { ContactUsModel } from "../../contactus/models/contactus.model.js";
import DovraInquiry from "../../Dovra/models/dovraInquiry.model.js";
import RentACarBooking from "../../rentACarInquiry/models/rentACarBookingInquery.model.js";
import RentalCar from "../../rentalCar/model/rentalCar.model.js";
import { SaleACar } from "../../saleACar/models/saleACar.model.js";

const buildCreatedAtFilter = ({ startDate, endDate }) => {
  if (!startDate || !endDate) {
    return {};
  }

  return {
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  };
};

const getDashboardSummaryRepository = async (dateRange) => {
  const createdAtFilter = buildCreatedAtFilter(dateRange);

  const [
    saleListings,
    rentalListings,
    saleACarInquiries,
    buyACarInquiries,
    dovraInquiries,
    contactUsInquiries,
    rentalBookings,
    serviceBookings,
  ] = await Promise.all([
    SaleACar.countDocuments(createdAtFilter),
    RentalCar.countDocuments(createdAtFilter),
    SaleACar.countDocuments(createdAtFilter),
    BuyACar.countDocuments(createdAtFilter),
    DovraInquiry.countDocuments(createdAtFilter),
    ContactUsModel.countDocuments(createdAtFilter),
    RentACarBooking.countDocuments(createdAtFilter),
    CarWashBooking.countDocuments(createdAtFilter),
  ]);

  const newInquiries =
    saleACarInquiries + buyACarInquiries + dovraInquiries + contactUsInquiries;

  return {
    cards: {
      saleListings,
      rentalListings,
      newInquiries,
      rentalBookings,
      serviceBookings,
    },
    breakdown: {
      saleACarInquiries,
      buyACarInquiries,
      dovraInquiries,
      contactUsInquiries,
    },
  };
};

export { getDashboardSummaryRepository };
