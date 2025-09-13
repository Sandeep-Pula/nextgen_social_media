import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContentHeader from '../../components/ui/ContentHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ConversationList from './components/ConversationList';
import ChatArea from './components/ChatArea';

const DirectMessaging = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "Emma Watson",
      username: "emmawatson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      lastMessage: "That sounds amazing! Can\'t wait to see the photos 📸",
      lastMessageType: "text",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 2,
      isOnline: true,
      isTyping: false,
      lastSeen: "5 minutes ago"
    },
    {
      id: 2,
      name: "James Rodriguez",
      username: "jamesrod",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Check out this video I just posted!",
      lastMessageType: "video",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      lastSeen: "2 hours ago"
    },
    {
      id: 3,
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thanks for sharing that article with me",
      lastMessageType: "text",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 1,
      isOnline: true,
      isTyping: true,
      lastSeen: "Active now"
    },
    {
      id: 4,
      name: "Travel Squad",
      username: "travelsquad",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Who\'s ready for the weekend trip? 🏔️",
      lastMessageType: "text",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 5,
      isOnline: false,
      isTyping: false,
      lastSeen: "1 hour ago"
    },
    {
      id: 5,
      name: "Alex Thompson",
      username: "alexthompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Great workout session today! 💪",
      lastMessageType: "image",
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      lastSeen: "3 hours ago"
    }
  ];

  // Mock messages for active conversation
  const [messages, setMessages] = useState([]);

  const mockMessages = {
    1: [
      {
        id: 1,
        type: 'text',
        content: "Hey! How was your photography workshop today?",
        senderId: 'user1',
        senderName: 'Emma Watson',
        senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
        timestamp: new Date(Date.now() - 1800000),
        status: 'read'
      },
      {
        id: 2,
        type: 'text',
        content: "It was incredible! Learned so many new techniques for portrait photography. The instructor was amazing.",
        senderId: 'currentUser',
        timestamp: new Date(Date.now() - 1500000),
        status: 'read'
      },
      {
        id: 3,
        type: 'image',
        content: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
        caption: "One of the shots I took during the golden hour session",
        senderId: 'currentUser',
        timestamp: new Date(Date.now() - 1200000),
        status: 'read'
      },
      {
        id: 4,
        type: 'text',
        content: "Wow, that's absolutely stunning! The lighting is perfect ✨",
        senderId: 'user1',
        senderName: 'Emma Watson',
        senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
        timestamp: new Date(Date.now() - 900000),
        status: 'read',
        reaction: '❤️'
      },
      {
        id: 5,
        type: 'text',
        content: "Thanks! I'm planning to do a whole series like this. Maybe we could do a photoshoot together sometime?",
        senderId: 'currentUser',
        timestamp: new Date(Date.now() - 600000),
        status: 'read'
      },
      {
        id: 6,
        type: 'text',
        content: "That sounds amazing! Can\'t wait to see the photos 📸",
        senderId: 'user1',
        senderName: 'Emma Watson',
        senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
        timestamp: new Date(Date.now() - 300000),
        status: 'delivered'
      }
    ],
    2: [
      {
        id: 1,
        type: 'text',
        content: "Just finished editing my latest travel video!",
        senderId: 'user2',
        senderName: 'James Rodriguez',
        senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        timestamp: new Date(Date.now() - 2400000),
        status: 'read'
      },
      {
        id: 2,
        type: 'video',
        content: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        caption: "Check out this video I just posted!",
        senderId: 'user2',
        senderName: 'James Rodriguez',
        senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        timestamp: new Date(Date.now() - 1800000),
        status: 'read'
      }
    ]
  };

  useEffect(() => {
    if (activeConversation) {
      setMessages(mockMessages?.[activeConversation?.id] || []);
    }
  }, [activeConversation]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    setShowMobileChat(true);
  };

  const handleSendMessage = (newMessage) => {
    setMessages(prev => [...prev, newMessage]);
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
    setActiveConversation(null);
  };

  return (
    <>
      <Helmet>
        <title>Messages - NextGen Social</title>
        <meta name="description" content="Stay connected with your friends through private messaging on NextGen Social" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Mobile Header */}
        <div className="lg:hidden">
          <ContentHeader 
            title={showMobileChat ? activeConversation?.name : "Messages"}
            showBack={showMobileChat}
            actions={showMobileChat ? [
              { icon: 'Phone', label: 'Voice Call', onClick: () => console.log('Voice call') },
              { icon: 'Video', label: 'Video Call', onClick: () => console.log('Video call') }
            ] : [
              { icon: 'Edit', label: 'New Message', onClick: () => console.log('New message') }
            ]}
          />
        </div>

        {/* Main Content */}
        <div className="flex h-screen lg:h-[calc(100vh-64px)]">
          {/* Conversation List - Desktop always visible, Mobile conditional */}
          <div className={`w-full lg:w-80 flex-shrink-0 ${
            showMobileChat ? 'hidden lg:block' : 'block'
          }`}>
            <ConversationList
              conversations={conversations}
              activeConversation={activeConversation}
              onSelectConversation={handleSelectConversation}
              className="h-full"
            />
          </div>

          {/* Chat Area - Desktop always visible, Mobile conditional */}
          <div className={`flex-1 ${
            showMobileChat ? 'block' : 'hidden lg:block'
          }`}>
            <ChatArea
              conversation={activeConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
              className="h-full"
            />
          </div>
        </div>

        {/* Bottom Navigation - Mobile Only */}
        <div className="lg:hidden">
          <BottomTabNavigation />
        </div>
      </div>
    </>
  );
};

export default DirectMessaging;