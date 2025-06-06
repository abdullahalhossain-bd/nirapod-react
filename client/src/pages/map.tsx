import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, Bell, AlertTriangle, Home as HomeIcon, Map as MapIcon, UserCircle, Activity, Plus, Search, Filter, MapPin, Camera, FileText } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { NotificationCenter } from '@/components/NotificationCenter';
import { SOSConfirmDialog } from '@/components/SOSConfirmDialog';

interface Incident {
  id: string;
  type: 'theft' | 'assault' | 'vandalism' | 'suspicious' | 'other';
  latitude: number;
  longitude: number;
  date: string;
  time: string;
  description: string;
  status: 'active' | 'resolved' | 'investigating';
  reportedBy: string;
  images?: string[];
}

interface IncidentFormData {
  type: Incident['type'];
  description: string;
  date: string;
  time: string;
  images?: FileList;
}

const MapPage = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSOSDialogOpen, setIsSOSDialogOpen] = useState(false);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number; lng: number} | null>(null);

  // Get current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement location search
    console.log('Searching for:', searchQuery);
  };

  const handleReportSubmit = (formData: IncidentFormData) => {
    // Implement incident report submission
    console.log('Submitting report:', formData);
    setIsReportFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Menu */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Notification Center */}
      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={[]}
        onMarkAsRead={() => {}}
        onClearAll={() => {}}
      />

      {/* SOS Confirm Dialog */}
      <SOSConfirmDialog 
        isOpen={isSOSDialogOpen}
        onClose={() => setIsSOSDialogOpen(false)}
        onConfirm={() => {}}
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
                <h1 className="text-lg font-semibold text-gray-900">Safety Map</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                onClick={() => {}}
              >
                <Filter className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
              </button>
              <button 
                className="relative notification-bell p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Notifications"
                onClick={() => setIsNotificationsOpen(true)}
              >
                <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="px-4 pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search location..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </header>

      {/* Map Container */}
      <div className="fixed inset-0 pt-[116px] pb-16">
        <div className="w-full h-full bg-gray-200">
          {/* Map will be rendered here */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">Map loading...</p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsReportFormOpen(true)}
        className="fixed right-4 bottom-20 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 active:bg-blue-800 transition-colors z-50"
        aria-label="Report Incident"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Report Incident Form */}
      {isReportFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-xl p-4 animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Report Incident</h2>
              <button 
                onClick={() => setIsReportFormOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <AlertTriangle className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Incident Type
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="theft">Theft</option>
                  <option value="assault">Assault</option>
                  <option value="vandalism">Vandalism</option>
                  <option value="suspicious">Suspicious Activity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Describe what happened..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input 
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input 
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Photos/Evidence
                </label>
                <button
                  type="button"
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors"
                >
                  <Camera className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-500">
                    Tap to add photos
                  </span>
                </button>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsReportFormOpen(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            <MapIcon className={`w-6 h-6 ${location === '/map' ? 'text-blue-600' : 'text-gray-400'}`} strokeWidth={1.5} />
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

export default MapPage;