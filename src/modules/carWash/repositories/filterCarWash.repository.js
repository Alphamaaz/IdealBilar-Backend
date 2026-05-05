//External modules

//Internal modules
import CarWashBooking from '../models/carWashBooking.model.js';
import RentalCar from '../../rentalCar/model/rentalCar.model.js';
const filterCarWashOnCarRepository = async (fieldName, filter) => {
    try {
        const filterCriteria = { [fieldName]: filter };
        const filteredBookings = await RentalCar.find(filterCriteria);
        return filteredBookings;
    } catch (error) {
        console.error('Error filtering car wash bookings:', error);
        throw error;
    }
};

// filter on service
const filterCarWashOnServiceRepository = async (filter) => {
    try {
        const filteredBookings = await CarWashBooking.find({
               selectedServices: filter 
        });
        return filteredBookings;
    }
    catch (error) {
        console.error('Error filtering car wash bookings:', error);
        throw error;
    }

};

// filter on the user first name 
const filterCarWashOnUserNameRepository = async (userName) => {
    try {
        const result = await CarWashBooking.find({
            firstName: userName
        });
        return result;
    } catch (error) {
        throw error;
    }
}

// filter on status
const filterCarWashOnStatusRepository = async (status) => {
    try {
        const result = await CarWashBooking.find({
            status: status
        });
        return result;
    } catch (error) {
        throw error;
    }
};

// Export the repository function
export { 
    filterCarWashOnCarRepository, 
    filterCarWashOnServiceRepository,
    filterCarWashOnUserNameRepository,
    filterCarWashOnStatusRepository
 };