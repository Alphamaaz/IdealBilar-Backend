//External modules
const express = require('express');
//Internal modules
const {userRouter} = require("./modules/user");
const clientTestimonialRoutes = require('./modules/clientTestimonials');
const RentACarRouter = require('./modules/rentACar')

const app = express();

app.use(express.json())

// User URL's
app.use('/api',userRouter);

// Client testimonial URL's
app.use('/api', clientTestimonialRoutes);

//Rent a car URL's

app.use('/api',RentACarRouter);

 module.exports = app;