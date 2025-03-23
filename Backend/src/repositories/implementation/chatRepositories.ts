import BookingModel, { IBooking } from "@/models/userModel/BookingModel";
import Chat, { IChat } from "@/models/userModel/chatModel";

class ChatRepository {
  async saveMessage(data: IChat): Promise<IChat> {
    const newMessage = new Chat(data);
    return await newMessage.save();
  }

  async getMessages(chatRoomId: string): Promise<IChat[]> {
    return await Chat.find({ chatRoomId }).sort("timestamp");
  }

  async getBookings(id:string):Promise<IBooking| null>{

    return await BookingModel.findById({_id:id})

  }
}

export default new ChatRepository();
