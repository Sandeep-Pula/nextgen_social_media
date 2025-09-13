import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountManagement = ({ isExpanded, onToggle }) => {
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [deactivateReasons, setDeactivateReasons] = useState([]);

  const deactivationReasons = [
    "Taking a break from social media",
    "Privacy concerns",
    "Too much time spent on the platform",
    "Not finding relevant content",
    "Technical issues",
    "Other"
  ];

  const accountStats = {
    joinDate: "2023-03-15",
    totalPosts: 247,
    totalFollowers: 1842,
    totalFollowing: 356,
    storiesShared: 89,
    dataSize: "2.3 GB"
  };

  const handleReasonChange = (reason, checked) => {
    if (checked) {
      setDeactivateReasons(prev => [...prev, reason]);
    } else {
      setDeactivateReasons(prev => prev?.filter(r => r !== reason));
    }
  };

  const handleDeactivateAccount = () => {
    console.log('Account deactivation requested with reasons:', deactivateReasons);
    setShowDeactivateModal(false);
    setDeactivateReasons([]);
  };

  const handleDeleteAccount = () => {
    if (confirmationText !== 'DELETE MY ACCOUNT') {
      alert('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }
    console.log('Account deletion requested');
    setShowDeleteModal(false);
    setConfirmationText('');
  };

  const handleExportData = () => {
    console.log('Data export requested');
  };

  const handleSwitchToBusinessAccount = () => {
    console.log('Switch to business account requested');
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name="UserCog" size={20} className="text-accent" />
          <span className="font-medium text-primary">Account Management</span>
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
            {/* Account Statistics */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-primary mb-4">Account Overview</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{accountStats?.totalPosts}</p>
                  <p className="text-sm text-secondary">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{accountStats?.totalFollowers?.toLocaleString()}</p>
                  <p className="text-sm text-secondary">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{accountStats?.totalFollowing}</p>
                  <p className="text-sm text-secondary">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{accountStats?.storiesShared}</p>
                  <p className="text-sm text-secondary">Stories</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary">Member since:</span>
                  <span className="text-primary">{new Date(accountStats.joinDate)?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-secondary">Data usage:</span>
                  <span className="text-primary">{accountStats?.dataSize}</span>
                </div>
              </div>
            </div>

            {/* Account Type */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium text-primary">Account Type</h4>
                <p className="text-sm text-secondary">
                  Currently using a personal account
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwitchToBusinessAccount}
                iconName="Briefcase"
                iconPosition="left"
              >
                Switch to Business
              </Button>
            </div>

            {/* Data Management */}
            <div className="space-y-4">
              <h4 className="font-medium text-primary">Data Management</h4>
              
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h5 className="font-medium text-primary">Export Your Data</h5>
                  <p className="text-sm text-secondary">
                    Download a copy of your posts, messages, and account information
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportData}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Data
                </Button>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                  <div>
                    <h5 className="font-medium text-primary">Data Retention Policy</h5>
                    <p className="text-sm text-secondary mt-1">
                      Your data will be retained for 30 days after account deactivation. 
                      After permanent deletion, data cannot be recovered.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="space-y-4">
              <h4 className="font-medium text-primary">Account Actions</h4>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowDeactivateModal(true)}
                  iconName="Pause"
                  iconPosition="left"
                  className="justify-start"
                >
                  Temporarily Deactivate Account
                </Button>
                
                <Button
                  variant="destructive"
                  fullWidth
                  onClick={() => setShowDeleteModal(true)}
                  iconName="Trash2"
                  iconPosition="left"
                  className="justify-start"
                >
                  Permanently Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Deactivate Account Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-lg p-6 m-4">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Pause" size={24} className="text-warning" />
              <h3 className="text-lg font-semibold text-primary">Deactivate Account</h3>
            </div>
            
            <p className="text-secondary mb-6">
              Your profile and posts will be hidden until you reactivate your account. 
              You can reactivate anytime by logging back in.
            </p>

            <div className="space-y-3 mb-6">
              <p className="font-medium text-primary">Why are you deactivating? (Optional)</p>
              {deactivationReasons?.map((reason) => (
                <Checkbox
                  key={reason}
                  label={reason}
                  checked={deactivateReasons?.includes(reason)}
                  onChange={(e) => handleReasonChange(reason, e?.target?.checked)}
                />
              ))}
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowDeactivateModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="warning"
                fullWidth
                onClick={handleDeactivateAccount}
              >
                Deactivate
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-lg p-6 m-4">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-error" />
              <h3 className="text-lg font-semibold text-primary">Delete Account</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-secondary">
                This action cannot be undone. This will permanently delete your account and remove all your data.
              </p>
              
              <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                <h4 className="font-medium text-primary mb-2">This will delete:</h4>
                <ul className="text-sm text-secondary space-y-1">
                  <li>• All your posts and stories</li>
                  <li>• Your profile and account information</li>
                  <li>• All messages and conversations</li>
                  <li>• Your followers and following lists</li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Type "DELETE MY ACCOUNT" to confirm:
                </label>
                <input
                  type="text"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e?.target?.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-error focus:border-transparent transition-colors"
                  placeholder="DELETE MY ACCOUNT"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  setShowDeleteModal(false);
                  setConfirmationText('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                fullWidth
                onClick={handleDeleteAccount}
                disabled={confirmationText !== 'DELETE MY ACCOUNT'}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;