import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io} from "socket.io-client";
// import { Message } from "@/types/message";
import { RootState } from "@/redux/store";
import { addMessage, setMessages } from "@/redux/slices/chatSlice"; 
import { chatIdCreation, existingMessages } from "@/service/user/userApi";

interface ChatProps {
  bookingId: string;
  role: string;
}

interface BookingData {
  _id: string;
  userEmail: string;
  guideId: string;
  guideName:string
  amount: string;
  status: string;
  bookeddate: string;
  locname: string;
  paymentStatus: string;
  __v: number;
}


const socket = io("http://localhost:4000", {
  transports: ["websocket"],
  withCredentials: true,
});

export default function Chat({ bookingId, role }: ChatProps) {
  const BK_ID = bookingId;
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const [text, setText] = useState<string>("");
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [chatName, setChatName] = useState<string>("");

  const messageProcessingRef = useRef(false);
  
  const processedMessageIds = useRef<Set<string>>(new Set());

  const chatRoomIdCreation = async () => {
    try {
      const response = await chatIdCreation(BK_ID as string);
      setChatRoomId(response.data.chatRoomId);
      setBooking(response.data.response);
      
      
      if (response.data.response) {
        const bookingData = response.data.response as BookingData;
        console.log(bookingData,'jjjjop')
        if (role === "user") {
          setChatName(bookingData.guideName); 
        } else {
         
          const userName = bookingData.userEmail.split('@')[0];
          setChatName(userName);
        }
      }
    } catch (error) {
      console.error("Error creating chatRoomId:", error);
    }
  };
  
  useEffect(() => {
    chatRoomIdCreation();
    
    
    return () => {
      dispatch(setMessages([]));
    };
  }, []);
  
  useEffect(() => {
    if (!chatRoomId) return;
  
    const fetchMessages = async () => {
      try {
        const response = await existingMessages(chatRoomId);
        
       
        const data = Array.isArray(response.data) ? response.data : [];
        
       
        data.forEach((msg: any) => {
          if (msg._id) {
            processedMessageIds.current.add(msg._id);
          }
        });
        
        dispatch(setMessages(data));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    fetchMessages();
  }, [dispatch, chatRoomId]);
  
  useEffect(() => {
    if (!chatRoomId) return;
    
    socket.emit("joinRoom", chatRoomId);

    
    const handleReceiveMessage = (message: any) => {
      
      if (messageProcessingRef.current) {
        messageProcessingRef.current = false;
        return;
      }
      
      if (message._id && processedMessageIds.current.has(message._id)) {
        return;
      }
      
      
      if (message._id) {
        processedMessageIds.current.add(message._id);
      }
      
      
      dispatch(addMessage(message));
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      
      socket.off("receiveMessage", handleReceiveMessage);
      socket.emit("leaveRoom", chatRoomId);
    };
  }, [dispatch, chatRoomId]);

  const sendMessage = () => {
    if (!chatRoomId || !booking) {
      console.error("ChatRoomId or booking data is missing. Cannot send message.");
      return;
    }
  
    if (text.trim() === "") return;

    try {
      
      messageProcessingRef.current = true;
      
      const timestamp = new Date().toISOString();
      
      
      const senderId = role === "user" ? booking.userEmail : booking.guideId;
      const receiverId = role === "user" ? booking.guideId : booking.userEmail;
      
      
      const messageToSend = {
        senderId: senderId,
        receiverId: receiverId,
        message: text,
        chatRoomId,
        BK_ID,
        rol: role, 
        role: role,  
        timestamp,
        read: false,
      };
      
      
      socket.emit("sendMessage", messageToSend);

      
      dispatch(addMessage({ 
        senderId, 
        receiverId,
        message: text, 
        chatRoomId,
        timestamp,
        BK_ID ,
        read: false,
        role 
      }));
      
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
      
      messageProcessingRef.current = false;
    }
  };

  const formatTime = (timestamp: string | undefined) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error("Error formatting time:", error);
      return "";
    }
  };
  
  return (
    <div className="flex flex-col h-full w-full bg-white">
      <header className="bg-black text-white py-3 px-4">
        <h1 className="text-lg font-medium">{chatName}</h1>
      </header>

      
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-3">
          {messages.map((msg, index) => {
            
            const isCurrentUser = role === msg.role;
            
            
            const senderName = isCurrentUser ? "You" : (
              role === "user" ? booking?.guideName : booking?.userEmail.split('@')[0]
            );
            
            return (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-xs ${
                  isCurrentUser
                    ? "ml-auto bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <p className="font-medium text-xs mb-1">{senderName}</p>
                <p className="text-sm">{msg.message}</p>
                <div className="flex justify-end items-center mt-1 text-xs opacity-70">
                  <span>{formatTime(msg.timestamp)}</span>
                  {isCurrentUser && (
                    <span className="ml-1">
                      {msg.read ? (
                        <span className="text-blue-400">✓✓</span>
                      ) : (
                        <span>✓</span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input & Send Button */}
      <div className="border-t border-gray-300 p-3 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-2 text-sm border border-gray-300 rounded"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors text-sm"
            disabled={!chatRoomId || text.trim() === ''}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}