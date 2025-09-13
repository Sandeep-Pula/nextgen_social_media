import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettings = ({ isExpanded, onToggle }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    likes: {
      push: true,
      email: false,
      inApp: true
    },
    comments: {
      push: true,
      email: true,
      inApp: true
    },
    follows: {
      push: true,
      email: false,
      inApp: true
    },
    directMessages: {
      push: true,
      email: false,
      inApp: true
    },
    stories: {
      push: false,
      email: false,
      inApp: true
    },
    mentions: {
      push: true,
      email: true,
      inApp: true
    },
    liveStreams: {
      push: false,
      email: false,
      inApp: true
    },
    marketing: {
      push: false,
      email: false,
      inApp: false
    }
  });

  const notificationTypes = [
    {
      key: 'likes',
      label: 'Likes',
      description: 'When someone likes your posts',
      icon: 'Heart'
    },
    {
      key: 'comments',
      label: 'Comments',
      description: 'When someone comments on your posts',
      icon: 'MessageCircle'
    },
    {
      key: 'follows',
      label: 'New Followers',
      description: 'When someone starts following you',
      icon: 'UserPlus'
    },
    {
      key: 'directMessages',
      label: 'Direct Messages',
      description: 'When you receive a new message',
      icon: 'Mail'
    },
    {
      key: 'stories',
      label: 'Story Views',
      description: 'When someone views your stories',
      icon: 'Eye'
    },
    {
      key: 'mentions',
      label: 'Mentions',
      description: 'When someone mentions you in posts or comments',
      icon: 'AtSign'
    },
    {
      key: 'liveStreams',
      label: 'Live Streams',
      description: 'When people you follow go live',
      icon: 'Video'
    },
    {
      key: 'marketing',
      label: 'Marketing & Updates',
      description: 'Product updates and promotional content',
      icon: 'Megaphone'
    }
  ];

  const handleNotificationChange = (type, method, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: {
        ...prev?.[type],
        [method]: value
      }
    }));
  };

  const handleMasterToggle = (method, enabled) => {
    const updatedSettings = { ...notificationSettings };
    Object.keys(updatedSettings)?.forEach(type => {
      updatedSettings[type][method] = enabled;
    });
    setNotificationSettings(updatedSettings);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={20} className="text-accent" />
          <span className="font-medium text-primary">Notifications</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-secondary" 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="space-y-6 mt-6">
            {/* Master Controls */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-primary mb-4">Quick Controls</h4>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleMasterToggle('push', true)}
                  className="px-3 py-2 text-sm bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Enable All Push
                </button>
                <button
                  onClick={() => handleMasterToggle('push', false)}
                  className="px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Disable All Push
                </button>
                <button
                  onClick={() => handleMasterToggle('email', false)}
                  className="px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Disable All Email
                </button>
              </div>
            </div>

            {/* Notification Types Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-medium text-primary">Notification Type</th>
                    <th className="text-center py-3 font-medium text-primary w-20">Push</th>
                    <th className="text-center py-3 font-medium text-primary w-20">Email</th>
                    <th className="text-center py-3 font-medium text-primary w-20">In-App</th>
                  </tr>
                </thead>
                <tbody>
                  {notificationTypes?.map((type) => (
                    <tr key={type?.key} className="border-b border-border/50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <Icon name={type?.icon} size={18} className="text-accent" />
                          <div>
                            <p className="font-medium text-primary">{type?.label}</p>
                            <p className="text-sm text-secondary">{type?.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4">
                        <Checkbox
                          checked={notificationSettings?.[type?.key]?.push}
                          onChange={(e) => handleNotificationChange(type?.key, 'push', e?.target?.checked)}
                        />
                      </td>
                      <td className="text-center py-4">
                        <Checkbox
                          checked={notificationSettings?.[type?.key]?.email}
                          onChange={(e) => handleNotificationChange(type?.key, 'email', e?.target?.checked)}
                        />
                      </td>
                      <td className="text-center py-4">
                        <Checkbox
                          checked={notificationSettings?.[type?.key]?.inApp}
                          onChange={(e) => handleNotificationChange(type?.key, 'inApp', e?.target?.checked)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notification Schedule */}
            <div className="space-y-4">
              <h4 className="font-medium text-primary">Notification Schedule</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Quiet Hours Start
                  </label>
                  <input
                    type="time"
                    defaultValue="22:00"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Quiet Hours End
                  </label>
                  <input
                    type="time"
                    defaultValue="08:00"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                  />
                </div>
              </div>
              <p className="text-sm text-secondary">
                During quiet hours, you'll only receive notifications for direct messages and mentions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;