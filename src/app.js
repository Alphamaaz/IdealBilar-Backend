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
import { saleACarRouter } from "./modules/saleACar/index.js";
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3001",
  "http://localhost:3000",
  "http://31.97.77.215" // Added based on user screenshot
]);

if (process.env.ALLOWED_ORIGINS) {
  process.env.ALLOWED_ORIGINS.split(",").forEach(origin => allowedOrigins.add(origin.trim()));
}
const app = express();
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("public", "uploads")));
app.use("/api/v1/uploads", express.static(path.resolve("public", "uploads")));


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


//testing websocket api
// app.use('/api/v1', getAdminDataRouter)

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
app.use('/api/v1', saleACarRouter);

// chat between user and the admin endpoints/URL's
// app.use('/api/v1/', chatRouterHandler) 

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    success: true,
    message: 'Server is healthy',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Log error for debugging
  console.error(`[API Error] ${req.method} ${req.url} - Status: ${status} - Message: ${message}`);
  if (status === 500) {
    console.error(err.stack);
  }

  res.status(status).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

export { app };
export default app;
