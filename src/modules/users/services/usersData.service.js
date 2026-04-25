import { usersDataRepository } from "../repositories/usersData.repository.js";

const usersDataService = async () => {
    try {
        const result = await usersDataRepository();
        return result;
    } catch (error) {
        throw error;
    }
}

export {
    usersDataService
}