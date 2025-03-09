import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDb from "./config/dbConfig";
import user_route from "./Routes/user/userRoutes";
import userAuth_route from "./Routes/user/authRoutes";
import adminAuth_route from "./Routes/admin/authRoutes";
import guide_authRoute from "./Routes/guide/authRoutes";
import admin_Routes from "./Routes/admin/adminRoutes";
import cookieparser from 'cookie-parser'
import guide_route from "./Routes/guide/guideRoutes";
import morgan from 'morgan'
import { createStream } from "rotating-file-stream";
import path = require("path");
dotenv.config(); 




const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json()); 
app.use(cookieparser())

connectMongoDb();


const accessLogStream = createStream('access.log', {
  interval: '1d', 
  path: path.join(__dirname, 'logs'),
});



app.use(morgan('combined', { stream: accessLogStream })); 
app.use(morgan('dev')); 

app.use('/', user_route);
app.use('/', userAuth_route);
app.use('/',adminAuth_route)
app.use('/',guide_authRoute)
app.use('/',admin_Routes)
app.use('/',user_route)
app.use('/',guide_route)





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
