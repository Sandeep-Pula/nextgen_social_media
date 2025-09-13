import React, { useState } from 'react';
import ContentHeader from '../../components/ui/ContentHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProfileSettings from './components/ProfileSettings';
import PrivacySettings from './components/PrivacySettings';
import NotificationSettings from './components/NotificationSettings';
import ContentPreferences from './components/ContentPreferences';
import SecuritySettings from './components/SecuritySettings';
import AccountManagement from './components/AccountManagement';
import SettingsSearch from './components/SettingsSearch';
import Icon from '../../components/AppIcon';

const AccountSettings = () => {
  const [expandedSections, setExpandedSections] = useState({
    profile: false,
    privacy: false,
    notifications: false,
    content: false,
    security: false,
    account: false
  });

  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleSearchResults = (results, query) => {
    setSearchResults(results);
    setSearchActive(true);
    
    // Auto-expand sections that have search matches
    const newExpandedSections = { ...expandedSections };
    results?.forEach(result => {
      const sectionKey = getSectionKey(result?.category);
      if (sectionKey) {
        newExpandedSections[sectionKey] = true;
      }
    });
    setExpandedSections(newExpandedSections);
  };

  const handleClearSearch = () => {
    setSearchActive(false);
    setSearchResults([]);
  };

  const getSectionKey = (categoryName) => {
    const mapping = {
      'Profile Information': 'profile',
      'Privacy & Security': 'privacy',
      'Notifications': 'notifications',
      'Content Preferences': 'content',
      'Security Settings': 'security',
      'Account Management': 'account'
    };
    return mapping?.[categoryName];
  };

  const settingsSections = [
    {
      key: 'profile',
      component: ProfileSettings,
      props: {
        isExpanded: expandedSections?.profile,
        onToggle: () => toggleSection('profile')
      }
    },
    {
      key: 'privacy',
      component: PrivacySettings,
      props: {
        isExpanded: expandedSections?.privacy,
        onToggle: () => toggleSection('privacy')
      }
    },
    {
      key: 'notifications',
      component: NotificationSettings,
      props: {
        isExpanded: expandedSections?.notifications,
        onToggle: () => toggleSection('notifications')
      }
    },
    {
      key: 'content',
      component: ContentPreferences,
      props: {
        isExpanded: expandedSections?.content,
        onToggle: () => toggleSection('content')
      }
    },
    {
      key: 'security',
      component: SecuritySettings,
      props: {
        isExpanded: expandedSections?.security,
        onToggle: () => toggleSection('security')
      }
    },
    {
      key: 'account',
      component: AccountManagement,
      props: {
        isExpanded: expandedSections?.account,
        onToggle: () => toggleSection('account')
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ContentHeader 
        title="Account Settings"
        showBack={false}
      />
      <main className="pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Icon name="Settings" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Account Settings</h1>
                <p className="text-secondary">
                  Manage your account preferences and privacy settings
                </p>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <SettingsSearch
              onSearchResults={handleSearchResults}
              onClearSearch={handleClearSearch}
            />
          </div>

          {/* Quick Actions */}
          {!searchActive && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <button
                onClick={() => toggleSection('profile')}
                className="p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors text-center"
              >
                <Icon name="User" size={24} className="text-accent mx-auto mb-2" />
                <p className="text-sm font-medium text-primary">Profile</p>
              </button>
              <button
                onClick={() => toggleSection('privacy')}
                className="p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors text-center"
              >
                <Icon name="Shield" size={24} className="text-accent mx-auto mb-2" />
                <p className="text-sm font-medium text-primary">Privacy</p>
              </button>
              <button
                onClick={() => toggleSection('notifications')}
                className="p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors text-center"
              >
                <Icon name="Bell" size={24} className="text-accent mx-auto mb-2" />
                <p className="text-sm font-medium text-primary">Notifications</p>
              </button>
              <button
                onClick={() => toggleSection('security')}
                className="p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors text-center"
              >
                <Icon name="Lock" size={24} className="text-accent mx-auto mb-2" />
                <p className="text-sm font-medium text-primary">Security</p>
              </button>
            </div>
          )}

          {/* Settings Sections */}
          <div className="space-y-4">
            {settingsSections?.map(({ key, component: SettingsComponent, props }) => (
              <SettingsComponent key={key} {...props} />
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-12 p-6 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-4">
              <Icon name="HelpCircle" size={24} className="text-accent mt-1" />
              <div>
                <h3 className="font-medium text-primary mb-2">Need Help?</h3>
                <p className="text-secondary mb-4">
                  Can't find what you're looking for? Check our help center or contact support.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 text-sm bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors">
                    Help Center
                  </button>
                  <button className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    Contact Support
                  </button>
                  <button className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    Report a Problem
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-secondary">
              NextGen Social v2.1.0 • Last updated: September {new Date()?.getDate()}, {new Date()?.getFullYear()}
            </p>
            <div className="flex justify-center space-x-6 mt-3">
              <button className="text-sm text-accent hover:text-accent/80 transition-colors">
                Privacy Policy
              </button>
              <button className="text-sm text-accent hover:text-accent/80 transition-colors">
                Terms of Service
              </button>
              <button className="text-sm text-accent hover:text-accent/80 transition-colors">
                Community Guidelines
              </button>
            </div>
          </div>
        </div>
      </main>
      <BottomTabNavigation />
    </div>
  );
};

export default AccountSettings;