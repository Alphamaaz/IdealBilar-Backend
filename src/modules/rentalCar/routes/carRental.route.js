import express from 'express';
import {
  createCarRentalController as createCarRentalHandler,
    getAllCarRentalsController as getAllCarRentalsHandler,
    getCarRentalByIdController as getCarRentalByIdHandler,
    updateCarRentalController as updateCarRentalHandler,
    deleteCarRentalController as deleteCarRentalHandler
} from '../controllers/carRental.controller.js';
import { middlewareForVerifyJwtToken } from '../../../shared/middlewares/auth.middleware.js';
import rentalCarUpload from '../middlewares/carRentalUpload.middleware.js';

const Router = express.Router();

// Create a new car rental
Router.post(
  '/car-rental',
  middlewareForVerifyJwtToken,
  rentalCarUpload.array("images", 10),
  createCarRentalHandler,
);

Router.get("/car-rentals", getAllCarRentalsHandler);

// Get a specific car rental by ID
Router.get('/car-rental/:id',  getCarRentalByIdHandler);

// Update a car rental
Router.put(
  '/car-rental/:id',
  middlewareForVerifyJwtToken,
  rentalCarUpload.array("images", 10),
  updateCarRentalHandler,
);

// Delete a car rental
Router.delete('/car-rental/:id', middlewareForVerifyJwtToken, deleteCarRentalHandler);

export default Router;  
