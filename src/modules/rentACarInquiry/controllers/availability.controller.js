import availabilityService from '../services/availability.service.js';

/**
 * Get booked dates for a car by month
 * GET /rent-a-car/availability/:carId?month=YYYY-MM
 */
const getBookedDates = async (req, res) => {
  try {
    const { carId } = req.params;
    const { month } = req.query;

    // Validate carId
    if (!carId) {
      return res.status(400).json({
        success: false,
        message: 'Car ID is required'
      });
    }

    // Parse month if provided, otherwise use current month
    let monthDate = month ? new Date(month) : new Date();
    
    // Validate month format
    if (isNaN(monthDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid month format. Use YYYY-MM format'
      });
    }

    const availability = await availabilityService.getBookedDatesForMonth(carId, monthDate);

    res.status(200).json({
      success: true,
      data: availability,
      message: 'Booked dates retrieved successfully'
    });
  } catch (error) {
    console.error('Error in getBookedDates:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve booked dates'
    });
  }
};

/**
 * Check if specific dates are available
 * POST /rent-a-car/check-availability
 * Body: { carId, pickupDate, returnDate }
 */
const checkAvailability = async (req, res) => {
  try {
    const { carId, pickupDate, returnDate } = req.body;

    // Validate required fields
    if (!carId || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: 'carId, pickupDate, and returnDate are required'
      });
    }

    const availability = await availabilityService.checkDateAvailability(
      carId,
      new Date(pickupDate),
      new Date(returnDate)
    );

    res.status(200).json({
      success: true,
      data: availability,
      message: availability.isAvailable 
        ? 'Dates are available' 
        : 'Dates are not available'
    });
  } catch (error) {
    console.error('Error in checkAvailability:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to check availability'
    });
  }
};

export { getBookedDates, checkAvailability };
