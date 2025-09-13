import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TwoFactorModal = ({ isOpen, onClose, onVerify, isLoading, error }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft]);

  useEffect(() => {
    if (isOpen) {
      inputRefs?.current?.[0]?.focus();
    }
  }, [isOpen]);

  const handleInputChange = (index, value) => {
    if (value?.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs?.current?.[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode?.every(digit => digit !== '') && newCode?.join('')?.length === 6) {
      onVerify(newCode?.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !code?.[index] && index > 0) {
      inputRefs?.current?.[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    setTimeLeft(30);
    setCode(['', '', '', '', '', '']);
    console.log('Resending verification code...');
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const fullCode = code?.join('');
    if (fullCode?.length === 6) {
      onVerify(fullCode);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Icon name="Shield" size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Two-Factor Authentication
          </h2>
          <p className="text-gray-600">
            Enter the 6-digit code sent to your registered device
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-700">
              <p className="font-medium">Verification Failed</p>
              <p className="mt-1">{error}</p>
              <p className="mt-2 text-xs">
                <strong>Demo code:</strong> 123456
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-3">
            {code?.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e?.target?.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isLoading}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 disabled:bg-gray-100"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              variant="default"
              fullWidth
              loading={isLoading}
              disabled={isLoading || code?.some(digit => digit === '')}
              className="py-3"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>

            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-sm text-gray-600">
                  Resend code in {timeLeft}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  disabled={isLoading}
                >
                  Resend verification code
                </button>
              )}
            </div>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isLoading}
          aria-label="Close modal"
        >
          <Icon name="X" size={24} />
        </button>
      </div>
    </div>
  );
};

export default TwoFactorModal;