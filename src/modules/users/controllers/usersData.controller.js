import { usersDataService } from "../services/usersData.service.js";
const userDataController = async (req, res) => {
    try {
        const result = await usersDataService();
        res.status(200).json({
            success: true,
            message: "Successfully fetched all the users data!",
            data: result[0]
        })
    } catch (error) {
        throw error;
    }
}

export {
    userDataController
}