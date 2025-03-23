import ChatRepository from "@/repositories/implementation/chatRepositories";
import { IChat } from "@/models/userModel/chatModel";

class ChatService {
  async sendMessage(data: IChat) {
    return await ChatRepository.saveMessage(data);
  }

  async getChatHistory(chatRoomId: string) {
    return await ChatRepository.getMessages(chatRoomId);
  }

  async createChatId(id:string){

    return await ChatRepository.getBookings(id)

  }

}

export default new ChatService();
