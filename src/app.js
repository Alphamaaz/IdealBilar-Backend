//External modules
import express from 'express';
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
dotenv.config();

//Internal modules
import { userRouter } from "./modules/user/index.js";
import carWashRouter from "./modules/carWash/index.js";
import { carRentalRouter } from './modules/rentalCar/index.js';
import { Router as contactusRouter } from './modules/contactus/index.js'
import { dovraInquiryRouter } from "./modules/Dovra/index.js";
import rentACarRouter from './modules/rentACarInquiry/index.js'
import { buyACarhandler } from './modules/buyACar/routes/buyACar.routes.js';
import { workshopServicesRouter } from './modules/workshopServices/index.js';
import { notificationRouter } from './modules/notification/index.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("public", "uploads")));
app.use("/api/v1/uploads", express.static(path.resolve("public", "uploads")));

// User endpoints/URL's
app.use('/api', userRouter);

// Client testimonial endpoints/URL's
// app.use('/api', clientTestimonialRoutes);

//Rent a car endpoints/URL's
app.use('/api/v1', rentACarRouter);

//Contact Us endpoints/URL's
app.use('/api/v1', contactusRouter);

// User URL's
app.use('/api/v1', userRouter);
app.use('/api/v1', carRentalRouter);
app.use('/api/v1', userRouter)

// Buy a car endpoints/URL's
app.use('/api/v1', buyACarhandler);
app.use('/api/v1', dovraInquiryRouter);
app.use('/api/v1', carWashRouter);
app.use('/api/v1', workshopServicesRouter);
app.use('/api/v1', notificationRouter);


app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    success: true,
    message: 'Server is healthy',
  });
});

export { app };
export default app;
