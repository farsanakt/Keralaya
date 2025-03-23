// src/contexts/SocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("🔵 SocketProvider is rendering..."); // ✅ Add this
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.user.currentUser?.token);


  useEffect(() => {
    if (!token) return;

    // Initialize socket connection
    const socketInstance = io(process.env.REACT_APP_API_URL || 'http://localhost:4000', {
      auth: { token }
    });
    socketInstance.emit('connection',()=>{
      console.log('llll');
      
    })
    // Socket event listeners
    socketInstance.on('connect', () => {
      console.log('Socket connected');
      socketInstance.emit("testEvent", { message: "Hello from frontend!" });
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};