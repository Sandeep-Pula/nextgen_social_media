import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySettings = ({ isExpanded, onToggle }) => {
  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: true,
    loginAlerts: true,
    sessionTimeout: '30',
    passwordLastChanged: '2024-08-15'
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loginActivity] = useState([
    {
      id: 1,
      device: "iPhone 15 Pro",
      location: "San Francisco, CA",
      timestamp: "2024-09-12 14:30",
      current: true
    },
    {
      id: 2,
      device: "MacBook Pro",
      location: "San Francisco, CA",
      timestamp: "2024-09-12 09:15",
      current: false
    },
    {
      id: 3,
      device: "Chrome Browser",
      location: "Oakland, CA",
      timestamp: "2024-09-11 18:45",
      current: false
    }
  ]);

  const [connectedApps] = useState([
    {
      id: 1,
      name: "Photo Editor Pro",
      permissions: ["Read profile", "Upload photos"],
      connectedDate: "2024-08-20",
      lastUsed: "2024-09-10"
    },
    {
      id: 2,
      name: "Analytics Dashboard",
      permissions: ["Read profile", "View statistics"],
      connectedDate: "2024-07-15",
      lastUsed: "2024-09-12"
    }
  ]);

  const handleSecurityChange = (setting, value) => {
    setSecurityData(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePasswordFormChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (e) => {
    e?.preventDefault();
    if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Password change requested');
    setShowPasswordChange(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleTwoFactorToggle = () => {
    if (securityData?.twoFactorEnabled) {
      console.log('Disabling 2FA');
    } else {
      console.log('Setting up 2FA');
    }
    handleSecurityChange('twoFactorEnabled', !securityData?.twoFactorEnabled);
  };

  const handleRevokeApp = (appId) => {
    console.log('Revoking app access:', appId);
  };

  const handleLogoutDevice = (deviceId) => {
    console.log('Logging out device:', deviceId);
  };

  const handleDownloadData = () => {
    console.log('Downloading user data');
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Lock" size={20} className="text-accent" />
          <span className="font-medium text-primary">Security Settings</span>
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
            {/* Password Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-primary">Password</h4>
                  <p className="text-sm text-secondary">
                    Last changed: {new Date(securityData.passwordLastChanged)?.toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  iconName="Key"
                  iconPosition="left"
                >
                  Change Password
                </Button>
              </div>

              {showPasswordChange && (
                <form onSubmit={handlePasswordChange} className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <Input
                    label="Current Password"
                    type="password"
                    value={passwordForm?.currentPassword}
                    onChange={(e) => handlePasswordFormChange('currentPassword', e?.target?.value)}
                    required
                  />
                  <Input
                    label="New Password"
                    type="password"
                    value={passwordForm?.newPassword}
                    onChange={(e) => handlePasswordFormChange('newPassword', e?.target?.value)}
                    description="Must be at least 8 characters with numbers and symbols"
                    required
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={passwordForm?.confirmPassword}
                    onChange={(e) => handlePasswordFormChange('confirmPassword', e?.target?.value)}
                    required
                  />
                  <div className="flex space-x-3">
                    <Button type="submit" size="sm">Update Password</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowPasswordChange(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={securityData?.twoFactorEnabled ? "ShieldCheck" : "Shield"} 
                  size={20} 
                  className={securityData?.twoFactorEnabled ? "text-success" : "text-secondary"} 
                />
                <div>
                  <h4 className="font-medium text-primary">Two-Factor Authentication</h4>
                  <p className="text-sm text-secondary">
                    {securityData?.twoFactorEnabled 
                      ? "Your account is protected with 2FA" :"Add an extra layer of security to your account"
                    }
                  </p>
                </div>
              </div>
              <Button
                variant={securityData?.twoFactorEnabled ? "outline" : "default"}
                size="sm"
                onClick={handleTwoFactorToggle}
              >
                {securityData?.twoFactorEnabled ? "Disable" : "Enable"}
              </Button>
            </div>

            {/* Security Preferences */}
            <div className="space-y-4">
              <h4 className="font-medium text-primary">Security Preferences</h4>
              
              <Checkbox
                label="Login alerts"
                description="Get notified when someone logs into your account"
                checked={securityData?.loginAlerts}
                onChange={(e) => handleSecurityChange('loginAlerts', e?.target?.checked)}
              />

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Session Timeout (minutes)
                </label>
                <select
                  value={securityData?.sessionTimeout}
                  onChange={(e) => handleSecurityChange('sessionTimeout', e?.target?.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="0">Never</option>
                </select>
                <p className="text-sm text-secondary mt-1">
                  Automatically log out after period of inactivity
                </p>
              </div>
            </div>

            {/* Login Activity */}
            <div className="space-y-4">
              <h4 className="font-medium text-primary">Recent Login Activity</h4>
              <div className="space-y-3">
                {loginActivity?.map((activity) => (
                  <div key={activity?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={activity?.device?.includes('iPhone') ? "Smartphone" : 
                              activity?.device?.includes('MacBook') ? "Laptop" : "Monitor"} 
                        size={18} 
                        className="text-secondary" 
                      />
                      <div>
                        <p className="font-medium text-primary">
                          {activity?.device}
                          {activity?.current && (
                            <span className="ml-2 px-2 py-1 text-xs bg-success text-success-foreground rounded-full">
                              Current
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-secondary">
                          {activity?.location} • {new Date(activity.timestamp)?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {!activity?.current && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLogoutDevice(activity?.id)}
                      >
                        Log Out
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Apps */}
            <div className="space-y-4">
              <h4 className="font-medium text-primary">Connected Applications</h4>
              <div className="space-y-3">
                {connectedApps?.map((app) => (
                  <div key={app?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-primary">{app?.name}</p>
                      <p className="text-sm text-secondary">
                        Permissions: {app?.permissions?.join(", ")}
                      </p>
                      <p className="text-sm text-secondary">
                        Connected: {new Date(app.connectedDate)?.toLocaleDateString()} • 
                        Last used: {new Date(app.lastUsed)?.toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokeApp(app?.id)}
                    >
                      Revoke
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Download */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium text-primary">Download Your Data</h4>
                <p className="text-sm text-secondary">
                  Get a copy of all your data including posts, messages, and account information
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleDownloadData}
                iconName="Download"
                iconPosition="left"
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;