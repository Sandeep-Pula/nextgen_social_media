import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = '' }) => {
  const location = useLocation();

  const navigationTabs = [
    {
      label: 'Home',
      path: '/',
      icon: 'Home',
      badge: null
    },
    {
      label: 'Upload',
      path: '/content-upload',
      icon: 'Plus',
      badge: null
    },
    {
      label: 'Messages',
      path: '/direct-messaging',
      icon: 'MessageCircle',
      badge: 3
    },
    {
      label: 'Profile',
      path: '/user-profile',
      icon: 'User',
      badge: null
    },
    {
      label: 'Settings',
      path: '/account-settings',
      icon: 'Settings',
      badge: null
    }
  ];

  const isActiveTab = (path) => {
    if (path === '/') {
      return location?.pathname === '/';
    }
    return location?.pathname?.startsWith(path);
  };

  return (
    <nav className={`bottom-navigation safe-area-bottom ${className}`}>
      <div className="flex items-center justify-around h-full px-2">
        {navigationTabs?.map((tab) => (
          <Link
            key={tab?.path}
            to={tab?.path}
            className={`nav-tab relative ${isActiveTab(tab?.path) ? 'active' : ''}`}
            aria-label={tab?.label}
          >
            <div className="relative">
              <Icon 
                name={tab?.icon} 
                size={24} 
                strokeWidth={isActiveTab(tab?.path) ? 2.5 : 2}
              />
              {tab?.badge && tab?.badge > 0 && (
                <span className="nav-badge">
                  {tab?.badge > 99 ? '99+' : tab?.badge}
                </span>
              )}
            </div>
            <span className="mt-1">{tab?.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;