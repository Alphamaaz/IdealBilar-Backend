import { Router } from "express";
import { createWorkshopController, deleteWorkshopServiceController, getAllWorkshopServicesController, getSingleWorkshopServiceController, updateWorkshopServiceController } from "../controllers/WorkshopServices.controller.js";
import { middlewareForVerifyJwtToken } from "../../../shared/middlewares/auth.middleware.js";

const router = Router();

router.post("/workshop-services", middlewareForVerifyJwtToken, createWorkshopController);
router.get("/workshop-services", getAllWorkshopServicesController);
router.get("/workshop-services/:id", getSingleWorkshopServiceController);
router.put("/workshop-services/:id", updateWorkshopServiceController);
router.delete("/workshop-services/:id", deleteWorkshopServiceController);

export default router;
