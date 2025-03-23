// src/components/chat/ChatModal.tsx
import React from 'react';
import ChatContainer from '@/pages/user/Chat';

interface ChatModalProps {
  bookingId: string;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ bookingId, onClose }) => {
  console.log(bookingId,'hhhhhhhh')
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-3/4">
        <ChatContainer bookingId={bookingId} onClose={onClose} />
      </div>
    </div>
  );
};

export default ChatModal;