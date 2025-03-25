import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Message } from "@/types/message";
import { RootState } from "@/redux/store";
import { addMessage, setMessages } from "@/redux/slices/chatSlice"; 
import { chatIdCreation, existingMessages } from "@/service/user/userApi";

interface ChatProps {
  bookingId: string;
  role: any;
}

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
  withCredentials: true,
});

export default function Chat({ bookingId, role }: ChatProps) {
  const BK_ID = bookingId;
  const rol = role;
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const [text, setText] = useState<string>("");
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);

  const chatRoomIdCreation = async () => {
    try {
      const response = await chatIdCreation(BK_ID);
      setChatRoomId(response.data);
    } catch (error) {
      console.error("Error creating chatRoomId:", error);
    }
  };
  
  useEffect(() => {
    chatRoomIdCreation(); 
  }, []);
  
  useEffect(() => {
    if (!chatRoomId) return;
  
    const fetchMessages = async () => {
      try {
        const response = await existingMessages(chatRoomId);
        console.log(response, "hoopppe");
        const data = response.data;
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

    socket.on("receiveMessage", (message: Message) => {
      // Only add the message if it's from someone else to avoid duplicates
      if (message.senderId !== "Farsana") {
        dispatch(addMessage(message));
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [dispatch, chatRoomId]);

  const sendMessage = () => {
    if (!chatRoomId) {
      console.error("ChatRoomId is null. Cannot send message.");
      return;
    }
  
    if (text.trim() !== "") {
      const timestamp = new Date().toISOString();
      const message = {
        senderId: "Farsana",
        receiverId: "SomeReceiverId",
        message: text,
        chatRoomId,
        rol,
        timestamp: timestamp,
        read: false,
      };
      console.log('message');
  
      console.log("Sending message:", message);
      socket.emit("sendMessage", message);
      
      // Add the message to our local state with the timestamp
      dispatch(addMessage({ 
        senderId: "Farsana", 
        message: text, 
        timestamp: timestamp,
        read: false,
        role: rol
      }));
      
      setText("");
    }
  };

 
  const formatTime = (timestamp:any) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-full w-full bg-white">
      <header className="bg-black text-white py-3 px-4">
        <h1 className="text-lg font-medium">Socket Chat</h1>
      </header>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-3">
          {messages.map((msg, index) => {
            const isCurrentUser = msg.role === rol;
            const senderName = isCurrentUser ? "You" : msg.senderId;
            
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
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}