import React, { useState, useRef } from 'react';

import Button from '../../../components/ui/Button';

const MessageComposer = ({ onSendMessage, className = '' }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const emojis = [
    '😀', '😂', '🥰', '😍', '🤔', '😎', '🥳', '😴', '🤗', '🙄',
    '❤️', '💕', '👍', '👎', '🔥', '💯', '✨', '🎉', '👏', '🙏'
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim()) {
      onSendMessage({
        id: Date.now(),
        type: 'text',
        content: message?.trim(),
        senderId: 'currentUser',
        timestamp: new Date(),
        status: 'sent'
      });
      setMessage('');
      textareaRef?.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef?.current?.focus();
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const fileType = file?.type?.startsWith('image/') ? 'image' : 
                      file?.type?.startsWith('video/') ? 'video' : 'file';
      
      const reader = new FileReader();
      reader.onload = (event) => {
        onSendMessage({
          id: Date.now(),
          type: fileType,
          content: event?.target?.result,
          senderId: 'currentUser',
          timestamp: new Date(),
          status: 'sent',
          fileName: file?.name,
          fileSize: file?.size
        });
      };
      reader?.readAsDataURL(file);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // Simulate recording timer
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // Auto-stop after 60 seconds
    setTimeout(() => {
      stopRecording();
      clearInterval(timer);
    }, 60000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTime > 0) {
      onSendMessage({
        id: Date.now(),
        type: 'audio',
        content: '/assets/audio/voice-message.mp3', // Mock audio file
        senderId: 'currentUser',
        timestamp: new Date(),
        status: 'sent',
        duration: recordingTime
      });
    }
    setRecordingTime(0);
  };

  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className={`border-t border-border bg-background p-4 ${className}`}>
      {/* Recording Interface */}
      {isRecording && (
        <div className="flex items-center justify-between mb-4 p-3 bg-error/10 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-error rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-error">
              Recording... {formatRecordingTime(recordingTime)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsRecording(false)}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={stopRecording}>
              Send
            </Button>
          </div>
        </div>
      )}
      {/* Main Composer */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Attachment Button */}
        <div className="flex-shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            iconName="Paperclip"
            onClick={() => fileInputRef?.current?.click()}
            disabled={isRecording}
          />
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isRecording}
            className="w-full max-h-32 min-h-[44px] px-4 py-3 pr-12 border border-border rounded-full resize-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors bg-background text-foreground placeholder:text-muted-foreground"
            rows="1"
            style={{
              height: 'auto',
              minHeight: '44px'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e?.target?.scrollHeight, 128) + 'px';
            }}
          />
          
          {/* Emoji Button */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              iconName="Smile"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              disabled={isRecording}
              className="w-8 h-8"
            />
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowEmojiPicker(false)}
              />
              <div className="absolute bottom-full right-0 mb-2 bg-background border border-border rounded-lg shadow-lg p-3 z-20 w-64">
                <div className="grid grid-cols-10 gap-1">
                  {emojis?.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleEmojiSelect(emoji)}
                      className="p-1 hover:bg-muted rounded text-lg transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Send/Voice Button */}
        <div className="flex-shrink-0">
          {message?.trim() ? (
            <Button
              type="submit"
              variant="default"
              size="icon"
              iconName="Send"
              className="rounded-full"
            />
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              iconName="Mic"
              onClick={isRecording ? stopRecording : startRecording}
              className={`rounded-full ${isRecording ? 'bg-error text-error-foreground' : ''}`}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default MessageComposer;