//External modules

//Internal modules
import { updateCarWashStatusService } from '../services/updateCarWashStatus.service.js';
const updateCarWashStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const data = { id, status };
        const updatedBooking = await updateCarWashStatusService(data);
        res.status(200).json({
            success: true,
            message: 'Car wash booking status updated successfully',
            data: updatedBooking
        });
    } catch (error) {
        console.error('Error updating car wash booking status:', error);
        res.status(500).json({  
            success: false,
            message: error.message || 'Failed to update car wash booking status',
        });
    }

};

// Export the controller function
export { updateCarWashStatusController };