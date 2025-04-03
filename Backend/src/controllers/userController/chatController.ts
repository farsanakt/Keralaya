import { Request, Response } from "express";
import ChatService from "@/services/user/chatService";
import { HttpStatus } from "@/enums/HttpStatus";

class ChatController {

  async sendMessage(req: Request, res: Response) {
    
    try {
      const { senderId, receiverId, message } = req.body;
      const chatRoomId = [senderId, receiverId].sort().join("_");

      const newMessage = await ChatService.sendMessage({ senderId, receiverId, message, chatRoomId } as any);
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: "Failed to save message" });
    }
  }

  async getChatHistory(req: Request, res: Response) {
    console.log('hei')
    try {
      const {id}=req.params
      
      const messages = await ChatService.getChatHistory(req.params.id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Error fetching messages" });
    }
  }

  async idCreation(req:Request,res:Response){

    try {
      const {id}=req.params
      
      const response=await ChatService.createChatId(id)

      

      const shortenId = (id?: string) => (id ? id.slice(0, 5) : ""); 

      const chatRoomId = `${shortenId(response?.userEmail)}_${shortenId(response?.guideId)}`;
      
      if(chatRoomId){

        res.status(HttpStatus.CREATED).json({chatRoomId,response})

      }

      
    } catch (error) {

      res.status(HttpStatus.BAD_REQUEST).json({message:'something went wrong.please try again'})
      
    }

  }
}

export default  ChatController;
