//External modules

import { fi } from "zod/locales";

//Internal modules
import { filterCarRentalsForCustomerNameRepository, filterCarRentalsForSearchRepository, filterCarRentalsForPickupDateRepository, filterCarRentalsForReturnDateRepository } from '../repositories/carRentalFilter.repository.js';
const filterCarRentalsService = async (query) => {
  try {
    const {search, customerName, pickupDate, returnDate} = query;
    if(!search && !customerName && !pickupDate && !returnDate) {
      throw new Error("At least one filter parameter must be provided");
    }
    if(search) {
        const searchFilters = search;
        const result = await filterCarRentalsForSearchRepository("title", searchFilters);
        console.log("We check the search result ", result);
        return {
            title: "Title",
            data: result
        }
    }
    if(customerName){
      const result = await filterCarRentalsForCustomerNameRepository(customerName);
      return {
        title: customerName,
        data: result
      }
    }
    if(pickupDate){
      const result = await filterCarRentalsForPickupDateRepository(pickupDate);
      return {
        title: `Pickup Date: ${pickupDate}`,
        data: result
      }
    }
    if(returnDate){
      const result = await filterCarRentalsForReturnDateRepository(returnDate);
      return {
        title: `Return Date: ${returnDate}`,
        data: result
      }
    }
  } catch (error) {
    throw error;
  }
};

//export
export {
  filterCarRentalsService
};