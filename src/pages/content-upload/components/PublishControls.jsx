import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PublishControls = ({ 
  selectedMedia,
  caption,
  privacy,
  scheduleData,
  onPublish,
  onSaveDraft,
  uploadType = 'post',
  className = '' 
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const canPublish = () => {
    if (!selectedMedia || selectedMedia?.length === 0) return false;
    if (uploadType === 'reel' && selectedMedia?.[0]?.type && !selectedMedia?.[0]?.type?.startsWith('video/')) return false;
    return true;
  };

  const getPublishButtonText = () => {
    if (isPublishing) return 'Publishing...';
    if (scheduleData?.enabled) return 'Schedule Post';
    
    switch (uploadType) {
      case 'story':
        return 'Share to Story';
      case 'reel':
        return 'Share Reel';
      default:
        return 'Share Post';
    }
  };

  const handlePublish = async () => {
    if (!canPublish()) return;

    setIsPublishing(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Wait a bit to show 100% progress
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onPublish({
        media: selectedMedia,
        caption,
        privacy,
        schedule: scheduleData,
        type: uploadType
      });
      
    } catch (error) {
      console.error('Publishing failed:', error);
    } finally {
      setIsPublishing(false);
      setUploadProgress(0);
    }
  };

  const handleSaveDraft = async () => {
    if (!selectedMedia || selectedMedia?.length === 0) return;

    setIsSavingDraft(true);
    
    try {
      // Simulate saving draft
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSaveDraft({
        media: selectedMedia,
        caption,
        privacy,
        schedule: scheduleData,
        type: uploadType
      });
      
    } catch (error) {
      console.error('Saving draft failed:', error);
    } finally {
      setIsSavingDraft(false);
    }
  };

  const getEstimatedFileSize = () => {
    if (!selectedMedia || selectedMedia?.length === 0) return '0 MB';
    
    const totalSize = selectedMedia?.reduce((total, media) => {
      return total + (media?.size || 0);
    }, 0);
    
    return `${(totalSize / (1024 * 1024))?.toFixed(1)} MB`;
  };

  const getCompressionInfo = () => {
    if (!selectedMedia || selectedMedia?.length === 0) return null;
    
    const hasLargeFiles = selectedMedia?.some(media => (media?.size || 0) > 10 * 1024 * 1024); // 10MB
    const hasVideos = selectedMedia?.some(media => media?.type?.startsWith('video/'));
    
    if (hasLargeFiles || hasVideos) {
      return 'Files will be compressed for optimal sharing';
    }
    
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`}>
      <div className="space-y-4">
        {/* Upload Progress */}
        {isPublishing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-primary">Uploading...</span>
              <span className="text-text-secondary">{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="text-xs text-text-secondary">
              {uploadProgress < 30 && 'Preparing files...'}
              {uploadProgress >= 30 && uploadProgress < 70 && 'Uploading media...'}
              {uploadProgress >= 70 && uploadProgress < 90 && 'Processing...'}
              {uploadProgress >= 90 && 'Finalizing...'}
            </div>
          </div>
        )}

        {/* File Information */}
        {selectedMedia && selectedMedia?.length > 0 && !isPublishing && (
          <div className="bg-surface rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="FileImage" size={16} className="text-accent" />
                <span className="font-medium text-primary">
                  {selectedMedia?.length} file{selectedMedia?.length > 1 ? 's' : ''} • {getEstimatedFileSize()}
                </span>
              </div>
              <div className="text-text-secondary">
                Ready to upload
              </div>
            </div>
            
            {getCompressionInfo() && (
              <div className="mt-2 text-xs text-text-secondary flex items-center space-x-1">
                <Icon name="Zap" size={12} className="text-accent" />
                <span>{getCompressionInfo()}</span>
              </div>
            )}
          </div>
        )}

        {/* Schedule Information */}
        {scheduleData?.enabled && scheduleData?.date && scheduleData?.time && (
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-accent" />
              <div>
                <div className="text-sm font-medium text-primary">Scheduled Post</div>
                <div className="text-xs text-text-secondary">
                  Will be published on {scheduleData?.date} at {scheduleData?.time}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {/* Save Draft Button - Only for posts, not stories */}
          {uploadType !== 'story' && (
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={!selectedMedia || selectedMedia?.length === 0 || isSavingDraft || isPublishing}
              loading={isSavingDraft}
              iconName="Save"
              iconPosition="left"
              className="flex-1"
            >
              Save Draft
            </Button>
          )}

          {/* Publish Button */}
          <Button
            variant="default"
            onClick={handlePublish}
            disabled={!canPublish() || isPublishing || isSavingDraft}
            loading={isPublishing}
            iconName={scheduleData?.enabled ? "Calendar" : "Send"}
            iconPosition="left"
            className={uploadType === 'story' ? 'w-full' : 'flex-1'}
          >
            {getPublishButtonText()}
          </Button>
        </div>

        {/* Validation Messages */}
        {!canPublish() && selectedMedia && selectedMedia?.length === 0 && (
          <div className="flex items-center space-x-2 text-error text-sm">
            <Icon name="AlertCircle" size={16} />
            <span>Please select at least one photo or video</span>
          </div>
        )}

        {uploadType === 'reel' && selectedMedia && selectedMedia?.length > 0 && 
         selectedMedia?.[0]?.type && !selectedMedia?.[0]?.type?.startsWith('video/') && (
          <div className="flex items-center space-x-2 text-error text-sm">
            <Icon name="AlertCircle" size={16} />
            <span>Reels require video content</span>
          </div>
        )}

        {/* Publishing Tips */}
        {!isPublishing && (
          <div className="bg-surface rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
              <div className="text-xs text-text-secondary">
                <p className="font-medium text-primary mb-1">
                  {uploadType === 'story' ? 'Story Tips:' : 'Publishing Tips:'}
                </p>
                <ul className="space-y-1">
                  {uploadType === 'story' ? (
                    <>
                      <li>• Stories disappear after 24 hours</li>
                      <li>• Add polls, questions, or stickers for engagement</li>
                      <li>• Use close friends for more personal content</li>
                    </>
                  ) : (
                    <>
                      <li>• Post when your audience is most active</li>
                      <li>• Use relevant hashtags to reach more people</li>
                      <li>• Engage with comments to boost visibility</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishControls;