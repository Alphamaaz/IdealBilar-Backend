import { get } from "mongoose";
import { getAdmin } from "../repositories/users.repository.js";

const getAdminService = async () => {
    try {
        const result = await getAdmin();
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    getAdminService
}