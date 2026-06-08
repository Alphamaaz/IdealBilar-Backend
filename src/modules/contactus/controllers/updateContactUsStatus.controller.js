import { ContactUsModel } from "../models/contactus.model.js";
import createStatusUpdateController from "../../../shared/utils/createStatusUpdateController.js";

const updateContactUsStatusController = createStatusUpdateController({
  model: ContactUsModel,
  allowedStatuses: ["pending", "contacted", "completed", "closed"],
  resourceName: "Contact inquiry",
});

export { updateContactUsStatusController };
