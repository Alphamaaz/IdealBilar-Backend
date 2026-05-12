
import express from "express";
import {
  createCarWashServiceController,
  getCarWashServicesController,
  updateCarWashServiceController,
  deleteCarWashServiceController,
  getServicesByVehicleTypeController,
  getServiceByIdController,
  getAvailableVehicleTypesController,
  searchCarWashServicesController,
} from "../controllers/carwashServices.controller.js";
import { middlewareForVerifyJwtToken } from "../../../shared/middlewares/auth.middleware.js";
import { adminOnlyMiddleware } from "../../../shared/middlewares/adminOnlyAuth.moddleware.js";

const router = express.Router();
// POST endpoint
router.post("/", middlewareForVerifyJwtToken, adminOnlyMiddleware, createCarWashServiceController);
// GET endpoints
router.get("/", getCarWashServicesController);
router.get("/search", searchCarWashServicesController);
router.get("/vehicle-types", getAvailableVehicleTypesController);
router.get("/vehicle/:vehicleType", getServicesByVehicleTypeController);
router.get("/:id", getServiceByIdController);


// PUT endpoint
router.put("/:id",middlewareForVerifyJwtToken, adminOnlyMiddleware, updateCarWashServiceController);

// DELETE endpoint
router.delete("/:id", middlewareForVerifyJwtToken, adminOnlyMiddleware, deleteCarWashServiceController);

export default router;
