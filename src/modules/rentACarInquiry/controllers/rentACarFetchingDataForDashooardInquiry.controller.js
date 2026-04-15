//Internal modules
import { fetchingDataForAdminDashboardOfRentACarService } from "../services/fetchingDataOfRentACarInquiry.service.js";

const rentACarFetchingDataForAdminDashboardController = async (req, res) => {
  try {
    const result = await fetchingDataForAdminDashboardOfRentACarService();
    res.status(200).json({
      success: true,
      message: "Fetched the Rent car data successfully!",
      data: result,
    });
  } catch (err) {
    throw err;
  }
};

//export
export { rentACarFetchingDataForAdminDashboardController };
