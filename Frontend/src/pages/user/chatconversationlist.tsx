// src/components/chat/ConversationList.tsx
import React from 'react';
import moment from 'moment';

interface Conversation {
  _id: string;
  participants: Array<{
    _id: string;
    name: string;
    profileImage?: string;
  }>;
  bookingId: {
    _id: string;
    details: {
      date: string;
      time: string;
    };
  };
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  loading: boolean;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelectConversation,
  loading
}) => {
  // Get other participant (not current user)
  const getOtherParticipant = (conversation: Conversation, currentUserId: string) => {
    return conversation.participants.find(p => p._id !== currentUserId) || conversation.participants[0];
  };

  console.log(conversations,'hhhhhopppeeede')

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No conversations yet
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full">
      {conversations.map((conversation) => {
        const otherParticipant = getOtherParticipant(conversation, ''); // Replace with current user ID
        
        return (
          <div
            key={conversation._id}
            className={`p-4 border-b cursor-pointer hover:bg-gray-100 transition ${
              selectedId === conversation._id ? 'bg-blue-50' : ''
            }`}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                {otherParticipant.profileImage ? (
                  <img 
                    src={otherParticipant.profileImage} 
                    alt={otherParticipant.name} 
                    className="h-10 w-10 rounded-full" 
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-700">
                    {otherParticipant.name.charAt(0)}
                  </span>
                )}
              </div>
              
              <div className="ml-3 flex-1">
                <div className="flex items-baseline">
                  <span className="text-sm font-medium text-gray-900">
                    {otherParticipant.name}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">
                    {conversation.lastMessageTime 
                      ? moment(conversation.lastMessageTime).fromNow() 
                      : 'New'
                    }
                  </span>
                </div>
                
                <div className="flex mt-1">
                  <p className="text-xs text-gray-500 truncate flex-1">
                    {conversation.lastMessage || 'Start a conversation'}
                  </p>
                  
                  {(conversation.unreadCount && conversation.unreadCount > 0) && (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                
                <div className="text-xs text-gray-400 mt-1">
                  {conversation.bookingId?.details?.date}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;