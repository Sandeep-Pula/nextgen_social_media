import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ 
  selectedMedia, 
  onFilterApply, 
  onAdjustmentChange,
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState('filters');
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    warmth: 0,
    vignette: 0
  });

  const filters = [
    { id: 'none', name: 'Original', preview: 'filter-none' },
    { id: 'vintage', name: 'Vintage', preview: 'sepia-[0.3] contrast-110 brightness-110' },
    { id: 'dramatic', name: 'Dramatic', preview: 'contrast-125 saturate-125 brightness-95' },
    { id: 'bright', name: 'Bright', preview: 'brightness-115 contrast-105 saturate-110' },
    { id: 'warm', name: 'Warm', preview: 'hue-rotate-15 saturate-110 brightness-105' },
    { id: 'cool', name: 'Cool', preview: 'hue-rotate-180 saturate-105 brightness-100' },
    { id: 'mono', name: 'Mono', preview: 'grayscale saturate-0 contrast-110' },
    { id: 'fade', name: 'Fade', preview: 'brightness-105 contrast-95 saturate-90' },
    { id: 'sharp', name: 'Sharp', preview: 'contrast-120 saturate-115 brightness-100' }
  ];

  const adjustmentControls = [
    { key: 'brightness', label: 'Brightness', icon: 'Sun', min: -50, max: 50 },
    { key: 'contrast', label: 'Contrast', icon: 'Circle', min: -50, max: 50 },
    { key: 'saturation', label: 'Saturation', icon: 'Palette', min: -50, max: 50 },
    { key: 'warmth', label: 'Warmth', icon: 'Thermometer', min: -50, max: 50 },
    { key: 'vignette', label: 'Vignette', icon: 'Focus', min: 0, max: 100 }
  ];

  const handleFilterSelect = (filterId) => {
    setSelectedFilter(filterId);
    onFilterApply(filterId);
  };

  const handleAdjustmentChange = (key, value) => {
    const newAdjustments = { ...adjustments, [key]: value };
    setAdjustments(newAdjustments);
    onAdjustmentChange(newAdjustments);
  };

  const resetAdjustments = () => {
    const resetValues = {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      warmth: 0,
      vignette: 0
    };
    setAdjustments(resetValues);
    onAdjustmentChange(resetValues);
  };

  if (!selectedMedia || selectedMedia?.length === 0) {
    return null;
  }

  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden ${className}`}>
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('filters')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'filters' ?'text-accent border-b-2 border-accent bg-accent/5' :'text-text-secondary hover:text-primary'
          }`}
        >
          <Icon name="Sparkles" size={16} className="inline mr-2" />
          Filters
        </button>
        <button
          onClick={() => setActiveTab('adjust')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'adjust' ?'text-accent border-b-2 border-accent bg-accent/5' :'text-text-secondary hover:text-primary'
          }`}
        >
          <Icon name="Sliders" size={16} className="inline mr-2" />
          Adjust
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'filters' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary">Choose a Filter</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFilterSelect('none')}
                className="text-xs"
              >
                Reset
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {filters?.map((filter) => (
                <button
                  key={filter?.id}
                  onClick={() => handleFilterSelect(filter?.id)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedFilter === filter?.id
                      ? 'border-accent scale-95' :'border-border hover:border-accent/50'
                  }`}
                >
                  <div className={`w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 ${filter?.preview}`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <span className="text-white text-xs font-medium">{filter?.name}</span>
                  </div>
                  {selectedFilter === filter?.id && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-accent-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'adjust' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary">Fine-tune Your Photo</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAdjustments}
                className="text-xs"
              >
                Reset All
              </Button>
            </div>

            <div className="space-y-4">
              {adjustmentControls?.map((control) => (
                <div key={control?.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name={control?.icon} size={16} className="text-text-secondary" />
                      <span className="text-sm font-medium text-primary">{control?.label}</span>
                    </div>
                    <span className="text-xs text-text-secondary font-mono">
                      {adjustments?.[control?.key] > 0 ? '+' : ''}{adjustments?.[control?.key]}
                    </span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min={control?.min}
                      max={control?.max}
                      value={adjustments?.[control?.key]}
                      onChange={(e) => handleAdjustmentChange(control?.key, parseInt(e?.target?.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, var(--color-muted) 0%, var(--color-accent) ${
                          ((adjustments?.[control?.key] - control?.min) / (control?.max - control?.min)) * 100
                        }%, var(--color-muted) 100%)`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-text-secondary">
                Tip: Use subtle adjustments for the best results. You can always reset individual controls or all adjustments.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;