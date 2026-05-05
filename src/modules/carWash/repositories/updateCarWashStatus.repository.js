//External modules

//Internal modules
import CarWashBooking from '../models/carWashBooking.model.js';
const updateCarWashStatusRepository = async (data) => {
    try {
        const { id, status } = data;
        
        const updatedBooking = await CarWashBooking.findByIdAndUpdate(id, { status }, { new: true });
        console.log("Check that update the car wash booking status ", updatedBooking);
        
        return updatedBooking;
    } catch (error) {
        console.error('Error updating car wash booking status:', error);
        throw error;
    }
};

// Export the repository function
export { updateCarWashStatusRepository };