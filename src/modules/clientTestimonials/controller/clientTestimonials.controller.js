const testimonialHandler = (req, res) => {
    
    res.status(200).json({
        message: "Reached to the client testimonial endpoint!",
        data: req.body

    })
}

module.exports = testimonialHandler;