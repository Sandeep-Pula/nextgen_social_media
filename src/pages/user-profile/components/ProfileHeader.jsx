import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, isOwnProfile = false, onFollow, onMessage }) => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing);
  const [followersCount, setFollowersCount] = useState(user?.followersCount);

  const handleFollowToggle = () => {
    const newFollowingState = !isFollowing;
    setIsFollowing(newFollowingState);
    setFollowersCount(prev => newFollowingState ? prev + 1 : prev - 1);
    onFollow?.(newFollowingState);
  };

  const handleEditProfile = () => {
    navigate('/account-settings');
  };

  const handleMessage = () => {
    navigate('/direct-messaging', { state: { userId: user?.id } });
  };

  const formatCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Profile Picture */}
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-border">
              <Image
                src={user?.profilePicture}
                alt={`${user?.displayName}'s profile picture`}
                className="w-full h-full object-cover"
              />
            </div>
            {user?.isVerified && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center border-2 border-background">
                <Icon name="Check" size={16} color="white" />
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-primary flex items-center justify-center md:justify-start gap-2">
                {user?.username}
                {user?.isVerified && (
                  <Icon name="BadgeCheck" size={20} className="text-accent" />
                )}
              </h1>
              <p className="text-lg text-text-secondary">{user?.displayName}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-center md:justify-start">
              {isOwnProfile ? (
                <Button
                  variant="outline"
                  onClick={handleEditProfile}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    onClick={handleFollowToggle}
                    iconName={isFollowing ? "UserMinus" : "UserPlus"}
                    iconPosition="left"
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleMessage}
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Message
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-8 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">{formatCount(user?.postsCount)}</div>
              <div className="text-sm text-text-secondary">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">{formatCount(followersCount)}</div>
              <div className="text-sm text-text-secondary">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">{formatCount(user?.followingCount)}</div>
              <div className="text-sm text-text-secondary">Following</div>
            </div>
          </div>

          {/* Bio */}
          {user?.bio && (
            <div className="max-w-md mx-auto md:mx-0">
              <p className="text-primary whitespace-pre-wrap leading-relaxed">
                {user?.bio}
              </p>
              {user?.website && (
                <a
                  href={user?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1 mt-2"
                >
                  <Icon name="Link" size={16} />
                  {user?.website?.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;