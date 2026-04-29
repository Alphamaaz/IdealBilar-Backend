import express from "express";
import { adminOnlyMiddleware } from "../../../shared/middlewares/adminOnlyAuth.moddleware.js";
import { middlewareForVerifyJwtToken } from "../../../shared/middlewares/auth.middleware.js";
import {
  createSaleACarController,
  deleteSaleACarInquiryController,
  getAllSaleACarInquiriesController,
} from "../controllers/saleACar.controller.js";
import saleACarUpload from "../middlewares/saleACarUpload.middleware.js";

const saleACarRouter = express.Router();

const uploadSaleACarImages = (req, res, next) => {
  saleACarUpload.array("images", 10)(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    res.status(400).json({
      success: false,
      message: error.message || "Failed to upload sale a car images",
    });
  });
};

saleACarRouter.post(
  "/sale-a-car",
  middlewareForVerifyJwtToken,
  uploadSaleACarImages,
  createSaleACarController,
);

saleACarRouter.get(
  "/sale-a-car-inquiries",
  middlewareForVerifyJwtToken,
  adminOnlyMiddleware,
  getAllSaleACarInquiriesController,
);

saleACarRouter.delete(
  "/sale-a-car/:id",
  middlewareForVerifyJwtToken,
  adminOnlyMiddleware,
  deleteSaleACarInquiryController,
);

export default saleACarRouter;
