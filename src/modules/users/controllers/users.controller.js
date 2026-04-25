
import { getAdminService } from "../services/users.service.js";
const usersData = async (req,res) => {
    try {
        const usersData = await getAdminService();
        res.status(200).json({
            success: true,
            message: "Successfully fetched the admin data ",
            data: usersData[0]
        })
    } catch (error) {
        throw error;
    }
}

export {
    usersData as adminDataHandler
}