import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';

const ConversationList = ({ conversations, activeConversation, onSelectConversation, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations?.filter(conversation =>
    conversation?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    conversation?.lastMessage?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return messageTime?.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 168) {
      return messageTime?.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageTime?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className={`flex flex-col h-full bg-background border-r border-border ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">Messages</h2>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Icon name="Edit" size={20} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-primary mb-2">No conversations found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Try a different search term' : 'Start a new conversation'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredConversations?.map((conversation) => (
              <div
                key={conversation?.id}
                onClick={() => onSelectConversation(conversation)}
                className={`p-4 cursor-pointer transition-colors hover:bg-muted ${
                  activeConversation?.id === conversation?.id ? 'bg-accent/10 border-r-2 border-accent' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <Image
                      src={conversation?.avatar}
                      alt={conversation?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-background rounded-full"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-primary truncate">
                        {conversation?.name}
                      </h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {formatTime(conversation?.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${
                        conversation?.unreadCount > 0 ? 'font-medium text-primary' : 'text-muted-foreground'
                      }`}>
                        {conversation?.isTyping ? (
                          <span className="text-accent flex items-center">
                            <Icon name="MoreHorizontal" size={16} className="mr-1 animate-pulse" />
                            typing...
                          </span>
                        ) : (
                          <>
                            {conversation?.lastMessageType === 'image' && (
                              <Icon name="Image" size={14} className="inline mr-1" />
                            )}
                            {conversation?.lastMessageType === 'video' && (
                              <Icon name="Video" size={14} className="inline mr-1" />
                            )}
                            {conversation?.lastMessageType === 'audio' && (
                              <Icon name="Mic" size={14} className="inline mr-1" />
                            )}
                            {conversation?.lastMessage}
                          </>
                        )}
                      </p>
                      
                      {conversation?.unreadCount > 0 && (
                        <div className="flex-shrink-0 ml-2">
                          <span className="inline-flex items-center justify-center min-w-[20px] h-5 bg-accent text-accent-foreground text-xs font-medium rounded-full px-1.5">
                            {conversation?.unreadCount > 99 ? '99+' : conversation?.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;