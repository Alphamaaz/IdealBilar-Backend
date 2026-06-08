import DovraInquiry from "../models/dovraInquiry.model.js";
import createStatusUpdateController from "../../../shared/utils/createStatusUpdateController.js";

const updateDovraInquiryStatusController = createStatusUpdateController({
  model: DovraInquiry,
  allowedStatuses: ["pending", "contacted", "completed", "closed", "cancelled"],
  resourceName: "Dovra inquiry",
});

export { updateDovraInquiryStatusController };
