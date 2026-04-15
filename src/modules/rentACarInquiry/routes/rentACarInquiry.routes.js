// External modules
import express from "express";

//Internal modules
import { rentACarController as RentACarHandler } from "../controllers/rentACarInquiry.controller.js";
import { rentACarFetchingDataForAdminDashboardController } from "../controllers/rentACarFetchingDataForDashooardInquiry.controller.js";
import { rentACarDeleteDataController } from "../controllers/rentACarDeleteDataInquiry.controller.js";
import { rentACarEditeController } from "../controllers/rentACarEditeInquery.controller.js";
import { middlewareForVerifyJwtToken } from "../../../shared/middlewares/auth.middleware.js";
import { adminOnlyMiddleware } from "../../../shared/middlewares/adminOnlyAuth.moddleware.js";
import { upload } from "../../../shared/middlewares/uploadFile.middleware.js";

const rentACarRouter = express.Router();

// rent a car endpoint/URL
rentACarRouter.post(
  "/rent-a-car",
  upload.single("image"),
  middlewareForVerifyJwtToken,
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
  "/delete-rent-a-car-data",
  middlewareForVerifyJwtToken,
  rentACarDeleteDataController,
);

// edite rent a car data endpoint/URL
rentACarRouter.put(
  "/update-rent-a-car",
  middlewareForVerifyJwtToken,
  rentACarEditeController,
);

//export
export default rentACarRouter;
