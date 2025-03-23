// src/components/chat/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import moment from 'moment';

interface Message {
  _id: string;
  conversationId: string;
  sender: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  text: string;
  read: boolean;
  createdAt: string;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  isTyping: boolean;
  loading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  isTyping,
  loading
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  messages.forEach(message => {
    const date = moment(message.createdAt).format('YYYY-MM-DD');
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <div className="flex-grow overflow-y-auto p-4">
      {Object.keys(groupedMessages).map(date => (
        <div key={date}>
          <div className="flex justify-center my-4">
            <span className="text-xs bg-gray-200 rounded-full px-3 py-1 text-gray-500">
              {moment(date).calendar(null, {
                sameDay: '[Today]',
                lastDay: '[Yesterday]',
                lastWeek: 'dddd',
                sameElse: 'MMMM D, YYYY'
              })}
            </span>
          </div>
          
          {groupedMessages[date].map((message) => {
            const isCurrentUser = message.sender._id === currentUserId;
            
            return (
              <div 
                key={message._id} 
                className={`flex mb-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isCurrentUser && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                    {message.sender.profileImage ? (
                      <img 
                        src={message.sender.profileImage} 
                        alt={message.sender.name} 
                        className="h-8 w-8 rounded-full" 
                      />
                    ) : (
                      <span className="text-sm font-medium text-gray-700">
                        {message.sender.name.charAt(0)}
                      </span>
                    )}
                  </div>
                )}
                
                <div className={`max-w-xs md:max-w-md lg:max-w-lg`}>
                  <div 
                    className={`px-4 py-2 rounded-lg ${
                      isCurrentUser 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                  
                  <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                    isCurrentUser ? 'justify-end' : 'justify-start'
                  }`}>
                    {moment(message.createdAt).format('h:mm A')}
                    {isCurrentUser && (
                      <span className="ml-1">
                        {message.read ? (
                          <svg className="h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.707 5.293a1 1 0 00-1.414 0L3 10.586V11h.01l4.3 4.3a1 1 0 001.4 0l8.3-8.3a1 1 0 00-1.4-1.4L9 12.586 5.414 9l4.293-4.293a1 1 0 000-1.414z" />
                          </svg>
                        ) : (
                          <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.707 5.293a1 1 0 00-1.414 0L3 10.586V11h.01l4.3 4.3a1 1 0 001.4 0l8.3-8.3a1 1 0 00-1.4-1.4L9 12.586 5.414 9l4.293-4.293a1 1 0 000-1.414z" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start mb-3">
          <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;