import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const ContentPreferences = ({ isExpanded, onToggle }) => {
  const [contentSettings, setContentSettings] = useState({
    language: 'en',
    feedAlgorithm: 'balanced',
    contentFiltering: 'moderate',
    autoplay: true,
    highQuality: false,
    dataUsage: 'standard',
    showSensitive: false,
    hideSeenPosts: true,
    chronologicalFeed: false
  });

  const [previewMode, setPreviewMode] = useState(false);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'zh', label: '中文' }
  ];

  const feedAlgorithmOptions = [
    { 
      value: 'balanced', 
      label: 'Balanced', 
      description: 'Mix of popular and recent content from people you follow' 
    },
    { 
      value: 'recent', 
      label: 'Most Recent', 
      description: 'Show newest posts first' 
    },
    { 
      value: 'popular', 
      label: 'Most Popular', 
      description: 'Show trending and highly-engaged content' 
    },
    { 
      value: 'following', 
      label: 'Following Only', 
      description: 'Only show content from accounts you follow' 
    }
  ];

  const contentFilteringOptions = [
    { 
      value: 'strict', 
      label: 'Strict', 
      description: 'Hide most potentially sensitive content' 
    },
    { 
      value: 'moderate', 
      label: 'Moderate', 
      description: 'Hide some sensitive content with warnings' 
    },
    { 
      value: 'minimal', 
      label: 'Minimal', 
      description: 'Show most content with minimal filtering' 
    }
  ];

  const dataUsageOptions = [
    { value: 'low', label: 'Data Saver', description: 'Reduce image and video quality' },
    { value: 'standard', label: 'Standard', description: 'Balanced quality and data usage' },
    { value: 'high', label: 'High Quality', description: 'Best quality, uses more data' }
  ];

  const handleSettingChange = (setting, value) => {
    setContentSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePreviewToggle = () => {
    setPreviewMode(!previewMode);
  };

  const handleResetDefaults = () => {
    setContentSettings({
      language: 'en',
      feedAlgorithm: 'balanced',
      contentFiltering: 'moderate',
      autoplay: true,
      highQuality: false,
      dataUsage: 'standard',
      showSensitive: false,
      hideSeenPosts: true,
      chronologicalFeed: false
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={20} className="text-accent" />
          <span className="font-medium text-primary">Content Preferences</span>
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
            {/* Language Settings */}
            <div>
              <Select
                label="Language"
                description="Choose your preferred language for the interface"
                options={languageOptions}
                value={contentSettings?.language}
                onChange={(value) => handleSettingChange('language', value)}
              />
            </div>

            {/* Feed Algorithm */}
            <div>
              <Select
                label="Feed Algorithm"
                description="Control how your feed is organized"
                options={feedAlgorithmOptions}
                value={contentSettings?.feedAlgorithm}
                onChange={(value) => handleSettingChange('feedAlgorithm', value)}
              />
            </div>

            {/* Content Filtering */}
            <div>
              <Select
                label="Content Filtering"
                description="Set how strictly sensitive content is filtered"
                options={contentFilteringOptions}
                value={contentSettings?.contentFiltering}
                onChange={(value) => handleSettingChange('contentFiltering', value)}
              />
            </div>

            {/* Data Usage */}
            <div>
              <Select
                label="Data Usage"
                description="Control media quality and data consumption"
                options={dataUsageOptions}
                value={contentSettings?.dataUsage}
                onChange={(value) => handleSettingChange('dataUsage', value)}
              />
            </div>

            {/* Content Controls */}
            <div className="space-y-4">
              <h4 className="font-medium text-primary">Content Controls</h4>
              
              <Checkbox
                label="Autoplay videos"
                description="Automatically play videos as you scroll"
                checked={contentSettings?.autoplay}
                onChange={(e) => handleSettingChange('autoplay', e?.target?.checked)}
              />

              <Checkbox
                label="High quality media"
                description="Load images and videos in highest quality (uses more data)"
                checked={contentSettings?.highQuality}
                onChange={(e) => handleSettingChange('highQuality', e?.target?.checked)}
              />

              <Checkbox
                label="Show sensitive content"
                description="Display content that may be sensitive or mature"
                checked={contentSettings?.showSensitive}
                onChange={(e) => handleSettingChange('showSensitive', e?.target?.checked)}
              />

              <Checkbox
                label="Hide seen posts"
                description="Don't show posts you've already interacted with"
                checked={contentSettings?.hideSeenPosts}
                onChange={(e) => handleSettingChange('hideSeenPosts', e?.target?.checked)}
              />

              <Checkbox
                label="Chronological feed"
                description="Show posts in time order instead of algorithmic ranking"
                checked={contentSettings?.chronologicalFeed}
                onChange={(e) => handleSettingChange('chronologicalFeed', e?.target?.checked)}
              />
            </div>

            {/* Preview Section */}
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-primary">Preview Changes</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviewToggle}
                  iconName={previewMode ? "EyeOff" : "Eye"}
                  iconPosition="left"
                >
                  {previewMode ? "Hide Preview" : "Show Preview"}
                </Button>
              </div>
              
              {previewMode && (
                <div className="space-y-3">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-accent rounded-full"></div>
                      <div>
                        <p className="font-medium text-primary">Sample User</p>
                        <p className="text-sm text-secondary">2 hours ago</p>
                      </div>
                    </div>
                    <p className="text-primary mb-3">
                      This is how your feed will look with the current settings. 
                      {contentSettings?.feedAlgorithm === 'recent' && " Posts are shown in chronological order."}
                      {contentSettings?.feedAlgorithm === 'popular' && " Popular content is prioritized."}
                      {contentSettings?.feedAlgorithm === 'balanced' && " Content is balanced between recent and popular."}
                    </p>
                    <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="Image" size={32} className="text-secondary" />
                    </div>
                  </div>
                  <p className="text-sm text-secondary">
                    Language: {languageOptions?.find(lang => lang?.value === contentSettings?.language)?.label} | 
                    Quality: {contentSettings?.highQuality ? "High" : "Standard"} | 
                    Autoplay: {contentSettings?.autoplay ? "On" : "Off"}
                  </p>
                </div>
              )}
            </div>

            {/* Reset Button */}
            <div className="flex justify-end pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={handleResetDefaults}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPreferences;