import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    agreeToTerms: false
  });

  const [validation, setValidation] = useState({
    username: { available: null, checking: false },
    email: { valid: null },
    password: { strength: 0, feedback: [] },
    confirmPassword: { matches: null }
  });

  const [errors, setErrors] = useState({});

  // Mock username availability check
  const checkUsernameAvailability = async (username) => {
    if (username?.length < 3) return;
    
    setValidation(prev => ({
      ...prev,
      username: { ...prev?.username, checking: true }
    }));

    // Simulate API call
    setTimeout(() => {
      const unavailableUsernames = ['admin', 'user', 'test', 'nextgen', 'social'];
      const available = !unavailableUsernames?.includes(username?.toLowerCase());
      
      setValidation(prev => ({
        ...prev,
        username: { available, checking: false }
      }));
    }, 1000);
  };

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    const feedback = [];

    if (password?.length >= 8) {
      strength += 25;
    } else {
      feedback?.push('At least 8 characters');
    }

    if (/[A-Z]/?.test(password)) {
      strength += 25;
    } else {
      feedback?.push('One uppercase letter');
    }

    if (/[a-z]/?.test(password)) {
      strength += 25;
    } else {
      feedback?.push('One lowercase letter');
    }

    if (/[0-9]/?.test(password)) {
      strength += 25;
    } else {
      feedback?.push('One number');
    }

    return { strength, feedback };
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time validation
    switch (field) {
      case 'username':
        if (value?.length >= 3) {
          checkUsernameAvailability(value);
        } else {
          setValidation(prev => ({
            ...prev,
            username: { available: null, checking: false }
          }));
        }
        break;
      
      case 'email':
        setValidation(prev => ({
          ...prev,
          email: { valid: validateEmail(value) }
        }));
        break;
      
      case 'password':
        const passwordValidation = calculatePasswordStrength(value);
        setValidation(prev => ({
          ...prev,
          password: passwordValidation
        }));
        
        // Check confirm password match
        if (formData?.confirmPassword) {
          setValidation(prev => ({
            ...prev,
            confirmPassword: { matches: value === formData?.confirmPassword }
          }));
        }
        break;
      
      case 'confirmPassword':
        setValidation(prev => ({
          ...prev,
          confirmPassword: { matches: value === formData?.password }
        }));
        break;
    }
  };

  // Generate date options
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date()?.getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Form submission
  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const newErrors = {};
    
    // Validation
    if (!formData?.username || formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (validation?.username?.available === false) {
      newErrors.username = 'Username is not available';
    }
    
    if (!formData?.email || !validation?.email?.valid) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password || validation?.password?.strength < 75) {
      newErrors.password = 'Password is too weak';
    }
    
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.birthMonth || !formData?.birthDay || !formData?.birthYear) {
      newErrors.birthDate = 'Please select your birth date';
    }
    
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms of service';
    }

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 25) return 'bg-red-500';
    if (strength < 50) return 'bg-orange-500';
    if (strength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username Field */}
      <div>
        <Input
          label="Username"
          type="text"
          placeholder="Choose a unique username"
          value={formData?.username}
          onChange={(e) => handleInputChange('username', e?.target?.value)}
          error={errors?.username}
          required
          className="relative"
        />
        
        {formData?.username?.length >= 3 && (
          <div className="mt-2 flex items-center space-x-2">
            {validation?.username?.checking ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin text-gray-400" />
                <span className="text-sm text-gray-500">Checking availability...</span>
              </>
            ) : validation?.username?.available === true ? (
              <>
                <Icon name="CheckCircle" size={16} className="text-green-500" />
                <span className="text-sm text-green-600">Username is available</span>
              </>
            ) : validation?.username?.available === false ? (
              <>
                <Icon name="XCircle" size={16} className="text-red-500" />
                <span className="text-sm text-red-600">Username is not available</span>
              </>
            ) : null}
          </div>
        )}
      </div>
      {/* Email Field */}
      <div>
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />
        
        {formData?.email && validation?.email?.valid !== null && (
          <div className="mt-2 flex items-center space-x-2">
            {validation?.email?.valid ? (
              <>
                <Icon name="CheckCircle" size={16} className="text-green-500" />
                <span className="text-sm text-green-600">Valid email format</span>
              </>
            ) : (
              <>
                <Icon name="XCircle" size={16} className="text-red-500" />
                <span className="text-sm text-red-600">Invalid email format</span>
              </>
            )}
          </div>
        )}
      </div>
      {/* Password Field */}
      <div>
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />
        
        {formData?.password && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Password strength:</span>
              <span className={`text-sm font-medium ${
                validation?.password?.strength < 25 ? 'text-red-600' :
                validation?.password?.strength < 50 ? 'text-orange-600' :
                validation?.password?.strength < 75 ? 'text-yellow-600': 'text-green-600'
              }`}>
                {getPasswordStrengthText(validation?.password?.strength)}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(validation?.password?.strength)}`}
                style={{ width: `${validation?.password?.strength}%` }}
              ></div>
            </div>
            
            {validation?.password?.feedback?.length > 0 && (
              <div className="text-sm text-gray-600">
                <span>Missing: </span>
                {validation?.password?.feedback?.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Confirm Password Field */}
      <div>
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
        
        {formData?.confirmPassword && validation?.confirmPassword?.matches !== null && (
          <div className="mt-2 flex items-center space-x-2">
            {validation?.confirmPassword?.matches ? (
              <>
                <Icon name="CheckCircle" size={16} className="text-green-500" />
                <span className="text-sm text-green-600">Passwords match</span>
              </>
            ) : (
              <>
                <Icon name="XCircle" size={16} className="text-red-500" />
                <span className="text-sm text-red-600">Passwords do not match</span>
              </>
            )}
          </div>
        )}
      </div>
      {/* Birth Date Fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Birth Date <span className="text-red-500">*</span>
        </label>
        
        <div className="grid grid-cols-3 gap-3">
          <select
            value={formData?.birthMonth}
            onChange={(e) => handleInputChange('birthMonth', e?.target?.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Month</option>
            {months?.map((month, index) => (
              <option key={month} value={index + 1}>{month}</option>
            ))}
          </select>
          
          <select
            value={formData?.birthDay}
            onChange={(e) => handleInputChange('birthDay', e?.target?.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Day</option>
            {days?.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          
          <select
            value={formData?.birthYear}
            onChange={(e) => handleInputChange('birthYear', e?.target?.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Year</option>
            {years?.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        {errors?.birthDate && (
          <p className="mt-2 text-sm text-red-600">{errors?.birthDate}</p>
        )}
      </div>
      {/* Terms Agreement */}
      <div>
        <Checkbox
          label={
            <span className="text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </a>
            </span>
          }
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;