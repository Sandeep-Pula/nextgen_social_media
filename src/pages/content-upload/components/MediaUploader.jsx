import React, { useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MediaUploader = ({ 
  onMediaSelect, 
  uploadType = 'post',
  maxFiles = 10,
  acceptedTypes = 'image/*,video/*',
  className = '' 
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const getAcceptedTypes = () => {
    switch (uploadType) {
      case 'story':
        return 'image/*,video/*';
      case 'reel':
        return 'video/*';
      default:
        return acceptedTypes;
    }
  };

  const getMaxFiles = () => {
    switch (uploadType) {
      case 'story':
        return 1;
      case 'reel':
        return 1;
      default:
        return maxFiles;
    }
  };

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const maxAllowed = getMaxFiles();
    
    if (fileArray?.length > maxAllowed) {
      alert(`You can only upload ${maxAllowed} file${maxAllowed > 1 ? 's' : ''} for ${uploadType}s`);
      return;
    }

    setIsUploading(true);
    
    const processedFiles = fileArray?.map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      type: file?.type,
      name: file?.name,
      size: file?.size
    }));

    // Simulate upload processing
    setTimeout(() => {
      onMediaSelect(processedFiles);
      setIsUploading(false);
    }, 1000);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileInputChange = (e) => {
    const files = e?.target?.files;
    if (files && files?.length > 0) {
      handleFileSelect(files);
    }
  };

  const getUploadText = () => {
    switch (uploadType) {
      case 'story':
        return {
          title: 'Add to Your Story',
          subtitle: 'Share a photo or video that disappears in 24 hours',
          button: 'Select Media'
        };
      case 'reel':
        return {
          title: 'Create a Reel',
          subtitle: 'Upload a video to create engaging short-form content',
          button: 'Select Video'
        };
      default:
        return {
          title: 'Share Photos and Videos',
          subtitle: 'Drag and drop or click to select up to 10 files',
          button: 'Select Files'
        };
    }
  };

  const uploadText = getUploadText();

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptedTypes()}
        multiple={getMaxFiles() > 1}
        onChange={handleFileInputChange}
        className="hidden"
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-200 hover:bg-surface/50
          ${isDragging 
            ? 'border-accent bg-accent/5 scale-[1.02]' 
            : 'border-border hover:border-accent/50'
          }
          ${isUploading ? 'pointer-events-none' : ''}
        `}
      >
        {isUploading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-1">Processing...</h3>
              <p className="text-text-secondary">Preparing your media for upload</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center transition-colors
              ${isDragging ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}
            `}>
              <Icon 
                name={uploadType === 'reel' ? 'Video' : 'ImagePlus'} 
                size={32} 
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                {uploadText?.title}
              </h3>
              <p className="text-text-secondary mb-4">
                {uploadText?.subtitle}
              </p>
            </div>

            <Button
              variant="default"
              iconName="Upload"
              iconPosition="left"
              className="pointer-events-none"
            >
              {uploadText?.button}
            </Button>

            <div className="text-xs text-text-secondary space-y-1">
              <p>Supported formats: JPG, PNG, MP4, MOV</p>
              <p>Max file size: 100MB per file</p>
              {getMaxFiles() > 1 && (
                <p>Maximum {getMaxFiles()} files allowed</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUploader;