import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import SocialLoginButtons from './components/SocialLoginButtons';
import LoginForm from './components/LoginForm';
import TwoFactorModal from './components/TwoFactorModal';
import LoginFooter from './components/LoginFooter';
import Icon from '../../components/AppIcon';

const UserLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState('');
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);

  // Mock credentials for demo
  const mockCredentials = {
    email: 'admin@nextgen.com',
    password: 'password123',
    twoFactorCode: '123456'
  };

  useEffect(() => {
    if (isBlocked && blockTimeLeft > 0) {
      const timer = setInterval(() => {
        setBlockTimeLeft(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isBlocked, blockTimeLeft]);

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Logging in with ${provider}`);
      // Simulate successful social login
      navigate('/user-profile');
    } catch (err) {
      setError(`Failed to login with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (isBlocked) {
      setError(`Too many failed attempts. Please wait ${blockTimeLeft} seconds.`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Simulate 2FA requirement for demo
        setShowTwoFactor(true);
        setLoginAttempts(0);
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsBlocked(true);
          setBlockTimeLeft(30); // 30 seconds block
          setError('Account temporarily blocked due to multiple failed attempts.');
        } else {
          setError(`Invalid credentials. ${3 - newAttempts} attempts remaining.`);
        }
      }
    } catch (err) {
      setError('Login failed. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorVerify = async (code) => {
    setTwoFactorLoading(true);
    setTwoFactorError('');

    try {
      // Simulate 2FA verification
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (code === mockCredentials?.twoFactorCode) {
        // Successful login
        console.log('Login successful with 2FA');
        setShowTwoFactor(false);
        navigate('/user-profile');
      } else {
        setTwoFactorError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setTwoFactorError('Verification failed. Please try again.');
    } finally {
      setTwoFactorLoading(false);
    }
  };

  const handleTwoFactorClose = () => {
    setShowTwoFactor(false);
    setTwoFactorError('');
  };

  return (
    <>
      <Helmet>
        <title>Sign In - NextGen Social</title>
        <meta name="description" content="Sign in to NextGen Social and connect with your community. Secure authentication with social login options." />
        <meta name="keywords" content="login, sign in, social media, authentication, NextGen Social" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
            
            <div className="relative z-10">
              <LoginHeader />

              <div className="space-y-6">
                <SocialLoginButtons 
                  onSocialLogin={handleSocialLogin}
                  isLoading={isLoading}
                />

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or continue with email</span>
                  </div>
                </div>

                <LoginForm 
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                  error={error}
                />

                <LoginFooter />
              </div>
            </div>
          </div>

          {/* Security notice */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
              <Icon name="Lock" size={16} />
              <span>Your data is protected with enterprise-grade security</span>
            </div>
          </div>
        </div>

        <TwoFactorModal
          isOpen={showTwoFactor}
          onClose={handleTwoFactorClose}
          onVerify={handleTwoFactorVerify}
          isLoading={twoFactorLoading}
          error={twoFactorError}
        />
      </div>
    </>
  );
};

export default UserLogin;