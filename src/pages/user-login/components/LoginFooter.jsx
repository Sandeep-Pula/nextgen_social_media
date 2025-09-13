import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <Link
          to="/user-registration"
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Create Account
        </Link>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-700 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-700 transition-colors">
              Help Center
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} />
            <span>Secured by SSL</span>
          </div>
        </div>
        
        <div className="text-center mt-4 text-xs text-gray-400">
          © {currentYear} NextGen Social. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;