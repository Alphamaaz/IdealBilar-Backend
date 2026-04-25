//External modules
import express from 'express';
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import cors from 'cors';

//Internal modules
import { userRouter } from "./modules/user/index.js";
import { carRentalRouter } from './modules/rentalCar/index.js';
import {Router as contactusRouter } from './modules/contactus/index.js'
import rentACarRouter from './modules/rentACarInquiry/index.js'
import { buyACarhandler } from './modules/buyACar/routes/buyACar.routes.js';
import { chatRouterHandler } from './modules/chats/routes/chat.route.js';
import { getAdminDataRouter } from './modules/users/routes/users.route.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("public", "uploads")));
app.use("/api/v1/uploads", express.static(path.resolve("public", "uploads")));


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


//testing websocket api
app.use('/api/v1', getAdminDataRouter)

// User endpoints/URL's
app.use('/api',userRouter);

// Client testimonial endpoints/URL's
// app.use('/api', clientTestimonialRoutes);

//Rent a car endpoints/URL's
app.use('/api/v1',rentACarRouter);

//Contact Us endpoints/URL's
app.use('/api/v1',contactusRouter);

// User URL's
app.use('/api/v1',userRouter);
app.use('/api/v1',carRentalRouter);
app.use('/api/v1',userRouter)

// Buy a car endpoints/URL's
app.use('/api/v1',buyACarhandler);

// chat between user and the admin endpoints/URL's
app.use('/api/v1/', chatRouterHandler) 

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    success: true,
    message: 'Server is healthy',
  });
});
 
export { app };
export default app;
