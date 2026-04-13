import { registerCarRentalService } from "../services/carRental.service.js";


const createCarRentalController = async (req, res) => {
  try {
    const result = await registerCarRentalService(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while registering the car rental",
      error: error.message
    });
  }
};

export {
  createCarRentalController,
};
