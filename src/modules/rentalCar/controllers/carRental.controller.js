import { deleteCarRentalService, getAllCarRentalsService, getCarRentalByIdService, registerCarRentalService, updateCarRentalService } from "../services/carRental.service.js";


const createCarRentalController = async (req, res) => {
  try {
    const result = await registerCarRentalService(req.body, req.files);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while registering the car rental",
      error: error.message
    });
  }
};

const getAllCarRentalsController = async (req, res) => {
  try {
    const result = await getAllCarRentalsService();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching car rentals",
      error: error.message
    });
  }
};

const getCarRentalByIdController = async (req, res) => {
  try {
    const result = await getCarRentalByIdService(req.params.id);
    res.status(result.status).json(result);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({
        success: false,
        message: "Invalid car rental ID format",
        error: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the car rental",
        error: error.message
      });
    }
  }
};

const updateCarRentalController = async (req, res) => {
  try {
    const result = await updateCarRentalService(req.params.id, req.body, req.files);
    res.status(result.status).json(result);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({
        success: false,
        message: "Invalid car rental ID format",
        error: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An error occurred while updating the car rental",
        error: error.message
      });
    }
  }
};

const deleteCarRentalController = async (req, res) => {
  try {
    const result = await deleteCarRentalService(req.params.id);
    res.status(result.status).json(result);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({
        success: false,
        message: "Invalid car rental ID format",
        error: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An error occurred while deleting the car rental",
        error: error.message
      });
    }
  }
};



export {
  createCarRentalController,
  getAllCarRentalsController,
  getCarRentalByIdController, 
  updateCarRentalController,
  deleteCarRentalController,  
};
