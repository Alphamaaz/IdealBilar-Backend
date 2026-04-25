import express from "express";
import { adminOnlyMiddleware } from "../../../shared/middlewares/adminOnlyAuth.moddleware.js";
import { middlewareForVerifyJwtToken } from "../../../shared/middlewares/auth.middleware.js";
import {
  createCarWashBookingController,
  deleteCarWashBookingController,
  getAllCarWashBookingsController,
  getBookedTimesByDateController,
} from "../controllers/carWashBooking.controller.js";

const carWashRouter = express.Router();

carWashRouter.post("/car-wash-booking", createCarWashBookingController);
carWashRouter.get("/car-wash-booked-times", getBookedTimesByDateController);

carWashRouter.get(
  "/car-wash-bookings",
  middlewareForVerifyJwtToken,
  adminOnlyMiddleware,
  getAllCarWashBookingsController,
);

carWashRouter.delete(
  "/car-wash-booking/:id",
  middlewareForVerifyJwtToken,
  adminOnlyMiddleware,
  deleteCarWashBookingController,
);

export default carWashRouter;
