import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSettings = ({ isExpanded, onToggle }) => {
  const [profileData, setProfileData] = useState({
    displayName: "Alex Johnson",
    username: "alexj_2024",
    bio: "Digital creator & photographer 📸 | Sharing moments that matter ✨ | Coffee enthusiast ☕",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    website: "https://alexjohnson.com",
    location: "San Francisco, CA"
  });

  const [characterCounts, setCharacterCounts] = useState({
    displayName: profileData?.displayName?.length,
    bio: profileData?.bio?.length
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'displayName' || field === 'bio') {
      setCharacterCounts(prev => ({
        ...prev,
        [field]: value?.length
      }));
    }
  };

  const handleProfilePictureChange = () => {
    console.log('Profile picture change requested');
  };

  const handleSaveChanges = () => {
    console.log('Profile changes saved:', profileData);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="User" size={20} className="text-accent" />
          <span className="font-medium text-primary">Profile Information</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-secondary" 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="space-y-6 mt-6">
            {/* Profile Picture Section */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="Profile Picture"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button
                  onClick={handleProfilePictureChange}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center hover:bg-accent/90 transition-colors"
                >
                  <Icon name="Camera" size={16} />
                </button>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-1">Profile Photo</h3>
                <p className="text-sm text-secondary mb-3">
                  Upload a photo to help others recognize you
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleProfilePictureChange}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Change Photo
                </Button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Display Name"
                type="text"
                value={profileData?.displayName}
                onChange={(e) => handleInputChange('displayName', e?.target?.value)}
                description={`${characterCounts?.displayName}/50 characters`}
                maxLength={50}
                required
              />
              <Input
                label="Username"
                type="text"
                value={profileData?.username}
                onChange={(e) => handleInputChange('username', e?.target?.value)}
                description="This is your unique identifier"
                required
              />
            </div>

            {/* Bio Section */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Bio
              </label>
              <textarea
                value={profileData?.bio}
                onChange={(e) => handleInputChange('bio', e?.target?.value)}
                maxLength={150}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none"
                placeholder="Tell people about yourself..."
              />
              <p className="text-sm text-secondary mt-1">
                {characterCounts?.bio}/150 characters
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-primary">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  value={profileData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={profileData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Website"
                  type="url"
                  value={profileData?.website}
                  onChange={(e) => handleInputChange('website', e?.target?.value)}
                  placeholder="https://yourwebsite.com"
                />
                <Input
                  label="Location"
                  type="text"
                  value={profileData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  placeholder="City, State/Country"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-border">
              <Button
                variant="default"
                onClick={handleSaveChanges}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;