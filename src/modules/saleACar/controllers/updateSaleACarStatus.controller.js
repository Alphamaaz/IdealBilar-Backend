import { SaleACar } from "../models/saleACar.model.js";
import createStatusUpdateController from "../../../shared/utils/createStatusUpdateController.js";

const updateSaleACarStatusController = createStatusUpdateController({
  model: SaleACar,
  allowedStatuses: ["pending", "reviewing", "contacted", "completed", "closed", "cancelled"],
  resourceName: "Sale a car inquiry",
});

export { updateSaleACarStatusController };
