import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserNotifications: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chat_notifications") || "[]");
    setMessages(storedMessages);
  }, []);

  const handleMessageClick = (chatRoomId: string) => {
    const updated = messages.filter((msg) => msg.chatRoomId !== chatRoomId);
    setMessages(updated);
    localStorage.setItem("chat_notifications", JSON.stringify(updated));
    localStorage.setItem("chat_unread_count", updated.length.toString());
  
    navigate(`/chat/${chatRoomId}`);
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow hover:bg-gray-50 cursor-pointer"
              onClick={() => handleMessageClick(msg.chatRoomId)}
            >
              <p className="font-semibold">{msg.senderId}</p>
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserNotifications;
