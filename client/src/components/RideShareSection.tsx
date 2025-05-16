import { useState } from 'react';
import { 
  Car, 
  Shield, 
  MapPin, 
  Share,
  ChevronRight
} from 'lucide-react';
import RideSharing from './rideshare/RideSharing';

export const RideShareSection: React.FC = () => {
  const [showDetailView, setShowDetailView] = useState(false);

  const handleViewDetails = () => {
    setShowDetailView(true);
  };

  const handleBackToOverview = () => {
    setShowDetailView(false);
  };

  // Overview of the ride share safety features
  const RideShareOverview = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md p-6 text-white mb-6">
          <h2 className="text-2xl font-semibold mb-2">Ride Safety Tracker</h2>
          <p className="mb-4 opacity-90">
            Log your rideshare journey details for enhanced safety and peace of mind.
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3 flex items-center">
              <Car className="w-5 h-5 mr-2" />
              Safe Rides
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Theft Prevention
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3 flex items-center">
              <Share className="w-5 h-5 mr-2" />
              Location Sharing
            </div>
          </div>
          <button 
            onClick={handleViewDetails}
            className="mt-5 bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Track Your Ride
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Why Track Your Rideshare?</h3>
              <p className="text-gray-600 text-sm mb-3">
                Recording rideshare information before your trip creates an important safety record. If an incident occurs, 
                authorities can quickly access critical details about your driver and vehicle.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-700 rounded-full p-1 mr-2">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-700">Verify driver and vehicle information</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-700 rounded-full p-1 mr-2">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-700">Share your trip details with trusted contacts</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-700 rounded-full p-1 mr-2">
                    <Share className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-700">Quick access to emergency assistance if needed</span>
                </div>
              </div>
              <button 
                onClick={handleViewDetails}
                className="mt-4 flex items-center text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
              >
                Start using ride safety
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {showDetailView ? (
        <div>
          <button 
            onClick={handleBackToOverview}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
            Back to Overview
          </button>
          <RideSharing />
        </div>
      ) : (
        <RideShareOverview />
      )}
    </div>
  );
};

export default RideShareSection;
