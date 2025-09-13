import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import MessageBubble from './MessageBubble';
import MessageComposer from './MessageComposer';

const ChatArea = ({ conversation, messages, onSendMessage, className = '' }) => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) {
    return (
      <div className={`flex flex-col items-center justify-center h-full bg-background ${className}`}>
        <div className="text-center max-w-md">
          <Icon name="MessageCircle" size={64} className="text-muted-foreground mb-6 mx-auto" />
          <h2 className="text-2xl font-semibold text-primary mb-4">Welcome to Messages</h2>
          <p className="text-muted-foreground mb-6">
            Select a conversation from the sidebar to start chatting with your friends and followers.
          </p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Start New Conversation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-background ${className}`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={conversation?.avatar}
              alt={conversation?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation?.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-background rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-primary">{conversation?.name}</h3>
            <p className="text-sm text-muted-foreground">
              {conversation?.isOnline ? 'Active now' : `Last seen ${conversation?.lastSeen}`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" iconName="Phone" />
          <Button variant="ghost" size="icon" iconName="Video" />
          <Button 
            variant="ghost" 
            size="icon" 
            iconName="Info"
            onClick={() => setShowUserInfo(!showUserInfo)}
          />
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message, index) => {
          const showAvatar = index === 0 || messages?.[index - 1]?.senderId !== message?.senderId;
          const showTimestamp = index === messages?.length - 1 || 
            messages?.[index + 1]?.senderId !== message?.senderId ||
            (new Date(messages[index + 1].timestamp) - new Date(message.timestamp)) > 300000; // 5 minutes

          return (
            <MessageBubble
              key={message?.id}
              message={message}
              showAvatar={showAvatar}
              showTimestamp={showTimestamp}
              isCurrentUser={message?.senderId === 'currentUser'}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      {/* Message Composer */}
      <MessageComposer onSendMessage={onSendMessage} />
      {/* User Info Sidebar */}
      {showUserInfo && (
        <>
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setShowUserInfo(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-background border-l border-border z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-primary">Contact Info</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  iconName="X"
                  onClick={() => setShowUserInfo(false)}
                />
              </div>

              <div className="text-center mb-6">
                <Image
                  src={conversation?.avatar}
                  alt={conversation?.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="text-xl font-semibold text-primary mb-1">{conversation?.name}</h4>
                <p className="text-muted-foreground">@{conversation?.username}</p>
              </div>

              <div className="space-y-4">
                <Button variant="outline" fullWidth iconName="UserPlus" iconPosition="left">
                  View Profile
                </Button>
                <Button variant="outline" fullWidth iconName="Bell" iconPosition="left">
                  Mute Notifications
                </Button>
                <Button variant="outline" fullWidth iconName="Search" iconPosition="left">
                  Search in Conversation
                </Button>
                <Button variant="destructive" fullWidth iconName="UserX" iconPosition="left">
                  Block User
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;