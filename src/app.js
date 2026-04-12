//External modules
import express from 'express';
import dotenv from "dotenv";
dotenv.config();

//Internal modules
import { userRouter } from "./modules/user/index.js";
import {Router as contactusRouter } from './modules/contactus/index.js'


const app = express();

app.use(express.json());

// User endpoints/URL's
app.use('/api',userRouter);

// Client testimonial endpoints/URL's
// app.use('/api', clientTestimonialRoutes);

//Rent a car endpoints/URL's
// app.use('/api',RentACarRouter);

//Contact Us endpoints/URL's
app.use('/api/v1',contactusRouter);

// User URL's
app.use('/api/v1',userRouter)
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    success: true,
    message: 'Server is healthy',
  });
});
 
export { app };
export default app;
