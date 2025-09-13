import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticationRouter = ({ children, isAuthenticated = false }) => {
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  
  const isAuthRoute = ['/user-login', '/user-registration']?.includes(location?.pathname);
  
  useEffect(() => {
    if (!isAuthenticated && !isAuthRoute) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
  }, [isAuthenticated, isAuthRoute]);

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

  const handleAuthSubmit = (e) => {
    e?.preventDefault();
    console.log(`${authMode} submitted`);
    // Implement authentication logic
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  if (isAuthenticated) {
    return children;
  }

  if (isAuthRoute) {
    return children;
  }

  return (
    <>
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="auth-container">
            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-lg p-8">
              {/* Logo and Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4">
                  <Icon name="Zap" size={32} color="white" />
                </div>
                <h1 className="text-2xl font-bold text-primary mb-2">
                  NextGen Social
                </h1>
                <p className="text-text-secondary">
                  {authMode === 'login' ?'Welcome back! Sign in to continue' :'Join the community and start sharing'
                  }
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleSocialLogin('google')}
                  iconName="Chrome"
                  iconPosition="left"
                  className="justify-center"
                >
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleSocialLogin('apple')}
                  iconName="Apple"
                  iconPosition="left"
                  className="justify-center"
                >
                  Continue with Apple
                </Button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-text-secondary">or</span>
                </div>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                  />
                </div>

                {authMode === 'login' && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-text-secondary">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  className="mt-6"
                >
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              {/* Switch Auth Mode */}
              <div className="text-center mt-6">
                <span className="text-text-secondary">
                  {authMode === 'login' ? "Don't have an account? " :"Already have an account? "
                  }
                </span>
                <button
                  onClick={switchAuthMode}
                  className="text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  {authMode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </div>

              {/* Terms and Privacy */}
              {authMode === 'register' && (
                <p className="text-xs text-text-secondary text-center mt-6">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-accent hover:text-accent/80">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-accent hover:text-accent/80">Privacy Policy</a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default AuthenticationRouter;