// External modules

// Internal modules
import { buyACarFetchingDataForAdminPanel } from "../services/buyACarFetchingData.service.js";
const buyACarDataFetchingController = async (req, res) => {
  try {
    const result = await buyACarFetchingDataForAdminPanel();

    res.status(200).json({
      success: true,
      message:
        "Fetched all the buy car's data for the admin panel successfuly!",
      data: result,
    });
  } catch (error) {
    throw error;
  }
};

//exports
export { buyACarDataFetchingController };
