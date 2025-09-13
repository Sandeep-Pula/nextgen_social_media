import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MediaPreview = ({ 
  selectedMedia, 
  onRemoveMedia, 
  onReorderMedia, 
  uploadType = 'post',
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  if (!selectedMedia || selectedMedia?.length === 0) {
    return (
      <div className={`bg-surface border-2 border-dashed border-border rounded-xl p-12 text-center ${className}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Icon name="ImagePlus" size={32} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              {uploadType === 'story' ? 'Add to Your Story' : 
               uploadType === 'reel' ? 'Create a Reel' : 'Share a Photo or Video'}
            </h3>
            <p className="text-text-secondary">
              {uploadType === 'story' ? 'Share a moment that disappears in 24 hours' :
               uploadType === 'reel'? 'Create short, engaging video content' : 'Drag photos and videos here to get started'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentMedia = selectedMedia?.[currentIndex];
  const isVideo = currentMedia?.type?.startsWith('video/');
  const isMultiple = selectedMedia?.length > 1;

  const handlePlayPause = () => {
    if (videoRef?.current) {
      if (isPlaying) {
        videoRef?.current?.pause();
      } else {
        videoRef?.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : selectedMedia?.length - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev < selectedMedia?.length - 1 ? prev + 1 : 0);
  };

  const handleRemove = (index) => {
    onRemoveMedia(index);
    if (currentIndex >= selectedMedia?.length - 1) {
      setCurrentIndex(Math.max(0, selectedMedia?.length - 2));
    }
  };

  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden ${className}`}>
      {/* Media Display */}
      <div className="relative aspect-square bg-surface">
        {isVideo ? (
          <video
            ref={videoRef}
            src={currentMedia?.url}
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        ) : (
          <Image
            src={currentMedia?.url}
            alt={`Upload preview ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        )}

        {/* Video Controls */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="w-16 h-16 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            >
              <Icon 
                name={isPlaying ? "Pause" : "Play"} 
                size={24} 
                className="text-primary" 
              />
            </Button>
          </div>
        )}

        {/* Navigation for Multiple Media */}
        {isMultiple && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleRemove(currentIndex)}
          className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm hover:bg-error/90 hover:text-error-foreground"
        >
          <Icon name="X" size={16} />
        </Button>

        {/* Media Counter */}
        {isMultiple && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
            {currentIndex + 1} / {selectedMedia?.length}
          </div>
        )}

        {/* Upload Type Indicator */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium capitalize">
          {uploadType}
        </div>
      </div>
      {/* Thumbnail Strip for Multiple Media */}
      {isMultiple && (
        <div className="p-3 border-t border-border">
          <div className="flex space-x-2 overflow-x-auto">
            {selectedMedia?.map((media, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentIndex 
                    ? 'border-accent' :'border-border hover:border-accent/50'
                }`}
              >
                {media?.type?.startsWith('video/') ? (
                  <div className="w-full h-full bg-surface flex items-center justify-center">
                    <Icon name="Play" size={16} className="text-muted-foreground" />
                  </div>
                ) : (
                  <Image
                    src={media?.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPreview;