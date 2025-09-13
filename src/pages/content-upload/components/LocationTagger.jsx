import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationTagger = ({ 
  selectedLocation, 
  onLocationSelect, 
  onLocationRemove,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);

  const recentLocations = [
    {
      id: 1,
      name: 'Central Park',
      address: 'New York, NY, USA',
      type: 'park',
      coordinates: { lat: 40.785091, lng: -73.968285 }
    },
    {
      id: 2,
      name: 'Times Square',
      address: 'Manhattan, NY, USA',
      type: 'landmark',
      coordinates: { lat: 40.758896, lng: -73.985130 }
    },
    {
      id: 3,
      name: 'Brooklyn Bridge',
      address: 'Brooklyn, NY, USA',
      type: 'bridge',
      coordinates: { lat: 40.706086, lng: -73.996864 }
    }
  ];

  const popularLocations = [
    {
      id: 4,
      name: 'Statue of Liberty',
      address: 'Liberty Island, NY, USA',
      type: 'monument',
      coordinates: { lat: 40.689247, lng: -74.044502 }
    },
    {
      id: 5,
      name: 'Empire State Building',
      address: 'Manhattan, NY, USA',
      type: 'building',
      coordinates: { lat: 40.748817, lng: -73.985428 }
    },
    {
      id: 6,
      name: 'High Line',
      address: 'Manhattan, NY, USA',
      type: 'park',
      coordinates: { lat: 40.747991, lng: -74.004764 }
    },
    {
      id: 7,
      name: 'One World Trade Center',
      address: 'Manhattan, NY, USA',
      type: 'building',
      coordinates: { lat: 40.713054, lng: -74.013228 }
    }
  ];

  const searchResults = searchQuery?.length > 0 
    ? [...recentLocations, ...popularLocations]?.filter(location =>
        location?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        location?.address?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen && searchInputRef?.current) {
      searchInputRef?.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.location-picker')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLocationSelect = (location) => {
    onLocationSelect(location);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    
    if (query?.length > 2) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
      }, 500);
    }
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'park': return 'Trees';
      case 'landmark': return 'Camera';
      case 'bridge': return 'Bridge';
      case 'monument': return 'Landmark';
      case 'building': return 'Building';
      default: return 'MapPin';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={20} className="text-accent" />
            <h3 className="font-semibold text-primary">Add Location</h3>
          </div>
          
          {selectedLocation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLocationRemove}
              iconName="X"
              className="text-error hover:text-error"
            >
              Remove
            </Button>
          )}
        </div>

        {selectedLocation ? (
          <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon 
                name={getLocationIcon(selectedLocation?.type)} 
                size={20} 
                className="text-accent" 
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-primary">{selectedLocation?.name}</h4>
              <p className="text-sm text-text-secondary">{selectedLocation?.address}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              iconName="Edit2"
              className="w-8 h-8"
            />
          </div>
        ) : (
          <div className="relative location-picker">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setIsOpen(true)}
              iconName="Search"
              iconPosition="left"
              className="justify-start"
            >
              Search for a location...
            </Button>

            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
                {/* Search Input */}
                <div className="p-3 border-b border-border">
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={16} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" 
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search locations..."
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {searchQuery?.length > 0 ? (
                    searchResults?.length > 0 ? (
                      <div className="p-2">
                        <div className="text-xs font-medium text-text-secondary px-2 py-1 mb-2">
                          Search Results
                        </div>
                        {searchResults?.map((location) => (
                          <button
                            key={location?.id}
                            onClick={() => handleLocationSelect(location)}
                            className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors text-left"
                          >
                            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                              <Icon 
                                name={getLocationIcon(location?.type)} 
                                size={16} 
                                className="text-accent" 
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-primary text-sm">{location?.name}</div>
                              <div className="text-xs text-text-secondary">{location?.address}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <Icon name="MapPin" size={24} className="text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-text-secondary">No locations found</p>
                        <p className="text-xs text-text-secondary mt-1">Try a different search term</p>
                      </div>
                    )
                  ) : (
                    <>
                      {/* Recent Locations */}
                      <div className="p-2">
                        <div className="text-xs font-medium text-text-secondary px-2 py-1 mb-2">
                          Recent Locations
                        </div>
                        {recentLocations?.map((location) => (
                          <button
                            key={location?.id}
                            onClick={() => handleLocationSelect(location)}
                            className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors text-left"
                          >
                            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                              <Icon 
                                name={getLocationIcon(location?.type)} 
                                size={16} 
                                className="text-accent" 
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-primary text-sm">{location?.name}</div>
                              <div className="text-xs text-text-secondary">{location?.address}</div>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Popular Locations */}
                      <div className="p-2 border-t border-border">
                        <div className="text-xs font-medium text-text-secondary px-2 py-1 mb-2">
                          Popular Locations
                        </div>
                        {popularLocations?.map((location) => (
                          <button
                            key={location?.id}
                            onClick={() => handleLocationSelect(location)}
                            className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors text-left"
                          >
                            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                              <Icon 
                                name={getLocationIcon(location?.type)} 
                                size={16} 
                                className="text-accent" 
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-primary text-sm">{location?.name}</div>
                              <div className="text-xs text-text-secondary">{location?.address}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-text-secondary">
          <p>Adding a location helps people discover your content and connects you with your community.</p>
        </div>
      </div>
    </div>
  );
};

export default LocationTagger;