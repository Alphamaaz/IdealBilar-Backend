// Internal modules
import { authenticateSocket } from "../middlewares/authChat.middleware.js";
import { registerChatEvents } from "./events/chat.events.js";

export const socketHandler = (io) => {
    console.log("We are in the socket handler function ");
    
    // Apply authentication middleware
    // io.use(authenticateSocket);
    
    io.on("connection", (socket) => {
        console.log("New connection ", socket.id);
        console.log("User data:", socket.user);

        // Register all events modules
        registerChatEvents(io, socket);

        socket.on('disconnect', () => {
            console.log("Disconnected : ", socket.id);
        });
    });
};