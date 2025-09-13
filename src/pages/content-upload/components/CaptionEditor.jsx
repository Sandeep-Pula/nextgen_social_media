import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CaptionEditor = ({ 
  caption, 
  onCaptionChange, 
  uploadType = 'post',
  className = '' 
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showHashtagSuggestions, setShowHashtagSuggestions] = useState(false);
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef(null);

  const maxLength = uploadType === 'story' ? 100 : 2200;
  const remainingChars = maxLength - caption?.length;

  const popularEmojis = ['😍', '🔥', '💯', '✨', '❤️', '😊', '🎉', '👏', '🙌', '💪', '🌟', '😎', '🥰', '💖', '🎊', '🌈'];
  
  const hashtagSuggestions = [
    '#photography', '#instagood', '#photooftheday', '#beautiful', '#happy',
    '#love', '#nature', '#art', '#style', '#life', '#travel', '#food',
    '#fitness', '#motivation', '#inspiration', '#sunset', '#friends', '#family'
  ];

  const mentionSuggestions = [
    { username: 'sarah_johnson', name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { username: 'mike_chen', name: 'Mike Chen', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { username: 'emma_davis', name: 'Emma Davis', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { username: 'alex_rodriguez', name: 'Alex Rodriguez', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { username: 'lisa_kim', name: 'Lisa Kim', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.suggestion-container')) {
        setShowHashtagSuggestions(false);
        setShowMentionSuggestions(false);
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleTextChange = (e) => {
    const text = e?.target?.value;
    const position = e?.target?.selectionStart;
    
    onCaptionChange(text);
    setCursorPosition(position);

    // Check for hashtag trigger
    const beforeCursor = text?.substring(0, position);
    const hashtagMatch = beforeCursor?.match(/#\w*$/);
    const mentionMatch = beforeCursor?.match(/@\w*$/);

    setShowHashtagSuggestions(!!hashtagMatch);
    setShowMentionSuggestions(!!mentionMatch);
  };

  const insertText = (textToInsert) => {
    const textarea = textareaRef?.current;
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const newText = caption?.substring(0, start) + textToInsert + caption?.substring(end);
    
    onCaptionChange(newText);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + textToInsert?.length, start + textToInsert?.length);
    }, 0);
  };

  const insertEmoji = (emoji) => {
    insertText(emoji);
    setShowEmojiPicker(false);
  };

  const insertHashtag = (hashtag) => {
    const textarea = textareaRef?.current;
    const start = textarea?.selectionStart;
    const beforeCursor = caption?.substring(0, start);
    const afterCursor = caption?.substring(start);
    
    // Replace the partial hashtag with the complete one
    const hashtagMatch = beforeCursor?.match(/#\w*$/);
    if (hashtagMatch) {
      const newBefore = beforeCursor?.substring(0, beforeCursor?.length - hashtagMatch?.[0]?.length);
      const newText = newBefore + hashtag + ' ' + afterCursor;
      onCaptionChange(newText);
    }
    
    setShowHashtagSuggestions(false);
    textarea?.focus();
  };

  const insertMention = (mention) => {
    const textarea = textareaRef?.current;
    const start = textarea?.selectionStart;
    const beforeCursor = caption?.substring(0, start);
    const afterCursor = caption?.substring(start);
    
    // Replace the partial mention with the complete one
    const mentionMatch = beforeCursor?.match(/@\w*$/);
    if (mentionMatch) {
      const newBefore = beforeCursor?.substring(0, beforeCursor?.length - mentionMatch?.[0]?.length);
      const newText = newBefore + `@${mention?.username} ` + afterCursor;
      onCaptionChange(newText);
    }
    
    setShowMentionSuggestions(false);
    textarea?.focus();
  };

  const addHashtag = () => {
    const hashtagToAdd = caption?.endsWith(' ') || caption === '' ? '#' : ' #';
    insertText(hashtagToAdd);
    textareaRef?.current?.focus();
  };

  const addMention = () => {
    const mentionToAdd = caption?.endsWith(' ') || caption === '' ? '@' : ' @';
    insertText(mentionToAdd);
    textareaRef?.current?.focus();
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`}>
      <div className="space-y-4">
        {/* Caption Input */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-primary">
              {uploadType === 'story' ? 'Add a caption' : 'Write a caption...'}
            </label>
            <span className={`text-xs font-medium ${
              remainingChars < 50 ? 'text-warning' : 
              remainingChars < 0 ? 'text-error' : 'text-text-secondary'
            }`}>
              {remainingChars} characters left
            </span>
          </div>
          
          <div className="relative suggestion-container">
            <textarea
              ref={textareaRef}
              value={caption}
              onChange={handleTextChange}
              placeholder={
                uploadType === 'story' ?'Share what\'s on your mind...' :'What\'s happening? Share your thoughts, add hashtags, and tag friends...'
              }
              className={`w-full px-3 py-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${
                uploadType === 'story' ? 'h-20' : 'h-32'
              } ${remainingChars < 0 ? 'border-error' : ''}`}
              maxLength={maxLength}
            />

            {/* Hashtag Suggestions */}
            {showHashtagSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                {hashtagSuggestions?.map((hashtag, index) => (
                  <button
                    key={index}
                    onClick={() => insertHashtag(hashtag)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center space-x-2"
                  >
                    <Icon name="Hash" size={14} className="text-accent" />
                    <span>{hashtag?.substring(1)}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Mention Suggestions */}
            {showMentionSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                {mentionSuggestions?.map((user, index) => (
                  <button
                    key={index}
                    onClick={() => insertMention(user)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center space-x-3"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-primary">{user?.name}</div>
                      <div className="text-text-secondary">@{user?.username}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative suggestion-container">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                iconName="Smile"
                iconPosition="left"
              >
                Emoji
              </Button>
              
              {showEmojiPicker && (
                <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 p-3">
                  <div className="grid grid-cols-8 gap-1 w-64">
                    {popularEmojis?.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => insertEmoji(emoji)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-colors text-lg"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={addHashtag}
              iconName="Hash"
              iconPosition="left"
            >
              Hashtag
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={addMention}
              iconName="AtSign"
              iconPosition="left"
            >
              Mention
            </Button>
          </div>

          <div className="text-xs text-text-secondary">
            {caption?.split(' ')?.filter(word => word?.startsWith('#'))?.length} hashtags • {caption?.split(' ')?.filter(word => word?.startsWith('@'))?.length} mentions
          </div>
        </div>

        {/* Caption Tips */}
        {uploadType !== 'story' && (
          <div className="bg-surface rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
              <div className="text-xs text-text-secondary">
                <p className="font-medium text-primary mb-1">Caption Tips:</p>
                <ul className="space-y-1">
                  <li>• Use relevant hashtags to reach more people</li>
                  <li>• Tag friends to get them involved</li>
                  <li>• Ask questions to encourage engagement</li>
                  <li>• Share the story behind your photo</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptionEditor;