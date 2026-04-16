//External modules

//Internal modules
import {rentACarDataDeleteRepository } from '../repositories/rentACarDataDeleteInquiry.repository.js'

const rentACarDataDeleteService = async (rentACarId) => {
    try{
        const deletedInquiry = await rentACarDataDeleteRepository(rentACarId);

        if (!deletedInquiry) {
            return {
                success: false,
                status: 404,
                message: "Rent a car inquiry not found",
            };
        }

        return {
            success: true,
            status: 200,
            message: "Rent a car inquiry deleted successfully",
            data: deletedInquiry,
        };
        
    }catch(err){
        if (err.name === "CastError") {
            return {
                success: false,
                status: 400,
                message: "Invalid rent a car inquiry ID",
            };
        }

        return {
            success: false,
            status: 500,
            message: "Failed to delete rent a car inquiry",
            error: err.message,
        };
    }
}

//exports

export {
    rentACarDataDeleteService
}
