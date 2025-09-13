import React from 'react';
import Button from '../../../components/ui/Button';


const SocialRegistration = ({ onSocialRegister, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
      provider: 'google'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700',
      provider: 'facebook'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="text-center mb-6">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Quick Registration</h3>
      </div>
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.provider}
          variant="outline"
          fullWidth
          disabled={isLoading}
          onClick={() => onSocialRegister(provider?.provider)}
          className={`justify-center py-3 ${provider?.color} transition-all duration-200`}
          iconName={provider?.icon}
          iconPosition="left"
          iconSize={20}
        >
          Continue with {provider?.name}
        </Button>
      ))}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">or register with email</span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;