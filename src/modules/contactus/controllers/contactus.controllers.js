//External modules

//Internal modules

const contactusController = (req, res) => {
    try{
        const {success, data, error } =
       res.status(200).json({
        success: true,
        message: "Reached to the contactus controller!",
        data: req.body
       })
    }catch(err){
        throw err;
    }
}

// exports

module.exports = {contactusController};