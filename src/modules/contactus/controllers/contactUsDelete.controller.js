// External modules

// Internal modules
const contactUsDeleteController = async (req, res) => {
    try{
         const userId = req.params.userId;
         console.log("User Id : ", userId);
         
        res.status(200).json({
            success: true,
            message: "Reached to the contact us delete controller!"
        })
    }catch(err){
        throw err;
    }
}

//export

export {
    contactUsDeleteController
}