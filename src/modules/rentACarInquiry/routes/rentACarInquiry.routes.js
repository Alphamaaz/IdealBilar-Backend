// External modules
import express from "express";

//Internal modules
import { rentACarController as RentACarHandler } from "../controllers/rentACarInquiry.controller.js";
import { rentACarFetchingDataForAdminDashboardController } from "../controllers/rentACarFetchingDataForDashooardInquiry.controller.js";
import { rentACarDeleteDataController } from "../controllers/rentACarDeleteDataInquiry.controller.js";
import { rentACarEditeController } from "../controllers/rentACarEditeInquery.controller.js";
import { filterCarRentalsController } from "../controllers/carRentalFilter.controller.js";
import { middlewareForVerifyJwtToken } from "../../../shared/middlewares/auth.middleware.js";
import { upload } from "../../../shared/middlewares/uploadFile.middleware.js";
import { adminOnlyMiddleware } from "../../../shared/middlewares/adminOnlyAuth.moddleware.js";

const rentACarRouter = express.Router();

const uploadLicenseImage = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    res.status(400).json({
      success: false,
      message: error.message || "Failed to upload license image",
    });
  });
};

// rent a car endpoint/URL
rentACarRouter.post(
  "/rent-a-car",
  middlewareForVerifyJwtToken,
  uploadLicenseImage,
  RentACarHandler,
);

// fetching data for admin dashboard of rent a car endpoint/URL
rentACarRouter.get(
  "/rent-a-car-data",
//   middlewareForVerifyJwtToken,
  rentACarFetchingDataForAdminDashboardController,
);

// delete rent a car data endpoint/URL
rentACarRouter.delete(
  "/delete-rent-a-car-data/:id",
  middlewareForVerifyJwtToken,
  adminOnlyMiddleware,
  rentACarDeleteDataController,
);

// Filter car rentals
rentACarRouter.get('/rental-bookings', middlewareForVerifyJwtToken, adminOnlyMiddleware, filterCarRentalsController);

// edite rent a car data endpoint/URL
rentACarRouter.put(
  "/update-rent-a-car/:id",
  middlewareForVerifyJwtToken,
  rentACarEditeController,
);

//export
export default rentACarRouter;
