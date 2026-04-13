//External modules
const express = require('express');

//Internal module
const clientTestimonial = require('../controller/clientTestimonials.controller');

const router = express.Router();

router.post('/client-testimonial', clientTestimonial)

module.exports = router;