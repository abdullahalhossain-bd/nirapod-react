import { useState, useEffect } from 'react';
import { X, Check, AlertTriangle, Users, Bell, Shield } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  timestamp: Date;
  read: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationCenter = ({ 
  isOpen, 
  onClose, 
  notifications,
  onMarkAsRead,
  onClearAll
}: NotificationCenterProps) => {
  // Prevent scrolling when notification center is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'info':
        return <Bell className="w-5 h-5 text-blue-600" />;
      case 'success':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getNotificationBackground = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return 'border-l-4 border-red-500 bg-red-50 hover:bg-red-100';
      case 'info':
        return 'border-l-4 border-blue-500 bg-blue-50 hover:bg-blue-100';
      case 'success':
        return 'border-l-4 border-green-500 bg-green-50 hover:bg-green-100';
      case 'warning':
        return 'border-l-4 border-yellow-500 bg-yellow-50 hover:bg-yellow-100';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    // Less than a minute
    if (diff < 60 * 1000) {
      return 'Just now';
    }
    
    // Less than an hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes}m ago`;
    }
    
    // Less than a day
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours}h ago`;
    }
    
    // More than a day
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days}d ago`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 transform transition-all duration-300">
      <div className="h-full w-full max-w-sm ml-auto bg-white flex flex-col transform transition-transform duration-300 shadow-xl">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close notifications"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-500">Recent</span>
              <button 
                className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
                onClick={() => notifications.forEach(n => onMarkAsRead(n.id))}
              >
                Mark all as read
              </button>
            </div>
            
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`flex p-3 rounded-lg transition-colors ${getNotificationBackground(notification.type)}`}
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    <div className="flex-shrink-0 mr-3">
                      <div className={`w-10 h-10 rounded-full ${
                        notification.type === 'alert' ? 'bg-red-100' :
                        notification.type === 'info' ? 'bg-blue-100' :
                        notification.type === 'success' ? 'bg-green-100' :
                        'bg-yellow-100'
                      } flex items-center justify-center`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <span className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <button className="text-xs text-blue-600 font-medium">View Details</button>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Bell className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
                  <p className="text-sm text-gray-500">You're all caught up!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {notifications.length > 0 && (
          <div className="p-5 border-t border-gray-200">
            <button 
              onClick={onClearAll}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Clear All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
