import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    testUser: {
      username: 'testuser123',
      email: 'test@nextgensocial.com',
      password: 'TestPass123!'
    },
    demoUser: {
      username: 'demouser456',
      email: 'demo@nextgensocial.com', 
      password: 'DemoPass456!'
    }
  };

  const handleSocialRegistration = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Registering with ${provider}`);
      
      // Simulate successful registration
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        username: `${provider}_user_${Date.now()}`,
        email: `user@${provider}.com`,
        provider: provider,
        registrationDate: new Date()?.toISOString()
      }));
      
      // Navigate to profile setup or home
      navigate('/user-profile');
      
    } catch (error) {
      console.error('Social registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormRegistration = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate form registration API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      console.log('Registering with form data:', formData);
      
      // Create user object
      const newUser = {
        id: Date.now(),
        username: formData?.username,
        email: formData?.email,
        birthDate: `${formData?.birthYear}-${formData?.birthMonth?.toString()?.padStart(2, '0')}-${formData?.birthDay?.toString()?.padStart(2, '0')}`,
        registrationDate: new Date()?.toISOString(),
        provider: 'email',
        isVerified: false
      };
      
      // Store user data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Show success message
      alert('Account created successfully! Welcome to NextGen Social!');
      
      // Navigate to profile setup
      navigate('/user-profile');
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check your information and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Registration Header */}
          <RegistrationHeader />
          
          {/* Registration Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {/* Social Registration Options */}
            <SocialRegistration 
              onSocialRegister={handleSocialRegistration}
              isLoading={isLoading}
            />
            
            {/* Registration Form */}
            <RegistrationForm 
              onSubmit={handleFormRegistration}
              isLoading={isLoading}
            />
          </div>
          
          {/* Footer Information */}
          <div className="text-center mt-8 space-y-4">
            <div className="text-xs text-gray-500">
              By creating an account, you agree to our community guidelines and help us build a safe, inclusive platform for everyone.
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
              <a href="#" className="hover:text-gray-600 transition-colors">Help Center</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Community Guidelines</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Contact Us</a>
            </div>
            
            <div className="text-xs text-gray-400">
              © {new Date()?.getFullYear()} NextGen Social. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;