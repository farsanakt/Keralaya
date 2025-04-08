import ChatRepository from "@/repositories/implementation/chatRepositories";
import { GuideRepositories } from "@/repositories/implementation/guideRepositories";
import { IChat } from "@/models/userModel/chatModel";

class ChatService {

  private guideRepositories: GuideRepositories
  
     
  
      constructor(){
  
          this.guideRepositories=new GuideRepositories()
         
      }


  async sendMessage(data: IChat) {
    return await ChatRepository.saveMessage(data);
  }

  async getChatHistory(chatRoomId: string) {
    return await ChatRepository.getMessages(chatRoomId);
  }

  async createChatId(id: string) {
    const bookings = await ChatRepository.getBookings(id);
  
    const guideid = bookings?.guideId;
    const userEmail = bookings?.userEmail; 
  
    const guide = guideid ? await this.guideRepositories.findUserById(guideid) : null;
  
    return { bookings, guideName: guide?.name, guideId: guideid, userEmail };
  }

  async chatDetails(id:string){

    try {

      const chatDetails=await ChatRepository.chatDetails(id)

      return chatDetails?.bookingId
      
    } catch (error) {

      console.log('error occur in chat service')
      
    }

  }
  
  

}

export default new ChatService();
