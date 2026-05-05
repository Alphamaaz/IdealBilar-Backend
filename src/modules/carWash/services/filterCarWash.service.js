//External modules

//Internal modules
import { 
    filterCarWashOnCarRepository,
    filterCarWashOnServiceRepository,
    filterCarWashOnUserNameRepository,
    filterCarWashOnStatusRepository
 } from '../repositories/filterCarWash.repository.js';
const filterCarWashService = async (data) => {
    try {
        const { car, service, userName, status, dateRange } = data;
        if (!car && !service && !userName && !status && !dateRange) {
            throw new Error('At least one filter criteria must be provided');
        }
        if (car) {
            const filteredBookings = await filterCarWashOnCarRepository('title', car);
            return {
                title: "Car",
                data: filteredBookings
            };
        }
        if (service) {
            const filteredBookings = await filterCarWashOnServiceRepository(service);
            return {
                title: "Service",
                data: filteredBookings
            };
        }
        if (userName) {
            const filteredBookings = await filterCarWashOnUserNameRepository(userName);
            return {
                title: "First name",
                data: filteredBookings
            };
        }
        if (status) {
            const filteredBookings = await filterCarWashOnStatusRepository(status);
            return {
                title: "Status",
                data: filteredBookings
            };
        }
        if (dateRange) {
            const filteredBookings = await filterCarWashRepository('dateRange', dateRange);
            return filteredBookings;
        }
    } catch (error) {
        console.error('Error filtering car wash bookings:', error);
        throw error;
    }
};

// Export the service function
export { filterCarWashService };