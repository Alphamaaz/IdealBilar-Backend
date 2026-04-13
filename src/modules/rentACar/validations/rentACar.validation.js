// External modules
import {z} from "zod";

// Rent a car validation schema
const dateSchema = z
  .union([z.string(), z.date()])
  .transform((value)=> new Date(value));

const rentACarValidationSchema = z.object({
    pickupLocation: z.string(),
    email: z.string(),
    pickupDate: dateSchema,
    returnDate: dateSchema,
})

const rentACarDataValidationFunction = (rentACarData) => {
    try{
    return rentACarValidationSchema.safeParse(rentACarData);
    }catch(err){
        throw err
    }
}

// export
export{
    rentACarDataValidationFunction
}