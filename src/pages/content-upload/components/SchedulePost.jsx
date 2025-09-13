import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SchedulePost = ({ 
  scheduleData, 
  onScheduleChange,
  uploadType = 'post',
  className = '' 
}) => {
  const [isEnabled, setIsEnabled] = useState(scheduleData?.enabled || false);
  const [selectedDate, setSelectedDate] = useState(scheduleData?.date || '');
  const [selectedTime, setSelectedTime] = useState(scheduleData?.time || '');
  const [timezone, setTimezone] = useState(scheduleData?.timezone || 'America/New_York');

  const quickScheduleOptions = [
    {
      id: 'in_1_hour',
      label: 'In 1 hour',
      getDateTime: () => {
        const date = new Date();
        date?.setHours(date?.getHours() + 1);
        return date;
      }
    },
    {
      id: 'tomorrow_9am',
      label: 'Tomorrow at 9 AM',
      getDateTime: () => {
        const date = new Date();
        date?.setDate(date?.getDate() + 1);
        date?.setHours(9, 0, 0, 0);
        return date;
      }
    },
    {
      id: 'next_week',
      label: 'Next week, same time',
      getDateTime: () => {
        const date = new Date();
        date?.setDate(date?.getDate() + 7);
        return date;
      }
    }
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'UTC', label: 'UTC' }
  ];

  const handleScheduleToggle = (enabled) => {
    setIsEnabled(enabled);
    onScheduleChange({
      enabled,
      date: selectedDate,
      time: selectedTime,
      timezone
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onScheduleChange({
      enabled: isEnabled,
      date,
      time: selectedTime,
      timezone
    });
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    onScheduleChange({
      enabled: isEnabled,
      date: selectedDate,
      time,
      timezone
    });
  };

  const handleTimezoneChange = (tz) => {
    setTimezone(tz);
    onScheduleChange({
      enabled: isEnabled,
      date: selectedDate,
      time: selectedTime,
      timezone: tz
    });
  };

  const handleQuickSchedule = (option) => {
    const dateTime = option?.getDateTime();
    const date = dateTime?.toISOString()?.split('T')?.[0];
    const time = dateTime?.toTimeString()?.slice(0, 5);
    
    setSelectedDate(date);
    setSelectedTime(time);
    setIsEnabled(true);
    
    onScheduleChange({
      enabled: true,
      date,
      time,
      timezone
    });
  };

  const getMinDate = () => {
    const now = new Date();
    return now?.toISOString()?.split('T')?.[0];
  };

  const getMinTime = () => {
    const now = new Date();
    const today = now?.toISOString()?.split('T')?.[0];
    
    if (selectedDate === today) {
      // Add 1 hour buffer for current day
      now?.setHours(now?.getHours() + 1);
      return now?.toTimeString()?.slice(0, 5);
    }
    return '00:00';
  };

  const formatScheduledDateTime = () => {
    if (!selectedDate || !selectedTime) return '';
    
    const dateTime = new Date(`${selectedDate}T${selectedTime}`);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    
    return dateTime?.toLocaleDateString('en-US', options);
  };

  // Stories cannot be scheduled
  if (uploadType === 'story') {
    return (
      <div className={`bg-card border border-border rounded-xl p-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-primary">Schedule Story</h3>
            <p className="text-sm text-text-secondary">Stories cannot be scheduled and will be posted immediately</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} className="text-accent" />
            <h3 className="font-semibold text-primary">Schedule Post</h3>
          </div>
        </div>

        {/* Schedule Toggle */}
        <Checkbox
          label="Schedule this post"
          description="Choose when to publish your post"
          checked={isEnabled}
          onChange={(e) => handleScheduleToggle(e?.target?.checked)}
        />

        {isEnabled && (
          <div className="space-y-4 pl-6 border-l-2 border-accent/20">
            {/* Quick Schedule Options */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-primary">Quick Schedule</h4>
              <div className="grid grid-cols-1 gap-2">
                {quickScheduleOptions?.map((option) => (
                  <Button
                    key={option?.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSchedule(option)}
                    className="justify-start"
                  >
                    {option?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Date and Time */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-primary">Custom Schedule</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-primary mb-1">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e?.target?.value)}
                    min={getMinDate()}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-primary mb-1">Time</label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => handleTimeChange(e?.target?.value)}
                    min={getMinTime()}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-primary mb-1">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => handleTimezoneChange(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                >
                  {timezones?.map((tz) => (
                    <option key={tz?.value} value={tz?.value}>
                      {tz?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scheduled Time Preview */}
            {selectedDate && selectedTime && (
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-accent" />
                  <div>
                    <div className="text-sm font-medium text-primary">Scheduled for:</div>
                    <div className="text-sm text-text-secondary">{formatScheduledDateTime()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Info */}
            <div className="bg-surface rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-accent mt-0.5" />
                <div className="text-xs text-text-secondary">
                  <p className="font-medium text-primary mb-1">Scheduling Info:</p>
                  <ul className="space-y-1">
                    <li>• Posts can be scheduled up to 30 days in advance</li>
                    <li>• You can edit or cancel scheduled posts anytime</li>
                    <li>• Scheduled posts will appear in your drafts</li>
                    <li>• You'll get a notification when your post goes live</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePost;