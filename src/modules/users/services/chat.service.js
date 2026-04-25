import { chatDataRepository } from "../repositories/chat.repository.js";
const chatDataService = async () => {
    try {
        const result = await chatDataRepository();
        return result;
    } catch (error) {
        throw error
    }
}

export {
    chatDataService
}