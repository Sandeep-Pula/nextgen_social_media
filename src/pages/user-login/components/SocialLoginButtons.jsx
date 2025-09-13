import React from 'react';
import Button from '../../../components/ui/Button';


const SocialLoginButtons = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300',
      provider: 'google'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      provider: 'facebook'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.provider}
          variant="outline"
          fullWidth
          disabled={isLoading}
          onClick={() => onSocialLogin(provider?.provider)}
          className={`justify-center py-3 ${provider?.color} transition-all duration-200`}
          iconName={provider?.icon}
          iconPosition="left"
          iconSize={20}
        >
          Continue with {provider?.name}
        </Button>
      ))}
    </div>
  );
};

export default SocialLoginButtons;