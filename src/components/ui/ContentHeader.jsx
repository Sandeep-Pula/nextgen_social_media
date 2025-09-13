import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ContentHeader = ({ title, showBack = false, actions = [], className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const getPageTitle = () => {
    if (title) return title;
    
    switch (location?.pathname) {
      case '/':
        return 'NextGen Social';
      case '/content-upload':
        return 'Create Post';
      case '/direct-messaging':
        return 'Messages';
      case '/user-profile':
        return 'Profile';
      case '/account-settings':
        return 'Settings';
      default:
        return 'NextGen Social';
    }
  };

  const getContextualActions = () => {
    switch (location?.pathname) {
      case '/':
        return [
          { icon: 'Search', label: 'Search', onClick: () => console.log('Search') },
          { icon: 'Bell', label: 'Notifications', onClick: () => console.log('Notifications'), badge: 2 }
        ];
      case '/content-upload':
        return [
          { icon: 'Save', label: 'Save Draft', onClick: () => console.log('Save Draft') },
          { icon: 'Eye', label: 'Preview', onClick: () => console.log('Preview') }
        ];
      case '/direct-messaging':
        return [
          { icon: 'Search', label: 'Search Messages', onClick: () => console.log('Search Messages') },
          { icon: 'UserPlus', label: 'New Chat', onClick: () => console.log('New Chat') }
        ];
      case '/user-profile':
        return [
          { icon: 'Share', label: 'Share Profile', onClick: () => console.log('Share Profile') },
          { icon: 'Edit', label: 'Edit Profile', onClick: () => console.log('Edit Profile') }
        ];
      case '/account-settings':
        return [
          { icon: 'Download', label: 'Export Data', onClick: () => console.log('Export Data') },
          { icon: 'HelpCircle', label: 'Help', onClick: () => console.log('Help') }
        ];
      default:
        return [];
    }
  };

  const allActions = [...(actions || []), ...getContextualActions()];
  const visibleActions = allActions?.slice(0, 2);
  const moreActions = allActions?.slice(2);

  const handleBack = () => {
    if (window.history?.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <header className={`content-header ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              iconName="ArrowLeft"
              iconSize={20}
              className="mr-1"
            />
          )}
          <div className="flex items-center space-x-3">
            {!showBack && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <h1 className="text-xl font-semibold text-primary">
                  {getPageTitle()}
                </h1>
              </div>
            )}
            {showBack && (
              <h1 className="text-lg font-semibold text-primary">
                {getPageTitle()}
              </h1>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {visibleActions?.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              onClick={action?.onClick}
              iconName={action?.icon}
              iconSize={20}
              className="relative"
              aria-label={action?.label}
            >
              {action?.badge && action?.badge > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
                  {action?.badge > 9 ? '9+' : action?.badge}
                </span>
              )}
            </Button>
          ))}

          {moreActions?.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                iconName="MoreVertical"
                iconSize={20}
                aria-label="More actions"
              />
              
              {showMoreMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMoreMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50 py-1">
                    {moreActions?.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          action?.onClick();
                          setShowMoreMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center space-x-3 transition-colors"
                      >
                        <Icon name={action?.icon} size={16} />
                        <span>{action?.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ContentHeader;