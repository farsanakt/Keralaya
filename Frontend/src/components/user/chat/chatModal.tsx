import React from 'react';
import ChatContainer from '@/pages/user/Chat';

interface ChatModalProps {
  bookingId: string;
  onClose: () => void;
  role?: string; // Optional role parameter with default value in the component
}

const ChatModal: React.FC<ChatModalProps> = ({ bookingId, onClose, role}) => {
  console.log(bookingId, 'bookingId in ChatModal');
  console.log(role, 'role in ChatModal');
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">Chat</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-hidden">
          <ChatContainer bookingId={bookingId} role={role as string}   />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;