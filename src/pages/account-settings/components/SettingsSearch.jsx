import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SettingsSearch = ({ onSearchResults, onClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const settingsIndex = [
    { category: 'Profile Information', items: ['Display Name', 'Username', 'Bio', 'Email', 'Phone', 'Website', 'Location', 'Profile Picture'] },
    { category: 'Privacy & Security', items: ['Account Visibility', 'Story Viewing', 'Message Permissions', 'Comment Filtering', 'Tag Approval', 'Activity Status', 'Read Receipts', 'Location Sharing', 'Blocked Users'] },
    { category: 'Notifications', items: ['Likes', 'Comments', 'Follows', 'Direct Messages', 'Stories', 'Mentions', 'Live Streams', 'Marketing', 'Push Notifications', 'Email Alerts', 'Quiet Hours'] },
    { category: 'Content Preferences', items: ['Language', 'Feed Algorithm', 'Content Filtering', 'Autoplay', 'High Quality', 'Data Usage', 'Sensitive Content', 'Chronological Feed'] },
    { category: 'Security Settings', items: ['Password', 'Two-Factor Authentication', 'Login Alerts', 'Session Timeout', 'Login Activity', 'Connected Apps', 'Download Data'] },
    { category: 'Account Management', items: ['Account Type', 'Export Data', 'Deactivate Account', 'Delete Account', 'Business Account', 'Data Retention'] }
  ];

  useEffect(() => {
    if (searchQuery?.trim() === '') {
      setSearchResults([]);
      onClearSearch();
      return;
    }

    const results = [];
    const query = searchQuery?.toLowerCase();

    settingsIndex?.forEach(category => {
      const matchingItems = category?.items?.filter(item => 
        item?.toLowerCase()?.includes(query) || 
        category?.category?.toLowerCase()?.includes(query)
      );

      if (matchingItems?.length > 0) {
        results?.push({
          category: category?.category,
          items: matchingItems,
          categoryMatch: category?.category?.toLowerCase()?.includes(query)
        });
      }
    });

    setSearchResults(results);
    onSearchResults(results, searchQuery);
  }, [searchQuery, onSearchResults, onClearSearch]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    onClearSearch();
  };

  const handleResultClick = (category, item) => {
    console.log('Navigate to:', category, item);
    // This would typically scroll to or highlight the specific setting
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search settings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" 
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary transition-colors"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>
      {searchResults?.length > 0 && (
        <div className="bg-card border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto">
          <div className="p-3 border-b border-border">
            <p className="text-sm text-secondary">
              Found {searchResults?.reduce((total, category) => total + category?.items?.length, 0)} results for "{searchQuery}"
            </p>
          </div>
          
          <div className="py-2">
            {searchResults?.map((result, categoryIndex) => (
              <div key={categoryIndex} className="mb-2 last:mb-0">
                <div className="px-4 py-2 bg-muted/30">
                  <h4 className="font-medium text-primary text-sm">{result?.category}</h4>
                </div>
                <div className="space-y-1">
                  {result?.items?.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => handleResultClick(result?.category, item)}
                      className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-muted/50 transition-colors flex items-center space-x-3"
                    >
                      <Icon name="ArrowRight" size={14} className="text-secondary" />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {searchQuery && searchResults?.length === 0 && (
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <Icon name="Search" size={32} className="text-secondary mx-auto mb-3" />
          <p className="text-primary font-medium mb-1">No results found</p>
          <p className="text-sm text-secondary">
            Try searching for different terms like "privacy", "notifications", or "password"
          </p>
        </div>
      )}
    </div>
  );
};

export default SettingsSearch;