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
import { dashboardRouter } from "./modules/dashboard/index.js";
import { chatRouterHandler } from "./modules/chats/routes/chat.route.js";
import { queryHistoryRouter } from "./modules/queryHistory/index.js";

import { carwashServicesRouter } from "./modules/carwashServices/index.js";

//Profile module import
import { ProfileHandle } from './modules/profile/index.js';

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3001",
  "http://localhost:3000",
  "http://31.97.77.215",
  "https://ideal-bilar-site.vercel.app",
  "https://idealbilar-dashboard.vercel.app"
]);

if (process.env.ALLOWED_ORIGINS) {
  process.env.ALLOWED_ORIGINS.split(",").forEach((origin) => {
    const trimmedOrigin = origin.trim();
    if (trimmedOrigin) {
      allowedOrigins.add(trimmedOrigin);
    }
  });
}

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
}));

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
app.use('/api/v1/carwash-services', carwashServicesRouter);
app.use('/api/v1/workshop-services', workshopServicesRouter);
app.use('/api/v1', notificationRouter);
app.use('/api/v1', saleACarRouter);
app.use('/api/v1', dashboardRouter);
app.use('/api/v1', queryHistoryRouter);

// Chat endpoints
app.use('/api/v1', chatRouterHandler);


// Profie endpoints
app.use('/api/v1', ProfileHandle)

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
