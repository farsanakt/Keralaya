import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDb from "./config/dbConfig";
import user_route from "./Routes/user/userRoutes";
import userAuth_route from "./Routes/user/authRoutes";
import {createProxyMiddleware} from 'http-proxy-middleware'


dotenv.config(); // Load environment variables

// Validate critical environment variables


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json()); // Parse incoming JSON payloads

// Connect to MongoDB
connectMongoDb();


app.use('/', user_route);
app.use('/', userAuth_route);

// Error Handling Middleware


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
