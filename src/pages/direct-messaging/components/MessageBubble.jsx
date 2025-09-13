import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ message, showAvatar, showTimestamp, isCurrentUser }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(message?.reaction || null);

  const reactions = ['❤️', '😂', '😮', '😢', '😡', '👍'];

  const handleReaction = (reaction) => {
    setSelectedReaction(selectedReaction === reaction ? null : reaction);
    setShowReactions(false);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderMessageContent = () => {
    switch (message?.type) {
      case 'text':
        return (
          <p className="text-sm break-words whitespace-pre-wrap">
            {message?.content}
          </p>
        );
      
      case 'image':
        return (
          <div className="max-w-xs">
            <Image
              src={message?.content}
              alt="Shared image"
              className="rounded-lg object-cover w-full h-auto max-h-64"
            />
            {message?.caption && (
              <p className="text-sm mt-2 break-words">{message?.caption}</p>
            )}
          </div>
        );
      
      case 'video':
        return (
          <div className="max-w-xs relative">
            <video
              src={message?.content}
              className="rounded-lg object-cover w-full h-auto max-h-64"
              controls
              preload="metadata"
            />
            {message?.caption && (
              <p className="text-sm mt-2 break-words">{message?.caption}</p>
            )}
          </div>
        );
      
      case 'audio':
        return (
          <div className="flex items-center space-x-3 min-w-[200px]">
            <Button variant="ghost" size="icon" iconName="Play" />
            <div className="flex-1">
              <div className="h-1 bg-muted rounded-full">
                <div className="h-1 bg-accent rounded-full w-1/3"></div>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">0:15</span>
          </div>
        );
      
      case 'story_reply':
        return (
          <div className="border border-border rounded-lg p-3 bg-muted/50">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Eye" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Replied to your story</span>
            </div>
            <p className="text-sm">{message?.content}</p>
          </div>
        );
      
      case 'post_share':
        return (
          <div className="border border-border rounded-lg overflow-hidden max-w-xs">
            <Image
              src={message?.postImage}
              alt="Shared post"
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <p className="text-xs text-muted-foreground mb-1">@{message?.postAuthor}</p>
              <p className="text-sm">{message?.postCaption}</p>
            </div>
          </div>
        );
      
      default:
        return <p className="text-sm">{message?.content}</p>;
    }
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={`flex max-w-[70%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {!isCurrentUser && (
          <div className="flex-shrink-0 mr-2">
            {showAvatar ? (
              <Image
                src={message?.senderAvatar}
                alt={message?.senderName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8"></div>
            )}
          </div>
        )}

        {/* Message Content */}
        <div className="relative">
          <div
            className={`px-4 py-2 rounded-2xl relative ${
              isCurrentUser
                ? 'bg-accent text-accent-foreground rounded-br-md'
                : 'bg-muted text-muted-foreground rounded-bl-md'
            }`}
            onDoubleClick={() => setShowReactions(!showReactions)}
          >
            {renderMessageContent()}
            
            {/* Message Status */}
            {isCurrentUser && (
              <div className="flex items-center justify-end mt-1 space-x-1">
                {message?.status === 'sent' && (
                  <Icon name="Check" size={12} className="text-accent-foreground/70" />
                )}
                {message?.status === 'delivered' && (
                  <div className="flex">
                    <Icon name="Check" size={12} className="text-accent-foreground/70 -mr-1" />
                    <Icon name="Check" size={12} className="text-accent-foreground/70" />
                  </div>
                )}
                {message?.status === 'read' && (
                  <div className="flex">
                    <Icon name="Check" size={12} className="text-success -mr-1" />
                    <Icon name="Check" size={12} className="text-success" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Reaction */}
          {selectedReaction && (
            <div className={`absolute -bottom-2 ${isCurrentUser ? 'left-0' : 'right-0'} 
              bg-background border border-border rounded-full w-6 h-6 flex items-center justify-center text-xs`}>
              {selectedReaction}
            </div>
          )}

          {/* Reaction Picker */}
          {showReactions && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowReactions(false)}
              />
              <div className={`absolute z-20 ${isCurrentUser ? 'right-0' : 'left-0'} 
                -top-12 bg-background border border-border rounded-full px-2 py-1 flex space-x-1 shadow-lg`}>
                {reactions?.map((reaction) => (
                  <button
                    key={reaction}
                    onClick={() => handleReaction(reaction)}
                    className="hover:scale-125 transition-transform text-lg"
                  >
                    {reaction}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Message Actions */}
        <div className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-end pb-2 ${
          isCurrentUser ? 'mr-2' : 'ml-2'
        }`}>
          <Button variant="ghost" size="icon" iconName="MoreHorizontal" className="w-6 h-6" />
        </div>
      </div>
      {/* Timestamp */}
      {showTimestamp && (
        <div className={`text-xs text-muted-foreground mt-1 ${
          isCurrentUser ? 'text-right mr-10' : 'text-left ml-10'
        }`}>
          {formatTime(message?.timestamp)}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;