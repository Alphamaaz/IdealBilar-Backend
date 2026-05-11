//Core modules
import http from 'http'

//External modules
import { Server } from 'socket.io';
//Internal modules
import { app } from "./src/app.js";
import connectDB from "./src/database/db.js";
import { socketHandler } from './src/modules/chats/sockets/chat.socket.js';
import { config } from "./src/shared/config/config.js";

//Create server explicitly
const server = http.createServer(app);

//Attach socket.io to the same server 
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      
      if (config.socketIOCorsOrigin.includes(origin)) {
        return callback(null, true);
      }
      
      return callback(new Error(`Socket.IO CORS rejected: ${origin}`));
    },
    methods: ['GET','POST'],
    credentials: true
  }
})

//Initialize socket event
socketHandler(io);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

connectDB();
