//External modules

//Internal modules
import { updateCarWashStatusRepository } from '../repositories/updateCarWashStatus.repository.js';
const updateCarWashStatusService = async (data) => {
    try {
        const updatedBooking = await updateCarWashStatusRepository(data);   
        return updatedBooking;
    } catch (error) {
        console.error('Error updating car wash booking status:', error);
        throw error;
    }
};

// Export the service function
export { updateCarWashStatusService };