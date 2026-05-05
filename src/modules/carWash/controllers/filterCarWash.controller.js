//External modules

//Internal modules
import { filterCarWashService } from "../services/filterCarWash.service.js";
const filterCarWashController = async (req, res) => {
    try {
        const filterData = req.query;
        const filteredBookings = await filterCarWashService(filterData);
        res.status(200).json({
            success: true,
            message: `Car wash bookings filtered successfully based on ${filteredBookings.title}`,
            data: filteredBookings.data
        });
    } catch (error) {
        console.error('Error filtering car wash bookings:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to filter car wash bookings',
        });
    }
};

// Export the controller function
export { filterCarWashController };