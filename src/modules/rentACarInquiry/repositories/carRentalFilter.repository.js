//External modules

//Internal modules
import RentACarBooking from '../models/rentACarBookingInquery.model.js';
// Filter car rentals based on search query
const filterCarRentalsForSearchRepository = async (propertyName, filters) => {
  try {
    const result = await RentACarBooking.find()
    .populate({
      path: 'carId',
      match: { [propertyName]: { $regex: filters, $options: 'i' } }
    })
    .populate('userId');
    return result;
    } catch (error) {
    throw error;
    }
};


// Filter based on custmer name
const filterCarRentalsForCustomerNameRepository = async (customerName) => {
  try {
    const result = await RentACarBooking.find()
    .populate({ 
      path: 'userId',
      match: { name: { $regex: customerName, $options: 'i' } },
    })
    .populate('carId');
    return result;
    } catch (error) {
    throw error;
    }
};

// Filter based on pickup date and return date
const filterCarRentalsForPickupDateRepository = async (pickupDate) => {
  try {
    // Check what's actually in your database
    const sampleBooking = await RentACarBooking.findOne();
    
    const startOfDay = new Date(pickupDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(pickupDate);
    endOfDay.setHours(23, 59, 59, 999);

    const result = await RentACarBooking.find({
      pickupDate: { 
        $gte: startOfDay,
        $lte: endOfDay
      }
    })
    .populate('carId')
    .populate('userId')
    .sort({ pickupDate: 1 }); // Sort by pickup date in ascending order

    return result;
  } catch (error) {
    throw error;
  }
};

// Filter based on return date
const filterCarRentalsForReturnDateRepository = async (returnDate) => {
  try {
    const startOfDay = new Date(returnDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(returnDate);
    endOfDay.setHours(23, 59, 59, 999);
    const result = await RentACarBooking.find({
      returnDate: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    })
    .populate('carId')
    .populate('userId')
    .sort({ returnDate: 1 }); // Sort by return date in ascending order
    return result;
  } catch (error) {
    throw error;
  }
};

//export
export {
  filterCarRentalsForSearchRepository,
  filterCarRentalsForCustomerNameRepository,
  filterCarRentalsForPickupDateRepository,
  filterCarRentalsForReturnDateRepository
};