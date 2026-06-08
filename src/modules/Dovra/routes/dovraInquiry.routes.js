//External modules
import express from "express";

//Internal modules
import { adminOnlyMiddleware } from "../../../shared/middlewares/adminOnlyAuth.moddleware.js";
import { middlewareForVerifyJwtToken } from "../../../shared/middlewares/auth.middleware.js";
import {
  createDovraInquiryController,
  deleteDovraInquiryController,
  getAllDovraInquiriesController,
} from "../controllers/dovraInquiry.controller.js";
import { updateDovraInquiryStatusController } from "../controllers/updateDovraInquiryStatus.controller.js";

const dovraInquiryRouter = express.Router();

dovraInquiryRouter.post(
  "/dovra-inquiry",
  middlewareForVerifyJwtToken,
  createDovraInquiryController,
);

dovraInquiryRouter.get(
  "/dovra-inquiries",
  middlewareForVerifyJwtToken,
  adminOnlyMiddleware,
  getAllDovraInquiriesController,
);

dovraInquiryRouter.delete(
  "/dovra-inquiry/:id",
  middlewareForVerifyJwtToken,
  adminOnlyMiddleware,
  deleteDovraInquiryController,
);

dovraInquiryRouter.put(
  "/dovra-inquiry/:id/status",
  middlewareForVerifyJwtToken,
  adminOnlyMiddleware,
  updateDovraInquiryStatusController,
);

export default dovraInquiryRouter;
