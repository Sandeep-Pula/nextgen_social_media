import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PrivacySettings = ({ isExpanded, onToggle }) => {
  const [privacySettings, setPrivacySettings] = useState({
    accountVisibility: 'public',
    storyViewing: 'everyone',
    messagePermissions: 'followers',
    commentFiltering: true,
    tagApproval: false,
    activityStatus: true,
    readReceipts: true,
    locationSharing: false
  });

  const [blockedUsers] = useState([
    { id: 1, username: "spammer123", blockedDate: "2024-09-10" },
    { id: 2, username: "fake_account", blockedDate: "2024-09-08" }
  ]);

  const accountVisibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can see your profile and posts' },
    { value: 'private', label: 'Private', description: 'Only approved followers can see your content' },
    { value: 'friends', label: 'Friends Only', description: 'Only your friends can see your profile' }
  ];

  const storyViewingOptions = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'followers', label: 'Followers Only' },
    { value: 'close_friends', label: 'Close Friends' },
    { value: 'custom', label: 'Custom List' }
  ];

  const messagePermissionOptions = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'followers', label: 'Followers Only' },
    { value: 'none', label: 'No One' }
  ];

  const handleSettingChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleUnblockUser = (userId) => {
    console.log('Unblocking user:', userId);
  };

  const handleManageBlockedUsers = () => {
    console.log('Managing blocked users');
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={20} className="text-accent" />
          <span className="font-medium text-primary">Privacy & Security</span>
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
            {/* Account Visibility */}
            <div>
              <Select
                label="Account Visibility"
                description="Control who can see your profile and posts"
                options={accountVisibilityOptions}
                value={privacySettings?.accountVisibility}
                onChange={(value) => handleSettingChange('accountVisibility', value)}
              />
            </div>

            {/* Story Settings */}
            <div>
              <Select
                label="Story Viewing"
                description="Choose who can view your stories"
                options={storyViewingOptions}
                value={privacySettings?.storyViewing}
                onChange={(value) => handleSettingChange('storyViewing', value)}
              />
            </div>

            {/* Message Permissions */}
            <div>
              <Select
                label="Direct Message Permissions"
                description="Control who can send you direct messages"
                options={messagePermissionOptions}
                value={privacySettings?.messagePermissions}
                onChange={(value) => handleSettingChange('messagePermissions', value)}
              />
            </div>

            {/* Privacy Toggles */}
            <div className="space-y-4">
              <h4 className="font-medium text-primary">Privacy Controls</h4>
              
              <Checkbox
                label="Filter offensive comments"
                description="Automatically hide comments that may be offensive"
                checked={privacySettings?.commentFiltering}
                onChange={(e) => handleSettingChange('commentFiltering', e?.target?.checked)}
              />

              <Checkbox
                label="Require approval for tags"
                description="Review posts you're tagged in before they appear on your profile"
                checked={privacySettings?.tagApproval}
                onChange={(e) => handleSettingChange('tagApproval', e?.target?.checked)}
              />

              <Checkbox
                label="Show activity status"
                description="Let others see when you're active on the platform"
                checked={privacySettings?.activityStatus}
                onChange={(e) => handleSettingChange('activityStatus', e?.target?.checked)}
              />

              <Checkbox
                label="Send read receipts"
                description="Let others know when you've read their messages"
                checked={privacySettings?.readReceipts}
                onChange={(e) => handleSettingChange('readReceipts', e?.target?.checked)}
              />

              <Checkbox
                label="Share location data"
                description="Allow location tagging in your posts"
                checked={privacySettings?.locationSharing}
                onChange={(e) => handleSettingChange('locationSharing', e?.target?.checked)}
              />
            </div>

            {/* Blocked Users */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-primary">Blocked Users</h4>
                <button
                  onClick={handleManageBlockedUsers}
                  className="text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  Manage All
                </button>
              </div>
              
              {blockedUsers?.length > 0 ? (
                <div className="space-y-3">
                  {blockedUsers?.map((user) => (
                    <div key={user?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-primary">@{user?.username}</p>
                        <p className="text-sm text-secondary">
                          Blocked on {new Date(user.blockedDate)?.toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleUnblockUser(user?.id)}
                        className="text-sm text-accent hover:text-accent/80 transition-colors"
                      >
                        Unblock
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-secondary">No blocked users</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySettings;