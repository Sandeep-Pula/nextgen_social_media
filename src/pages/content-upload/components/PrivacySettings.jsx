import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';


const PrivacySettings = ({ 
  privacy, 
  onPrivacyChange,
  uploadType = 'post',
  className = '' 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const privacyOptions = [
    {
      id: 'public',
      name: 'Public',
      description: 'Anyone can see this post',
      icon: 'Globe',
      color: 'text-success'
    },
    {
      id: 'followers',
      name: 'Followers',
      description: 'Only people who follow you',
      icon: 'Users',
      color: 'text-accent'
    },
    {
      id: 'close_friends',
      name: 'Close Friends',
      description: 'Only your close friends',
      icon: 'Heart',
      color: 'text-warning'
    },
    {
      id: 'private',
      name: 'Only Me',
      description: 'Only you can see this',
      icon: 'Lock',
      color: 'text-error'
    }
  ];

  const storyPrivacyOptions = [
    {
      id: 'all_followers',
      name: 'All Followers',
      description: 'Share with all your followers',
      icon: 'Users',
      color: 'text-accent'
    },
    {
      id: 'close_friends',
      name: 'Close Friends',
      description: 'Share with close friends only',
      icon: 'Heart',
      color: 'text-warning'
    },
    {
      id: 'custom',
      name: 'Custom',
      description: 'Choose specific people',
      icon: 'Settings',
      color: 'text-primary'
    }
  ];

  const getPrivacyOptions = () => {
    return uploadType === 'story' ? storyPrivacyOptions : privacyOptions;
  };

  const handlePrivacySelect = (optionId) => {
    onPrivacyChange({
      ...privacy,
      visibility: optionId
    });
  };

  const handleAdvancedSettingChange = (setting, value) => {
    onPrivacyChange({
      ...privacy,
      [setting]: value
    });
  };

  const selectedOption = getPrivacyOptions()?.find(option => option?.id === privacy?.visibility);

  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-accent" />
            <h3 className="font-semibold text-primary">
              {uploadType === 'story' ? 'Story Privacy' : 'Post Privacy'}
            </h3>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="text-xs"
          >
            Advanced
          </Button>
        </div>

        {/* Privacy Options */}
        <div className="space-y-2">
          {getPrivacyOptions()?.map((option) => (
            <button
              key={option?.id}
              onClick={() => handlePrivacySelect(option?.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                privacy?.visibility === option?.id
                  ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50 hover:bg-surface'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                privacy?.visibility === option?.id ? 'bg-accent/10' : 'bg-muted'
              }`}>
                <Icon 
                  name={option?.icon} 
                  size={20} 
                  className={privacy?.visibility === option?.id ? option?.color : 'text-muted-foreground'} 
                />
              </div>
              
              <div className="flex-1 text-left">
                <div className="font-medium text-primary">{option?.name}</div>
                <div className="text-sm text-text-secondary">{option?.description}</div>
              </div>
              
              <div className="flex items-center">
                {privacy?.visibility === option?.id ? (
                  <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-accent-foreground" />
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-border rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Current Selection Summary */}
        {selectedOption && (
          <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
            <Icon name={selectedOption?.icon} size={16} className={selectedOption?.color} />
            <div className="flex-1">
              <span className="text-sm font-medium text-primary">
                This {uploadType} will be visible to: {selectedOption?.name?.toLowerCase()}
              </span>
            </div>
          </div>
        )}

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="font-medium text-primary">Advanced Settings</h4>
            
            <div className="space-y-3">
              {uploadType !== 'story' && (
                <>
                  <Checkbox
                    label="Allow comments"
                    description="Let people comment on this post"
                    checked={privacy?.allowComments}
                    onChange={(e) => handleAdvancedSettingChange('allowComments', e?.target?.checked)}
                  />
                  
                  <Checkbox
                    label="Allow sharing"
                    description="Let people share this post to their stories"
                    checked={privacy?.allowSharing}
                    onChange={(e) => handleAdvancedSettingChange('allowSharing', e?.target?.checked)}
                  />
                  
                  <Checkbox
                    label="Show like count"
                    description="Display the number of likes publicly"
                    checked={privacy?.showLikeCount}
                    onChange={(e) => handleAdvancedSettingChange('showLikeCount', e?.target?.checked)}
                  />
                </>
              )}
              
              <Checkbox
                label="Hide from explore"
                description={`Don't show this ${uploadType} in explore or hashtag pages`}
                checked={privacy?.hideFromExplore}
                onChange={(e) => handleAdvancedSettingChange('hideFromExplore', e?.target?.checked)}
              />
              
              {uploadType === 'story' && (
                <>
                  <Checkbox
                    label="Allow story replies"
                    description="Let people reply to your story"
                    checked={privacy?.allowReplies}
                    onChange={(e) => handleAdvancedSettingChange('allowReplies', e?.target?.checked)}
                  />
                  
                  <Checkbox
                    label="Allow story sharing"
                    description="Let people share your story as a message"
                    checked={privacy?.allowStorySharing}
                    onChange={(e) => handleAdvancedSettingChange('allowStorySharing', e?.target?.checked)}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* Privacy Tips */}
        <div className="bg-surface rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-accent mt-0.5" />
            <div className="text-xs text-text-secondary">
              <p className="font-medium text-primary mb-1">Privacy Tip:</p>
              <p>
                {uploadType === 'story' ?'Stories disappear after 24 hours, but people can still screenshot or screen record them.' :'You can change these privacy settings anytime after posting, except for public posts which may have already been shared.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;