import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContentHeader from '../../components/ui/ContentHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProfileHeader from './components/ProfileHeader';
import StoryHighlights from './components/StoryHighlights';
import ProfileTabs from './components/ProfileTabs';
import PostsGrid from './components/PostsGrid';

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [isLoading, setIsLoading] = useState(true);

  // Mock current user (in real app, this would come from auth context)
  const currentUser = {
    id: 'current-user-123',
    username: 'johndoe',
    displayName: 'John Doe'
  };

  // Mock user data
  const userData = {
    id: username || currentUser?.id,
    username: username || currentUser?.username,
    displayName: username ? 'Sarah Johnson' : currentUser?.displayName,
    bio: username ? 
      `Digital creator & photographer 📸\nLiving life one adventure at a time 🌍\nCollaborations: sarah@email.com` :
      `Software developer & tech enthusiast 💻\nBuilding the future, one line at a time\nSan Francisco, CA`,
    profilePicture: username ? 
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face' :
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    website: username ? 'https://sarahjohnson.com' : 'https://johndoe.dev',
    isVerified: username ? true : false,
    postsCount: username ? 247 : 89,
    followersCount: username ? 15420 : 1250,
    followingCount: username ? 892 : 456,
    isFollowing: username ? false : null,
    isPrivate: false
  };

  const isOwnProfile = !username || username === currentUser?.username;

  // Mock story highlights
  const storyHighlights = [
    {
      id: 'highlight-1',
      title: 'Travel',
      coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop',
      stories: [
        { id: 'story-1', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop' },
        { id: 'story-2', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop' }
      ]
    },
    {
      id: 'highlight-2',
      title: 'Food',
      coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop',
      stories: [
        { id: 'story-3', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=600&fit=crop' },
        { id: 'story-4', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=600&fit=crop' }
      ]
    },
    {
      id: 'highlight-3',
      title: 'Work',
      coverImage: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=200&h=200&fit=crop',
      stories: [
        { id: 'story-5', image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=600&fit=crop' }
      ]
    }
  ];

  // Mock posts data
  const postsData = [
    {
      id: 'post-1',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      caption: 'Beautiful sunset at the mountains! Nature never fails to amaze me 🌅',
      likesCount: 1247,
      commentsCount: 89,
      timeAgo: '2 hours ago',
      user: userData
    },
    {
      id: 'post-2',
      type: 'carousel',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
      caption: 'Weekend getaway vibes ✈️ Swipe to see more!',
      likesCount: 892,
      commentsCount: 45,
      timeAgo: '1 day ago',
      user: userData
    },
    {
      id: 'post-3',
      type: 'video',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop',
      caption: 'Cooking my favorite pasta recipe! Recipe in bio 👨‍🍳',
      likesCount: 2156,
      commentsCount: 234,
      timeAgo: '3 days ago',
      user: userData
    },
    {
      id: 'post-4',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=400&fit=crop',
      caption: 'Late night coding session 💻 Building something amazing!',
      likesCount: 567,
      commentsCount: 23,
      timeAgo: '5 days ago',
      user: userData
    },
    {
      id: 'post-5',
      type: 'reel',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      caption: 'Quick morning workout routine! Stay fit, stay healthy 💪',
      likesCount: 3421,
      commentsCount: 156,
      timeAgo: '1 week ago',
      user: userData
    },
    {
      id: 'post-6',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop',
      caption: 'Homemade pizza night! Nothing beats fresh ingredients 🍕',
      likesCount: 1834,
      commentsCount: 67,
      timeAgo: '1 week ago',
      user: userData
    }
  ];

  const taggedPosts = [
    {
      id: 'tagged-1',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
      caption: 'Great team dinner! Thanks for tagging me @friend',
      likesCount: 456,
      commentsCount: 12,
      timeAgo: '2 days ago',
      user: {
        id: 'friend-1',
        username: 'friend_user',
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 'tagged-2',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop',
      caption: 'Conference day with amazing speakers!',
      likesCount: 789,
      commentsCount: 34,
      timeAgo: '1 week ago',
      user: {
        id: 'colleague-1',
        username: 'tech_colleague',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      }
    }
  ];

  const savedPosts = isOwnProfile ? [
    {
      id: 'saved-1',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      caption: 'Amazing architecture inspiration',
      likesCount: 2341,
      commentsCount: 89,
      timeAgo: '3 days ago',
      user: {
        id: 'architect-1',
        username: 'design_inspiration',
        profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      id: 'saved-2',
      type: 'carousel',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop',
      caption: 'Coding tips and tricks for developers',
      likesCount: 5678,
      commentsCount: 234,
      timeAgo: '1 week ago',
      user: {
        id: 'dev-1',
        username: 'coding_tips',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
    }
  ] : [];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [username]);

  const handleFollow = (isFollowing) => {
    console.log(`${isFollowing ? 'Followed' : 'Unfollowed'} user:`, userData?.username);
  };

  const handleMessage = () => {
    navigate('/direct-messaging', { state: { userId: userData?.id } });
  };

  const getCurrentTabData = () => {
    switch (activeTab) {
      case 'posts':
        return postsData;
      case 'tagged':
        return taggedPosts;
      case 'saved':
        return savedPosts;
      default:
        return postsData;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ContentHeader 
          title="Profile" 
          showBack={!!username}
        />
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <ContentHeader 
        title={isOwnProfile ? "Profile" : `@${userData?.username}`}
        showBack={!!username}
      />
      <div className="max-w-4xl mx-auto">
        <ProfileHeader
          user={userData}
          isOwnProfile={isOwnProfile}
          onFollow={handleFollow}
          onMessage={handleMessage}
        />

        <StoryHighlights
          highlights={storyHighlights}
          isOwnProfile={isOwnProfile}
        />

        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOwnProfile={isOwnProfile}
        />

        <PostsGrid
          posts={getCurrentTabData()}
          type={activeTab}
        />
      </div>
      <BottomTabNavigation />
    </div>
  );
};

export default UserProfile;