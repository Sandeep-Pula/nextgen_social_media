import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
        <Icon name="Zap" size={32} color="white" />
      </div>
      
      {/* Title and Subtitle */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Join NextGen Social
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Connect, share, and discover with the next generation of social media
      </p>
      
      {/* Features List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Icon name="Users" size={16} className="text-blue-500" />
          <span>Connect with friends</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Icon name="Camera" size={16} className="text-purple-500" />
          <span>Share your moments</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Icon name="Compass" size={16} className="text-green-500" />
          <span>Discover content</span>
        </div>
      </div>
      
      {/* Login Link */}
      <div className="text-center">
        <span className="text-gray-600">Already have an account? </span>
        <Link 
          to="/user-login" 
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegistrationHeader;