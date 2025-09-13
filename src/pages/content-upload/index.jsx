import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../../components/ui/ContentHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import MediaPreview from './components/MediaPreview';
import MediaUploader from './components/MediaUploader';
import FilterPanel from './components/FilterPanel';
import CaptionEditor from './components/CaptionEditor';
import LocationTagger from './components/LocationTagger';
import UserTagger from './components/UserTagger';
import PrivacySettings from './components/PrivacySettings';
import SchedulePost from './components/SchedulePost';
import PublishControls from './components/PublishControls';

const ContentUpload = () => {
  const navigate = useNavigate();
  
  // Upload type state
  const [uploadType, setUploadType] = useState('post'); // 'post', 'story', 'reel'
  
  // Media state
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [appliedFilter, setAppliedFilter] = useState('none');
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    warmth: 0,
    vignette: 0
  });
  
  // Content state
  const [caption, setCaption] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [taggedUsers, setTaggedUsers] = useState([]);
  
  // Privacy and scheduling state
  const [privacy, setPrivacy] = useState({
    visibility: 'public',
    allowComments: true,
    allowSharing: true,
    showLikeCount: true,
    hideFromExplore: false,
    allowReplies: true,
    allowStorySharing: true
  });
  
  const [scheduleData, setScheduleData] = useState({
    enabled: false,
    date: '',
    time: '',
    timezone: 'America/New_York'
  });

  // UI state
  const [activeStep, setActiveStep] = useState('upload'); // 'upload', 'edit', 'details', 'publish'

  const uploadTypes = [
    { id: 'post', name: 'Post', icon: 'Image', description: 'Share photos and videos' },
    { id: 'story', name: 'Story', icon: 'Circle', description: '24-hour content' },
    { id: 'reel', name: 'Reel', icon: 'Video', description: 'Short-form videos' }
  ];

  const steps = [
    { id: 'upload', name: 'Upload', icon: 'Upload' },
    { id: 'edit', name: 'Edit', icon: 'Edit' },
    { id: 'details', name: 'Details', icon: 'FileText' },
    { id: 'publish', name: 'Publish', icon: 'Send' }
  ];

  const handleMediaSelect = (media) => {
    setSelectedMedia(media);
    if (media?.length > 0) {
      setActiveStep('edit');
    }
  };

  const handleRemoveMedia = (index) => {
    const newMedia = selectedMedia?.filter((_, i) => i !== index);
    setSelectedMedia(newMedia);
    if (newMedia?.length === 0) {
      setActiveStep('upload');
    }
  };

  const handleFilterApply = (filterId) => {
    setAppliedFilter(filterId);
  };

  const handleAdjustmentChange = (newAdjustments) => {
    setAdjustments(newAdjustments);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleLocationRemove = () => {
    setSelectedLocation(null);
  };

  const handleUserTag = (user) => {
    if (!taggedUsers?.find(u => u?.id === user?.id)) {
      setTaggedUsers([...taggedUsers, user]);
    }
  };

  const handleUserUntag = (userId) => {
    setTaggedUsers(taggedUsers?.filter(user => user?.id !== userId));
  };

  const handlePublish = (publishData) => {
    console.log('Publishing:', publishData);
    // Simulate successful publish
    setTimeout(() => {
      navigate('/', { 
        state: { 
          message: `${uploadType?.charAt(0)?.toUpperCase() + uploadType?.slice(1)} published successfully!` 
        }
      });
    }, 500);
  };

  const handleSaveDraft = (draftData) => {
    console.log('Saving draft:', draftData);
    // Simulate successful draft save
    setTimeout(() => {
      navigate('/', { 
        state: { 
          message: 'Draft saved successfully!' 
        }
      });
    }, 500);
  };

  const canProceedToNext = () => {
    switch (activeStep) {
      case 'upload':
        return selectedMedia?.length > 0;
      case 'edit':
        return true;
      case 'details':
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    const currentIndex = steps?.findIndex(step => step?.id === activeStep);
    if (currentIndex < steps?.length - 1) {
      setActiveStep(steps?.[currentIndex + 1]?.id);
    }
  };

  const handlePrevStep = () => {
    const currentIndex = steps?.findIndex(step => step?.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps?.[currentIndex - 1]?.id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ContentHeader 
        title="Create Content" 
        showBack={true}
      />
      <div className="pb-20">
        {/* Upload Type Selection */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex space-x-2">
            {uploadTypes?.map((type) => (
              <button
                key={type?.id}
                onClick={() => {
                  setUploadType(type?.id);
                  // Reset state when changing upload type
                  setSelectedMedia([]);
                  setActiveStep('upload');
                }}
                className={`flex-1 flex flex-col items-center space-y-2 p-3 rounded-lg border-2 transition-all ${
                  uploadType === type?.id
                    ? 'border-accent bg-accent/5 text-accent' :'border-border hover:border-accent/50 text-text-secondary'
                }`}
              >
                <Icon name={type?.icon} size={24} />
                <div className="text-center">
                  <div className="font-medium text-sm">{type?.name}</div>
                  <div className="text-xs opacity-75">{type?.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="p-4 bg-surface border-b border-border">
          <div className="flex items-center justify-between">
            {steps?.map((step, index) => (
              <div key={step?.id} className="flex items-center">
                <button
                  onClick={() => {
                    // Allow going back to previous steps
                    const currentIndex = steps?.findIndex(s => s?.id === activeStep);
                    if (index <= currentIndex) {
                      setActiveStep(step?.id);
                    }
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeStep === step?.id
                      ? 'bg-accent text-accent-foreground'
                      : steps?.findIndex(s => s?.id === activeStep) > index
                      ? 'bg-success/10 text-success cursor-pointer hover:bg-success/20' :'text-text-secondary cursor-not-allowed'
                  }`}
                  disabled={steps?.findIndex(s => s?.id === activeStep) < index}
                >
                  <Icon 
                    name={steps?.findIndex(s => s?.id === activeStep) > index ? 'Check' : step?.icon} 
                    size={16} 
                  />
                  <span className="text-sm font-medium hidden sm:inline">{step?.name}</span>
                </button>
                
                {index < steps?.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    steps?.findIndex(s => s?.id === activeStep) > index ? 'bg-success' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6">
          {/* Upload Step */}
          {activeStep === 'upload' && (
            <div className="space-y-6">
              <MediaPreview
                selectedMedia={selectedMedia}
                onRemoveMedia={handleRemoveMedia}
                onReorderMedia={(newOrder) => setSelectedMedia(newOrder)}
                uploadType={uploadType}
              />
              
              {selectedMedia?.length === 0 && (
                <MediaUploader
                  onMediaSelect={handleMediaSelect}
                  uploadType={uploadType}
                />
              )}
              
              {selectedMedia?.length > 0 && (
                <div className="flex justify-end">
                  <Button
                    variant="default"
                    onClick={handleNextStep}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Continue to Edit
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Edit Step */}
          {activeStep === 'edit' && (
            <div className="space-y-6">
              <MediaPreview
                selectedMedia={selectedMedia}
                onRemoveMedia={handleRemoveMedia}
                onReorderMedia={(newOrder) => setSelectedMedia(newOrder)}
                uploadType={uploadType}
              />
              
              <FilterPanel
                selectedMedia={selectedMedia}
                onFilterApply={handleFilterApply}
                onAdjustmentChange={handleAdjustmentChange}
              />
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back
                </Button>
                <Button
                  variant="default"
                  onClick={handleNextStep}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Add Details
                </Button>
              </div>
            </div>
          )}

          {/* Details Step */}
          {activeStep === 'details' && (
            <div className="space-y-6">
              <CaptionEditor
                caption={caption}
                onCaptionChange={setCaption}
                uploadType={uploadType}
              />
              
              <LocationTagger
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
                onLocationRemove={handleLocationRemove}
              />
              
              <UserTagger
                taggedUsers={taggedUsers}
                onUserTag={handleUserTag}
                onUserUntag={handleUserUntag}
              />
              
              <PrivacySettings
                privacy={privacy}
                onPrivacyChange={setPrivacy}
                uploadType={uploadType}
              />
              
              <SchedulePost
                scheduleData={scheduleData}
                onScheduleChange={setScheduleData}
                uploadType={uploadType}
              />
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back
                </Button>
                <Button
                  variant="default"
                  onClick={handleNextStep}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Review & Publish
                </Button>
              </div>
            </div>
          )}

          {/* Publish Step */}
          {activeStep === 'publish' && (
            <div className="space-y-6">
              {/* Final Preview */}
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold text-primary mb-4">Final Preview</h3>
                <div className="space-y-4">
                  <MediaPreview
                    selectedMedia={selectedMedia}
                    onRemoveMedia={() => {}}
                    onReorderMedia={() => {}}
                    uploadType={uploadType}
                    className="max-w-sm mx-auto"
                  />
                  
                  {caption && (
                    <div className="bg-surface rounded-lg p-3">
                      <div className="text-sm text-primary">{caption}</div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 text-sm text-text-secondary">
                    {selectedLocation && (
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span>{selectedLocation?.name}</span>
                      </div>
                    )}
                    {taggedUsers?.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{taggedUsers?.length} tagged</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} />
                      <span className="capitalize">{privacy?.visibility}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <PublishControls
                selectedMedia={selectedMedia}
                caption={caption}
                privacy={privacy}
                scheduleData={scheduleData}
                onPublish={handlePublish}
                onSaveDraft={handleSaveDraft}
                uploadType={uploadType}
              />
              
              <div className="flex justify-start">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Details
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
};

export default ContentUpload;