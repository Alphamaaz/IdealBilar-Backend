import express from 'express';
import {
  createCarRentalController as createCarRentalHandler,
    // getAllCarRentalsController as getAllCarRentalsHandler,
    // getCarRentalByIdController as getCarRentalByIdHandler,
    // updateCarRentalController as updateCarRentalHandler,
    // deleteCarRentalController as deleteCarRentalHandler
} from '../controllers/carRental.controller.js';
// import { carRentalMiddlewareForVerifyJwtToken } from '../middlewares/carRental.middlewares.js';
const Router = express.Router();

// Create a new car rental
Router.post('/car-rental', createCarRentalHandler);

export default Router;  