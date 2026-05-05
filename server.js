//Core modules
import http from 'http'

//External modules
import { Server } from 'socket.io';
//Internal modules
import { app } from "./src/app.js";
import connectDB from "./src/database/db.js";



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

connectDB();
