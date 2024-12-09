import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDb from "./config/dbConfig";
import user_route from "./Routes/user/userRoutes";
import userAuth_route from "./Routes/user/authRoutes";
import {createProxyMiddleware} from 'http-proxy-middleware'
import adminAuth_route from "./Routes/admin/authRoutes";
import guide_authRoute from "./Routes/guide/authRoutes";
import admin_Routes from "./Routes/admin/adminRoutes";


dotenv.config(); 




const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json()); 

connectMongoDb();


app.use('/', user_route);
app.use('/', userAuth_route);
app.use('/',adminAuth_route)
app.use('/',guide_authRoute)
app.use('/',admin_Routes)





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
