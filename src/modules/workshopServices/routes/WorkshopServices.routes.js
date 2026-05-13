import { Router } from "express";
import { createWorkshopController, deleteWorkshopServiceController, getAllWorkshopServicesController, getSingleWorkshopServiceController, updateWorkshopServiceController } from "../controllers/WorkshopServices.controller.js";
import { middlewareForVerifyJwtToken } from "../../../shared/middlewares/auth.middleware.js";

const router = Router();

router.post("/", middlewareForVerifyJwtToken, createWorkshopController);
router.get("/", getAllWorkshopServicesController);
router.get("/:id", getSingleWorkshopServiceController);
router.put("/:id", updateWorkshopServiceController);
router.delete("/:id", deleteWorkshopServiceController);

export default router;
