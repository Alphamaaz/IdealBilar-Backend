
import express from "express";
import { createCarWashServiceController } from "../controllers/carwashServices.controller.js";

const router = express.Router();

router.post("/", createCarWashServiceController);

export default router;
