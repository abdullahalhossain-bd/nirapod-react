import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { X, Shield, MapPin, User, Phone, Activity, Settings, HelpCircle, LogOut, Home as HomeIcon, Map } from 'lucide-react';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Navigation = ({ isOpen, onClose }: NavigationProps) => {
  const [location] = useLocation();
  const [safetyScore] = useState(85);

  // Prevent scrolling when menu is open
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 transform transition-all duration-300">
      <div className="h-full w-[280px] bg-white flex flex-col transform transition-transform duration-300 shadow-xl">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Nirapod</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-5">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500">Premium Member</p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-700">Safety Score</span>
                  <span className="text-sm font-bold text-blue-700">{safetyScore}</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${safetyScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <nav>
              <ul className="space-y-1">
                <li>
                  <Link href="/">
                    <a className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg ${
                      location === '/' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100 transition-colors'
                    }`}>
                      <HomeIcon className="w-5 h-5" />
                      <span className="font-medium">Home</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/map">
                    <a className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg ${
                      location === '/map' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100 transition-colors'
                    }`}>
                      <Map className="w-5 h-5" />
                      <span className="font-medium">Safety Map</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/profile">
                    <a className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg ${
                      location === '/profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100 transition-colors'
                    }`}>
                      <User className="w-5 h-5" />
                      <span className="font-medium">Profile</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/safety-tips">
                    <a className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg ${
                      location === '/safety-tips' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100 transition-colors'
                    }`}>
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">Safety Tips</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/emergency-contacts">
                    <a className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg ${
                      location === '/emergency-contacts' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100 transition-colors'
                    }`}>
                      <Phone className="w-5 h-5" />
                      <span className="font-medium">Emergency Contacts</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/activity">
                    <a className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg ${
                      location === '/activity' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100 transition-colors'
                    }`}>
                      <Activity className="w-5 h-5" />
                      <span className="font-medium">Activity Log</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="mt-8 pt-4 border-t border-gray-200">
              <Link href="/settings">
                <a className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </a>
              </Link>
              <Link href="/help">
                <a className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-medium">Help & Support</span>
                </a>
              </Link>
              <button className="mt-4 w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
