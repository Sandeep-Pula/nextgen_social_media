import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserTagger = ({ 
  taggedUsers, 
  onUserTag, 
  onUserUntag,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);

  const recentUsers = [
    {
      id: 1,
      username: 'sarah_johnson',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      isFollowing: true,
      mutualFriends: 12
    },
    {
      id: 2,
      username: 'mike_chen',
      name: 'Mike Chen',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      isFollowing: true,
      mutualFriends: 8
    },
    {
      id: 3,
      username: 'emma_davis',
      name: 'Emma Davis',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      isFollowing: false,
      mutualFriends: 5
    }
  ];

  const suggestedUsers = [
    {
      id: 4,
      username: 'alex_rodriguez',
      name: 'Alex Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      isFollowing: true,
      mutualFriends: 15
    },
    {
      id: 5,
      username: 'lisa_kim',
      name: 'Lisa Kim',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      isFollowing: false,
      mutualFriends: 3
    },
    {
      id: 6,
      username: 'david_wilson',
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      isFollowing: true,
      mutualFriends: 7
    },
    {
      id: 7,
      username: 'jessica_brown',
      name: 'Jessica Brown',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      isFollowing: false,
      mutualFriends: 2
    }
  ];

  const searchResults = searchQuery?.length > 0 
    ? [...recentUsers, ...suggestedUsers]?.filter(user =>
        user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        user?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen && searchInputRef?.current) {
      searchInputRef?.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.user-tagger')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleUserToggle = (user) => {
    const isTagged = taggedUsers?.some(taggedUser => taggedUser?.id === user?.id);
    if (isTagged) {
      onUserUntag(user?.id);
    } else {
      onUserTag(user);
    }
  };

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    
    if (query?.length > 1) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
      }, 300);
    }
  };

  const isUserTagged = (userId) => {
    return taggedUsers?.some(user => user?.id === userId);
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} className="text-accent" />
            <h3 className="font-semibold text-primary">Tag People</h3>
          </div>
          
          {taggedUsers?.length > 0 && (
            <span className="text-sm text-text-secondary">
              {taggedUsers?.length} tagged
            </span>
          )}
        </div>

        {/* Tagged Users Display */}
        {taggedUsers?.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-primary">Tagged:</div>
            <div className="flex flex-wrap gap-2">
              {taggedUsers?.map((user) => (
                <div
                  key={user?.id}
                  className="flex items-center space-x-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="font-medium">@{user?.username}</span>
                  <button
                    onClick={() => onUserUntag(user?.id)}
                    className="hover:text-error transition-colors"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search/Add Users */}
        <div className="relative user-tagger">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setIsOpen(true)}
            iconName="UserPlus"
            iconPosition="left"
            className="justify-start"
          >
            Search people to tag...
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
                    placeholder="Search by name or username..."
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
                      {searchResults?.map((user) => (
                        <button
                          key={user?.id}
                          onClick={() => handleUserToggle(user)}
                          className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors text-left"
                        >
                          <img
                            src={user?.avatar}
                            alt={user?.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-primary text-sm">{user?.name}</span>
                              {user?.isFollowing && (
                                <span className="text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded">
                                  Following
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-text-secondary">
                              @{user?.username} • {user?.mutualFriends} mutual friends
                            </div>
                          </div>
                          <div className="flex items-center">
                            {isUserTagged(user?.id) ? (
                              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                                <Icon name="Check" size={14} className="text-accent-foreground" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 border-2 border-border rounded-full"></div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <Icon name="Users" size={24} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-text-secondary">No users found</p>
                      <p className="text-xs text-text-secondary mt-1">Try a different search term</p>
                    </div>
                  )
                ) : (
                  <>
                    {/* Recent Users */}
                    <div className="p-2">
                      <div className="text-xs font-medium text-text-secondary px-2 py-1 mb-2">
                        Recent
                      </div>
                      {recentUsers?.map((user) => (
                        <button
                          key={user?.id}
                          onClick={() => handleUserToggle(user)}
                          className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors text-left"
                        >
                          <img
                            src={user?.avatar}
                            alt={user?.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-primary text-sm">{user?.name}</span>
                              {user?.isFollowing && (
                                <span className="text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded">
                                  Following
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-text-secondary">
                              @{user?.username}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {isUserTagged(user?.id) ? (
                              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                                <Icon name="Check" size={14} className="text-accent-foreground" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 border-2 border-border rounded-full"></div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Suggested Users */}
                    <div className="p-2 border-t border-border">
                      <div className="text-xs font-medium text-text-secondary px-2 py-1 mb-2">
                        Suggestions
                      </div>
                      {suggestedUsers?.map((user) => (
                        <button
                          key={user?.id}
                          onClick={() => handleUserToggle(user)}
                          className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors text-left"
                        >
                          <img
                            src={user?.avatar}
                            alt={user?.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-primary text-sm">{user?.name}</span>
                              {user?.isFollowing && (
                                <span className="text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded">
                                  Following
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-text-secondary">
                              @{user?.username} • {user?.mutualFriends} mutual
                            </div>
                          </div>
                          <div className="flex items-center">
                            {isUserTagged(user?.id) ? (
                              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                                <Icon name="Check" size={14} className="text-accent-foreground" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 border-2 border-border rounded-full"></div>
                            )}
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

        <div className="text-xs text-text-secondary">
          <p>Tagged people will be notified and can see this post. They can also remove the tag if they want.</p>
        </div>
      </div>
    </div>
  );
};

export default UserTagger;