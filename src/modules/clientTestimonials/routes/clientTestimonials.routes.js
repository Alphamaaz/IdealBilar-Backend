//External modules
import express from 'express'

//Internal module
import { adminOnlyMiddleware } from '../../../shared/middlewares/adminOnlyAuth.moddleware.js';
import { middlewareForVerifyJwtToken } from '../../../shared/middlewares/auth.middleware.js';
import adminAddNewTestimonial from '../controller/addNewTestimonial.controller.js';
import getAllTestimonialHandler from '../controller/getAllTestimonial.controller.js'
import deleteTestimonialHandler from '../controller/deleteTestimonial.controller.js';
import updateTestimonialHandler from '../controller/updateTestimonial.controller.js'

const router = express.Router();

//Admin add new testimonial endpoint/URL
router.post('/add-new-testimonial', middlewareForVerifyJwtToken, adminOnlyMiddleware, adminAddNewTestimonial)

//Get all the recent testimonials
router.get('/recent-testimonial', getAllTestimonialHandler);

//Delete testimonial 
router.delete('/testimonial/:testimonialId', middlewareForVerifyJwtToken, adminOnlyMiddleware, deleteTestimonialHandler)

//Update testimonial 
router.put('/testimonial/:testimonialId', middlewareForVerifyJwtToken, adminOnlyMiddleware, updateTestimonialHandler);
//export
export default router;