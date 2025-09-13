import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PostsGrid = ({ posts, type = 'posts' }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  const getPostTypeIcon = (post) => {
    if (post?.type === 'carousel') return 'Copy';
    if (post?.type === 'video') return 'Play';
    if (post?.type === 'reel') return 'Video';
    return null;
  };

  if (!posts || posts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon 
            name={type === 'posts' ? 'Camera' : type === 'tagged' ? 'User' : 'Bookmark'} 
            size={32} 
            className="text-text-secondary" 
          />
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">
          {type === 'posts' && 'No Posts Yet'}
          {type === 'tagged' && 'No Tagged Posts'}
          {type === 'saved' && 'No Saved Posts'}
        </h3>
        <p className="text-text-secondary text-center max-w-sm">
          {type === 'posts' && 'Share your first photo or video to get started.'}
          {type === 'tagged' && 'Posts where you\'re tagged will appear here.'}
          {type === 'saved' && 'Save posts you want to see again.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 md:gap-2 p-1 md:p-2">
        {posts?.map((post) => (
          <div
            key={post?.id}
            className="aspect-square relative cursor-pointer group overflow-hidden bg-muted"
            onClick={() => openPost(post)}
          >
            <Image
              src={post?.thumbnail || post?.image}
              alt={post?.caption || 'Post'}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            
            {/* Post Type Indicator */}
            {getPostTypeIcon(post) && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                <Icon name={getPostTypeIcon(post)} size={14} color="white" />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Icon name="Heart" size={20} />
                  <span className="font-medium">{post?.likesCount || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="MessageCircle" size={20} />
                  <span className="font-medium">{post?.commentsCount || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
            {/* Image/Video Section */}
            <div className="flex-1 bg-black flex items-center justify-center">
              <Image
                src={selectedPost?.image}
                alt={selectedPost?.caption}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-96 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={selectedPost?.user?.profilePicture}
                      alt={selectedPost?.user?.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-primary">{selectedPost?.user?.username}</span>
                </div>
                <button
                  onClick={closePost}
                  className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Caption */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={selectedPost?.user?.profilePicture}
                      alt={selectedPost?.user?.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-semibold text-primary mr-2">{selectedPost?.user?.username}</span>
                    <span className="text-primary">{selectedPost?.caption}</span>
                    <p className="text-xs text-text-secondary mt-1">{selectedPost?.timeAgo}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <button className="text-text-secondary hover:text-primary transition-colors">
                      <Icon name="Heart" size={24} />
                    </button>
                    <button className="text-text-secondary hover:text-primary transition-colors">
                      <Icon name="MessageCircle" size={24} />
                    </button>
                    <button className="text-text-secondary hover:text-primary transition-colors">
                      <Icon name="Send" size={24} />
                    </button>
                  </div>
                  <button className="text-text-secondary hover:text-primary transition-colors">
                    <Icon name="Bookmark" size={24} />
                  </button>
                </div>
                <p className="text-sm font-semibold text-primary">
                  {selectedPost?.likesCount} likes
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostsGrid;