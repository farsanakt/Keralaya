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


app.use('/', user_route);
app.use('/', userAuth_route);
app.use('/',adminAuth_route)
app.use('/',guide_authRoute)
app.use('/',admin_Routes)
app.use('/',user_route)





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
