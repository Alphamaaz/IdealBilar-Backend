//External moudules

//Internal modules
import { filterCarRentalsService } from '../services/carRentalFilter.service.js';
const filterCarRentalsController = async (req, res) => {
  try {
    const query = {};
    const result = await filterCarRentalsService(req.query);
    res.status(200).json({
      success: true,
      message: `Filter based on ${result.title} is successful!`,
      data: result.data,
    });
  } catch (error) {    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while filtering car rentals"
      }); 
    }
};

//export
export {
  filterCarRentalsController
};