import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileTabs = ({ activeTab, onTabChange, isOwnProfile = false }) => {
  const tabs = [
    {
      id: 'posts',
      label: 'Posts',
      icon: 'Grid3X3',
      count: null
    },
    {
      id: 'tagged',
      label: 'Tagged',
      icon: 'User',
      count: null
    }
  ];

  if (isOwnProfile) {
    tabs?.push({
      id: 'saved',
      label: 'Saved',
      icon: 'Bookmark',
      count: null
    });
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="flex">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-accent' :'text-text-secondary hover:text-primary'
            }`}
          >
            <Icon 
              name={tab?.icon} 
              size={18} 
              strokeWidth={activeTab === tab?.id ? 2.5 : 2}
            />
            <span className="hidden sm:inline">{tab?.label}</span>
            {tab?.count && tab?.count > 0 && (
              <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                {tab?.count > 99 ? '99+' : tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;