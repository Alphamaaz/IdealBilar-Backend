import { messageDataRepository } from "../repositories/message.repository.js";
const messageDataService = async () => {
    try {
        const result = messageDataRepository();
        return result;
    } catch (error) {
        throw error;
    }
}

export {
    messageDataService
};