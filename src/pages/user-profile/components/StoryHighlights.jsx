import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StoryHighlights = ({ highlights, isOwnProfile = false }) => {
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const openHighlight = (highlight) => {
    setSelectedHighlight(highlight);
    setCurrentStoryIndex(0);
  };

  const closeHighlight = () => {
    setSelectedHighlight(null);
    setCurrentStoryIndex(0);
  };

  const nextStory = () => {
    if (selectedHighlight && currentStoryIndex < selectedHighlight?.stories?.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      closeHighlight();
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    }
  };

  if (!highlights || highlights?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-card border-b border-border p-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {isOwnProfile && (
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                <Icon name="Plus" size={24} className="text-text-secondary" />
              </div>
              <p className="text-xs text-text-secondary mt-2 max-w-[64px] truncate">New</p>
            </div>
          )}
          
          {highlights?.map((highlight) => (
            <div
              key={highlight?.id}
              className="flex-shrink-0 text-center cursor-pointer"
              onClick={() => openHighlight(highlight)}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border hover:border-accent transition-colors">
                <Image
                  src={highlight?.coverImage}
                  alt={highlight?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-primary mt-2 max-w-[64px] truncate font-medium">
                {highlight?.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Story Viewer Modal */}
      {selectedHighlight && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* Progress Bars */}
          <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
            {selectedHighlight?.stories?.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full bg-white transition-all duration-300 ${
                    index < currentStoryIndex ? 'w-full' :
                    index === currentStoryIndex ? 'w-full animate-pulse' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={closeHighlight}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <Icon name="X" size={20} />
          </button>

          {/* Story Content */}
          <div className="relative w-full max-w-md h-full max-h-[80vh] bg-black rounded-lg overflow-hidden">
            <Image
              src={selectedHighlight?.stories?.[currentStoryIndex]?.image}
              alt={`Story ${currentStoryIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Navigation Areas */}
            <div className="absolute inset-0 flex">
              <div
                className="flex-1 cursor-pointer"
                onClick={prevStory}
              />
              <div
                className="flex-1 cursor-pointer"
                onClick={nextStory}
              />
            </div>

            {/* Story Info */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-semibold">{selectedHighlight?.title}</h3>
              <p className="text-sm opacity-80">
                {currentStoryIndex + 1} of {selectedHighlight?.stories?.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoryHighlights;