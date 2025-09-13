import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
        <Icon name="Zap" size={36} color="white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Welcome Back
      </h1>
      <p className="text-gray-600 text-lg">
        Sign in to continue your social journey
      </p>
      <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
        <Icon name="Users" size={16} />
        <span>Join 2.5M+ active users</span>
      </div>
    </div>
  );
};

export default LoginHeader;