// External modules
const { z, email } = require('zod');

// Contact Us validation Schema
const contactusValidationSchema = z.object({
   firstName: z.string().min(3).max(50),
   lastName: z.string().min(3).max(50),
   email: z.string().email(),
   subject: z.string().min(10),
   message: z.string().min(50)
})

const contactusValidation = (contactusData) => {
    try{
      return contactusValidationSchema.safeParse(contactusData);
    }catch(err){
        throw err;
    }
}