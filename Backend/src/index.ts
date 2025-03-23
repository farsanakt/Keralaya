import express from "express";
import http from "http"; // Import HTTP module
import { Server } from "socket.io"; // Import Socket.io
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDb from "./config/dbConfig";
import user_route from "./Routes/user/userRoutes";
import userAuth_route from "./Routes/user/authRoutes";
import adminAuth_route from "./Routes/admin/authRoutes";
import guide_authRoute from "./Routes/guide/authRoutes";
import admin_Routes from "./Routes/admin/adminRoutes";
import guide_route from "./Routes/guide/guideRoutes";
import cookieparser from "cookie-parser";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import path = require("path");


import ChatService from "@/services/user/chatService"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"],
  pingInterval: 25000, 
  pingTimeout: 60000, 
  allowEIO3: true,
});


connectMongoDb();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

const accessLogStream = createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "logs"),
});
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));


app.use("/", user_route);
app.use("/", userAuth_route);
app.use("/", adminAuth_route);
app.use("/", guide_authRoute);
app.use("/", admin_Routes);
app.use("/", guide_route);


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

 
  socket.on("joinRoom", (chatRoomId) => {
    socket.join(chatRoomId);
    console.log(`User joined room: ${chatRoomId}`);
  });

 
  socket.on("sendMessage", async ({ senderId, receiverId, message,chatRoomId }) => {
    console.log("Incoming message data:", { senderId, receiverId, message });

    try {
    

      const newMessage = await ChatService.sendMessage({
        senderId,
        receiverId,
        message,
        chatRoomId,
      } as any);

      console.log("Message saved to DB:", newMessage)

      io.to(chatRoomId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

 
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
})


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
