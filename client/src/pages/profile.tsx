import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, Bell, Home as HomeIcon, Map, UserCircle, Activity, Settings, Edit, User, Shield, Phone, Bookmark, Clock, FileText, Image, AlertTriangle, LogOut, Camera, UploadCloud } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { NotificationCenter, Notification } from '@/components/NotificationCenter';
import { SOSConfirmDialog } from '@/components/SOSConfirmDialog';

const ProfilePage = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSOSDialogOpen, setIsSOSDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'emergency' | 'media'>('info');
  const [editingField, setEditingField] = useState<string | null>(null);
  
  // Notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Safety Alert',
      message: 'Suspicious activity reported in your area',
      type: 'alert',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      title: 'Community Update',
      message: 'New safety patrol schedule posted',
      type: 'info',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  ]);

  // Mock profile data
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Safety Street, Secure City, SC 12345',
    memberSince: 'January 2024',
    safetyScore: 85,
    emergencyContacts: [
      { id: '1', name: 'John Smith', relation: 'Spouse', phone: '+1 (555) 987-6543' },
      { id: '2', name: 'Mary Johnson', relation: 'Mother', phone: '+1 (555) 234-5678' },
      { id: '3', name: 'Local Police', relation: 'Emergency', phone: '911' },
    ],
    securityPreferences: {
      twoFactorAuth: true,
      locationSharing: 'Emergencies only',
      dataBackup: true,
      notificationLevel: 'High',
    },
    mediaUploads: [
      { id: '1', type: 'image', name: 'Safety training certificate', date: '2023-12-15', size: '1.2 MB' },
      { id: '2', type: 'document', name: 'Emergency contact information', date: '2023-11-20', size: '500 KB' },
      { id: '3', type: 'image', name: 'House security setup', date: '2023-10-05', size: '2.5 MB' },
    ]
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleSOSConfirm = () => {
    // Similar to home page, handle SOS confirmation
    setIsSOSDialogOpen(false);
    // Add notification for demo
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: 'SOS Alert Sent',
      message: 'Emergency services have been notified.',
      type: 'alert',
      timestamp: new Date(),
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  const startEdit = (field: string) => {
    setEditingField(field);
  };

  const saveEdit = (field: string, value: string) => {
    // In a real app, this would save to an API
    setProfileData({
      ...profileData,
      [field]: value
    });
    setEditingField(null);
  };

  const ProfileHeader = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-20 h-20 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center">
            <User className="w-12 h-12 text-blue-600" />
          </div>
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{profileData.name}</h2>
          <p className="text-sm text-gray-500">Premium Member</p>
          <div className="mt-2 flex items-center space-x-2">
            <div className="bg-blue-50 px-2 py-1 rounded-full flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Safety Score: {profileData.safetyScore}</span>
            </div>
            <div className="text-xs text-gray-500">Member since {profileData.memberSince}</div>
          </div>
        </div>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );

  const TabsNavigation = () => (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto">
      <button 
        onClick={() => setActiveTab('info')}
        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
          activeTab === 'info' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        Personal Info
      </button>
      <button 
        onClick={() => setActiveTab('security')}
        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
          activeTab === 'security' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        Security
      </button>
      <button 
        onClick={() => setActiveTab('emergency')}
        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
          activeTab === 'emergency' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        Emergency
      </button>
      <button 
        onClick={() => setActiveTab('media')}
        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
          activeTab === 'media' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        Media
      </button>
    </div>
  );

  const InfoField = ({ label, value, field }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button 
          onClick={() => startEdit(field)}
          className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
        >
          Edit
        </button>
      </div>
      {editingField === field ? (
        <div className="flex space-x-2">
          <input 
            type="text" 
            defaultValue={value}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          />
          <button 
            onClick={() => saveEdit(field, 'New Value')} // In real app would get value from input
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg"
          >
            Save
          </button>
        </div>
      ) : (
        <p className="text-gray-900 bg-gray-50 p-2 rounded-lg text-sm">{value}</p>
      )}
    </div>
  );

  const EmergencyContactCard = ({ contact }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-start mb-3">
      <div>
        <div className="flex items-center mb-1">
          <span className="font-medium text-gray-900">{contact.name}</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{contact.relation}</span>
        </div>
        <p className="text-sm text-gray-600">{contact.phone}</p>
      </div>
      <div className="flex space-x-1">
        <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors">
          <Edit className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-red-600 transition-colors">
          <Phone className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const ToggleSwitch = ({ label, checked }) => (
    <label className="flex items-center justify-between p-2 bg-gray-50 rounded-lg mb-3">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
        <input 
          type="checkbox"
          name="toggle"
          id={`toggle-${label}`}
          checked={checked}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
        />
        <label 
          htmlFor={`toggle-${label}`}
          className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
        ></label>
      </div>
    </label>
  );

  const MediaItem = ({ item }) => {
    const icons = {
      image: Image,
      document: FileText,
    };
    const Icon = icons[item.type] || FileText;

    return (
      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 mb-2">
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-lg mr-3">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
            <div className="flex space-x-3 text-xs text-gray-500">
              <span>{item.date}</span>
              <span>{item.size}</span>
            </div>
          </div>
        </div>
        <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Menu */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Notification Center */}
      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onClearAll={handleClearAllNotifications}
      />

      {/* SOS Confirm Dialog */}
      <SOSConfirmDialog 
        isOpen={isSOSDialogOpen}
        onClose={() => setIsSOSDialogOpen(false)}
        onConfirm={handleSOSConfirm}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white header-shadow z-30">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
              </button>
              <div className="flex items-center">
                <h1 className="text-lg font-semibold text-gray-900">Nirapod</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                className="relative notification-bell p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Notifications"
                onClick={() => setIsNotificationsOpen(true)}
              >
                <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full notification-badge" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[60px]"></div>

      {/* Profile Content */}
      <div className="p-4 pb-24 max-w-screen-xl mx-auto">
        <ProfileHeader />
        <TabsNavigation />

        {activeTab === 'info' && (
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <InfoField label="Full Name" value={profileData.name} field="name" />
            <InfoField label="Email Address" value={profileData.email} field="email" />
            <InfoField label="Phone Number" value={profileData.phone} field="phone" />
            <InfoField label="Home Address" value={profileData.address} field="address" />
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Security Preferences</h3>
            
            <ToggleSwitch label="Two-Factor Authentication" checked={profileData.securityPreferences.twoFactorAuth} />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location Sharing</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                <option value="never">Never</option>
                <option value="emergency">Emergencies only</option>
                <option value="contacts">Emergency contacts only</option>
                <option value="always">Always</option>
              </select>
            </div>
            
            <ToggleSwitch label="Automatic Data Backup" checked={profileData.securityPreferences.dataBackup} />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Level</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                <option value="low">Low (Emergencies only)</option>
                <option value="medium">Medium (Important alerts)</option>
                <option value="high">High (All safety updates)</option>
              </select>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Account Security</h4>
              <button className="w-full p-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors mb-2 text-sm text-center">
                Change Password
              </button>
              <button className="w-full p-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors text-sm text-center">
                Delete Account
              </button>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Emergency Contacts</h3>
              <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg">
                Add Contact
              </button>
            </div>
            
            <div className="space-y-2">
              {profileData.emergencyContacts.map(contact => (
                <EmergencyContactCard key={contact.id} contact={contact} />
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-1">Emergency Instructions</h4>
                  <p className="text-sm text-red-700">
                    In case of an emergency, your contacts will receive your location and a pre-recorded message. 
                    Make sure your emergency contacts are up to date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Uploaded Media</h3>
              <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg flex items-center">
                <UploadCloud className="w-4 h-4 mr-1" />
                Upload
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg mb-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700">Recent Media</span>
                </div>
                <button className="text-xs text-blue-600">View All</button>
              </div>
              
              {profileData.mediaUploads.map(item => (
                <MediaItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="text-center p-4 border border-dashed border-gray-300 rounded-lg">
              <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or click to browse</p>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg">
                Choose Files
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center p-3 glass-effect z-40">
        <Link href="/">
          <div className="flex flex-col items-center justify-center">
            <HomeIcon className={`w-6 h-6 ${location === '/' ? 'text-blue-600' : 'text-gray-400'}`} strokeWidth={1.5} />
            <span className={`text-xs mt-1 ${location === '/' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Home</span>
          </div>
        </Link>
        
        <Link href="/map">
          <div className="flex flex-col items-center justify-center">
            <Map className={`w-6 h-6 ${location === '/map' ? 'text-blue-600' : 'text-gray-400'}`} strokeWidth={1.5} />
            <span className={`text-xs mt-1 ${location === '/map' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Map</span>
          </div>
        </Link>
        
        <div className="relative flex items-center justify-center">
          <button 
            onClick={() => setIsSOSDialogOpen(true)}
            className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white transform -translate-y-5 shadow-lg hover:bg-red-700 active:bg-red-800 transition-colors sos-button"
          >
            <AlertTriangle className="w-8 h-8" />
          </button>
          <span className="absolute -bottom-1 text-xs font-medium text-red-600">SOS</span>
        </div>
        
        <Link href="/activity">
          <div className="flex flex-col items-center justify-center">
            <Activity className={`w-6 h-6 ${location === '/activity' ? 'text-blue-600' : 'text-gray-400'}`} strokeWidth={1.5} />
            <span className={`text-xs mt-1 ${location === '/activity' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Activity</span>
          </div>
        </Link>
        
        <Link href="/profile">
          <div className="flex flex-col items-center justify-center">
            <UserCircle className={`w-6 h-6 ${location === '/profile' ? 'text-blue-600' : 'text-gray-400'}`} strokeWidth={1.5} />
            <span className={`text-xs mt-1 ${location === '/profile' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Profile</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default ProfilePage;