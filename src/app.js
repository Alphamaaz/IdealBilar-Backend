//External modules
const express = require('express');
//Internal modules
const {userRouter} = require("./modules/user");
const clientTestimonialRoutes = require('./modules/clientTestimonials');
const RentACarRouter = require('./modules/rentACar');
const contactusRouter = require('./modules/contactus');

const app = express();

app.use(express.json())

// User endpoints/URL's
app.use('/api',userRouter);

// Client testimonial endpoints/URL's
app.use('/api', clientTestimonialRoutes);

//Rent a car endpoints/URL's
app.use('/api',RentACarRouter);

//Contact Us endpoints/URL's
app.use('/api', contactusRouter);

 module.exports = app;