const userController = (req , res) => {
    res.status(200).json({
        message: "we reached to the user endpoint!"
    })
}

module.exports = { userController };