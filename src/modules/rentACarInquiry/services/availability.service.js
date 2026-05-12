import RentACarBooking from '../models/rentACarBookingInquery.model.js';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';

/**
 * Get booked dates for a specific car in a given month
 * @param {string} carId - The car ID to check availability for
 * @param {Date|string} month - The month to check (defaults to current month)
 * @returns {Promise<Object>} Object containing booked dates and other details
 */
const getBookedDatesForMonth = async (carId, month = new Date()) => {
  try {
    const monthDate = new Date(month);
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);

    // Find all bookings that overlap with this month (excluding cancelled bookings)
    const bookings = await RentACarBooking.findBookedDates(
      carId,
      monthStart,
      monthEnd,
      ['upcoming', 'in-progress', 'completed'] // Exclude cancelled bookings
    );

    // Extract all booked dates from bookings
    const bookedDates = [];
    bookings.forEach(booking => {
      const startDate = new Date(booking.pickupDate);
      const endDate = new Date(booking.returnDate);
      
      // Add all dates from pickup to return (inclusive of pickup, exclusive of return)
      let currentDate = new Date(startDate);
      while (currentDate < endDate) {
        bookedDates.push({
          date: format(currentDate, 'yyyy-MM-dd'),
          bookingId: booking._id,
          status: booking.status
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    // Get all days in the month
    const daysInMonth = eachDayOfInterval({
      start: monthStart,
      end: monthEnd
    });

    // Create calendar data
    const calendarData = daysInMonth.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const booking = bookedDates.find(bd => bd.date === dateStr);
      
      return {
        date: dateStr,
        day: day.getDate(),
        isBooked: !!booking,
        bookingStatus: booking?.status || null,
        bookingId: booking?.bookingId || null
      };
    });

    return {
      month: format(monthDate, 'MMMM yyyy'),
      year: monthDate.getFullYear(),
      monthNumber: monthDate.getMonth() + 1,
      carId,
      bookedDates: bookedDates.map(bd => bd.date),
      calendarData,
      totalBookedDays: bookedDates.length
    };
  } catch (error) {
    console.error('Error getting booked dates:', error);
    throw new Error(`Failed to get booked dates: ${error.message}`);
  }
};

/**
 * Check if specific dates are available for a car
 * @param {string} carId - The car ID
 * @param {Date} pickupDate - Pickup date
 * @param {Date} returnDate - Return date
 * @returns {Promise<Object>} Availability details
 */
const checkDateAvailability = async (carId, pickupDate, returnDate) => {
  try {
    const booking = await RentACarBooking.findOne({
      carId,
      pickupDate: { $lt: returnDate },
      returnDate: { $gt: pickupDate },
      status: { $in: ['upcoming', 'in-progress', 'completed'] }
    });

    const isAvailable = !booking;

    return {
      isAvailable,
      pickupDate: format(new Date(pickupDate), 'yyyy-MM-dd'),
      returnDate: format(new Date(returnDate), 'yyyy-MM-dd'),
      conflictingBooking: booking ? {
        id: booking._id,
        status: booking.status,
        picksUpDate: format(new Date(booking.pickupDate), 'yyyy-MM-dd'),
        returnsDate: format(new Date(booking.returnDate), 'yyyy-MM-dd')
      } : null
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    throw new Error(`Failed to check availability: ${error.message}`);
  }
};

const availabilityService = {
  getBookedDatesForMonth,
  checkDateAvailability
};

export default availabilityService;
