//Core modules
import http from 'http'

//External modules
import { Server } from 'socket.io';
//Internal modules
import { app } from "./src/app.js";
import connectDB from "./src/database/db.js";
import { socketHandler } from './src/modules/chats/sockets/chat.socket.js';
import { config } from "./src/shared/config/config.js";



//Attach socket.io to the same server 
const io = new Server(server, {
  cors: {
    origin: config.socketIOCorsOrigin,
    method: ['GET','POST'],
  }
})

//Initialize socket event
socketHandler(io);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

connectDB();
