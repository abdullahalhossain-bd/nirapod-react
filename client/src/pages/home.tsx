import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, Bell, AlertTriangle, Home as HomeIcon, Map, UserCircle, Sun, AlertCircle, BadgeAlert, Camera, MapPin, Shield, FileText, Users, Phone, Mic, Wifi, Smartphone, ChevronRight, Activity, Car } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { NotificationCenter, Notification } from '@/components/NotificationCenter';
import { SplashScreen } from '@/components/SplashScreen';
import { FeatureSection } from '@/components/FeatureSection';
import { SOSConfirmDialog } from '@/components/SOSConfirmDialog';
import MentalHealthSection from '@/components/MentalHealthSection';
import RideShareSection from '@/components/RideShareSection';
import Badge from '@/components/Badge';
import StatCard from '@/components/StatCard';

interface MainFeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color?: string;
  onClick?: () => void;
}

interface QuickActionProps {
  icon: React.ElementType;
  title: string;
  onClick?: () => void;
}

interface ActivityItemProps {
  title: string;
  time: string;
  type: string;
  status?: 'normal' | 'warning' | 'danger';
}

const Home = () => {
  const [location] = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [safetyScore] = useState(85);
  const [weatherCondition] = useState('Clear');
  const [areaStatus] = useState('Safe');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSOSDialogOpen, setIsSOSDialogOpen] = useState(false);
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
    {
      id: '3',
      title: 'Live Stream Started',
      message: 'Community Safety Workshop is now live',
      type: 'success',
      timestamp: new Date(Date.now() - 7200000),
      read: false,
    },
    {
      id: '4',
      title: 'Account Activity',
      message: 'Your emergency contacts were updated',
      type: 'info',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
    },
  ]);

  // Greeting message based on time of day
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const MainFeature: React.FC<MainFeatureProps> = ({ 
    icon: Icon, 
    title, 
    color = 'blue', 
    description,
    onClick 
  }) => (
    <div 
      className={`feature-card flex flex-col items-center justify-center p-5 bg-white rounded-xl shadow-card hover:shadow-hover transition-all border border-gray-100 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className={`p-4 rounded-full bg-${color}-50 mb-3`}>
        <Icon className={`w-7 h-7 text-${color}-600`} strokeWidth={1.5} />
      </div>
      <span className="text-sm font-semibold text-gray-800 mb-1">{title}</span>
      <p className="text-xs text-gray-500 text-center">{description}</p>
    </div>
  );

  const QuickAction: React.FC<QuickActionProps> = ({ 
    icon: Icon, 
    title,
    onClick
  }) => (
    <div 
      className="feature-card flex items-center justify-between bg-white p-4 rounded-xl shadow-card hover:shadow-hover border border-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2.5 rounded-full bg-blue-50">
          <Icon className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
        </div>
        <span className="text-sm font-medium text-gray-800">{title}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );

  const ActivityItem: React.FC<ActivityItemProps> = ({ title, time, type, status = 'normal' }) => {
    const statusColors = {
      normal: 'bg-blue-50 text-blue-600',
      warning: 'bg-yellow-50 text-yellow-600',
      danger: 'bg-red-50 text-red-600',
    };

    return (
      <div className="border-b border-gray-100 py-3 last:border-0 hover:bg-gray-50 transition-colors rounded-lg px-2">
        <div className="flex justify-between items-start cursor-pointer">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-800 mb-1">{title}</h3>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
                {type}
              </span>
              <span className="text-xs text-gray-500">{time}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />
        </div>
      </div>
    );
  };

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
    // In a real app this would trigger emergency protocols
    setIsSOSDialogOpen(false);
    // For demo purposes, add a notification
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

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

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
      <header className="fixed top-0 left-0 right-0 bg-white header-shadow z-40">
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

      {/* Greeting & Status Section */}
      <div className="deep-blue-gradient text-white p-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">{greeting}, Sarah</h2>
              <div className="flex items-center space-x-2 text-blue-100">
                <Badge value={safetyScore} />
              </div>
            </div>
            <div className="flex justify-between text-sm bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center">
                <Sun className="w-4 h-4 mr-2" strokeWidth={1.5} />
                <span className="text-blue-50">{weatherCondition}</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
                <span className="text-blue-50">Area Status: {areaStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 pb-24 space-y-6 max-w-screen-xl mx-auto">
        {/* Feature Sections */}
        <FeatureSection />

        {/* Quick Access Bar */}
        <div className="grid grid-cols-1 gap-3">
          <QuickAction icon={Phone} title="Trigger Fake Call" onClick={() => {}} />
          <QuickAction icon={Mic} title="Voice Commands" onClick={() => {}} />
          <QuickAction icon={Wifi} title="Enable Offline Mode" onClick={() => {}} />
          <QuickAction icon={Smartphone} title="Find My Device" onClick={() => {}} />
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <MainFeature 
            icon={BadgeAlert} 
            title="SOS Alert" 
            color="red" 
            description="Quick emergency assistance"
            onClick={() => setIsSOSDialogOpen(true)}
          />
          <MainFeature 
            icon={Camera} 
            title="Report Crime" 
            description="Document incidents safely"
            onClick={() => {}}
          />
          <MainFeature 
            icon={Car} 
            title="Ride Safety" 
            color="indigo"
            description="Track rideshare journeys"
            onClick={() => {
              const rideSection = document.querySelector('[data-section="ride-safety"]');
              if (rideSection) {
                rideSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
          <MainFeature 
            icon={MapPin} 
            title="Safety Map" 
            description="View safe routes nearby"
            onClick={() => {}}
          />
          <MainFeature 
            icon={Shield} 
            title="Police Contact" 
            description="Direct line to authorities"
            onClick={() => {}}
          />
          <MainFeature 
            icon={Users} 
            title="Community" 
            description="Connect with neighbors"
            onClick={() => {}}
          />
        </div>

        {/* Safety Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-card card-border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Safety Statistics</h2>
          <div className="grid grid-cols-3 gap-4">
            <StatCard value={safetyScore} label="Safety Score" colorClass="bg-blue-50" textClass="text-blue-600" />
            <StatCard value={4.2} label="Response Time" colorClass="bg-green-50" textClass="text-green-600" />
            <StatCard value={127} label="Active Users" colorClass="bg-blue-50" textClass="text-blue-600" />
          </div>
        </div>

        {/* Ride Safety Tracking */}
        <div className="bg-white rounded-xl p-6 shadow-card card-border" data-section="ride-safety">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Ride Safety Tracking</h2>
          <RideShareSection />
        </div>

        {/* Mental Health Resources */}
        <div className="bg-white rounded-xl p-6 shadow-card card-border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Mental Health Support</h2>
          <MentalHealthSection />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-card card-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            <button className="text-sm text-blue-600 font-medium">View All</button>
          </div>
          <ActivityItem
            title="Suspicious activity reported"
            time="2m ago"
            type="Alert"
            status="danger"
          />
          <ActivityItem
            title="Police patrol update"
            time="15m ago"
            type="Update"
            status="normal"
          />
          <ActivityItem
            title="Community safety tip"
            time="1h ago"
            type="Community"
            status="normal"
          />
        </div>
      </main>

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

export default Home;