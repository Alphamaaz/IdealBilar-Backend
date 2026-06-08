//External modules

//Internal modules
import { updateCarWashStatusService } from '../services/updateCarWashStatus.service.js';
const updateCarWashStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Allowed statuses: ${allowedStatuses.join(", ")}`,
            });
        }

        const data = { id, status };
        const updatedBooking = await updateCarWashStatusService(data);

        if (!updatedBooking) {
            return res.status(404).json({
                success: false,
                message: "Car wash booking not found",
            });
        }

        res.status(200).json({
            success: true,
            message: 'Car wash booking status updated successfully',
            data: updatedBooking
        });
    } catch (error) {
        console.error('Error updating car wash booking status:', error);

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid car wash booking ID",
            });
        }

        res.status(500).json({  
            success: false,
            message: error.message || 'Failed to update car wash booking status',
        });
    }

};

// Export the controller function
export { updateCarWashStatusController };
