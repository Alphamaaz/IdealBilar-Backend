import { BuyACar } from "../models/buyACar.model.js";
import createStatusUpdateController from "../../../shared/utils/createStatusUpdateController.js";

const updateBuyACarStatusController = createStatusUpdateController({
  model: BuyACar,
  allowedStatuses: ["pending", "approved", "rejected", "completed", "cancelled"],
  resourceName: "Buy a car inquiry",
});

export { updateBuyACarStatusController };
