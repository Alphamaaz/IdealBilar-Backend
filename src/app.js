//External modules
import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import { userRouter } from "./modules/user/index.js";

const app = express();

app.use(express.json());

// User URL's
app.use('/api/v1',userRouter);
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    success: true,
    message: 'Server is healthy',
  });
});
 
export { app };
export default app;
