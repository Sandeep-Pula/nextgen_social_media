import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  maxCount = 99, 
  showZero = false, 
  size = 'default',
  variant = 'error',
  className = '',
  children 
}) => {
  const shouldShow = count > 0 || showZero;
  
  const sizeClasses = {
    sm: 'min-w-[14px] h-[14px] text-[10px]',
    default: 'min-w-[18px] h-[18px] text-xs',
    lg: 'min-w-[22px] h-[22px] text-sm'
  };

  const variantClasses = {
    error: 'bg-error text-error-foreground',
    warning: 'bg-warning text-warning-foreground',
    success: 'bg-success text-success-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-muted-foreground'
  };

  const displayCount = count > maxCount ? `${maxCount}+` : count;

  if (!shouldShow && !children) {
    return null;
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      {shouldShow && (
        <span 
          className={`
            absolute -top-1 -right-1 
            ${sizeClasses?.[size]} 
            ${variantClasses?.[variant]}
            font-medium rounded-full 
            flex items-center justify-center
            animate-scale-in
            border-2 border-background
            shadow-sm
          `}
          aria-label={`${count} notifications`}
        >
          {displayCount}
        </span>
      )}
    </div>
  );
};

// Preset notification badge components for common use cases
export const MessageBadge = ({ count, children, ...props }) => (
  <NotificationBadge count={count} variant="accent" {...props}>
    {children}
  </NotificationBadge>
);

export const AlertBadge = ({ count, children, ...props }) => (
  <NotificationBadge count={count} variant="error" {...props}>
    {children}
  </NotificationBadge>
);

export const ActivityBadge = ({ count, children, ...props }) => (
  <NotificationBadge count={count} variant="success" {...props}>
    {children}
  </NotificationBadge>
);

export const UpdateBadge = ({ count, children, ...props }) => (
  <NotificationBadge count={count} variant="warning" {...props}>
    {children}
  </NotificationBadge>
);

export default NotificationBadge;