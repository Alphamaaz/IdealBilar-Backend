import RentACarBooking from "../models/rentACarBookingInquery.model.js";
import { notificationServices } from "../../notification/services/notification.service.js";
import { createChatForInquiryRepository } from "../../chats/repositories/createChatForInquiry.repository.js";

const findOverlappingRentACarBooking = async ({ carId, pickupDate, returnDate }) => {
    try {
      const existingBooking = await RentACarBooking.findOne({
        carId,
        pickupDate: { $lt: returnDate },
        returnDate: { $gt: pickupDate },
      });

      return existingBooking;
    } catch (err) {
        throw err
    }
}

const saveRentACarData = async (rentACarData) => {
    try{
      const result = await RentACarBooking.create(rentACarData);
      const populatedResult = await RentACarBooking.findById(result._id)
        .populate("userId", "name email phone role")
        .populate("carId", "make model year title thumbnail ");
      await notificationServices({
        name: populatedResult.userId?.name,
        type: "Rent a Car",
        message: `${populatedResult.userId?.name} has inquired about renting a car`,
        model: populatedResult.carId ? `${populatedResult.carId.make} ${populatedResult.carId.model}` : undefined,
        referenceId: result._id,
      });
      await createChatForInquiryRepository({
        inquiryId: result._id,
        inquiryType: 'rentACarInquiry',
        user: {
          id: rentACarData.userId,
          name: populatedResult.userId?.name || '',
          email: populatedResult.userId?.email || '',
        },
      });
      return populatedResult;
    }catch(err){
        throw err
    }
}

//export

export {
    findOverlappingRentACarBooking,
    saveRentACarData
}
