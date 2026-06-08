import RentACarBooking from "../models/rentACarBookingInquery.model.js";
import createStatusUpdateController from "../../../shared/utils/createStatusUpdateController.js";

const updateRentACarStatusController = createStatusUpdateController({
  model: RentACarBooking,
  allowedStatuses: ["upcoming", "in-progress", "completed", "cancelled"],
  resourceName: "Rent a car booking",
});

export { updateRentACarStatusController };
