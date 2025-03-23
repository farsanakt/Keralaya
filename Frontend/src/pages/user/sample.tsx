import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Connect to backend

const SocketTest = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.io Server:", socket.id);
    });

    socket.on("receiveMessage", (data) => {
      console.log("Message received from server:", data);
      setReceivedMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Socket.io Connection Test</h2>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h3>Received Message: {receivedMessage}</h3>
    </div>
  );
};

export default SocketTest;
