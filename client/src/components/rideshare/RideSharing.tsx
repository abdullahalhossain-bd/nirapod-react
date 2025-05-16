import { useState, useEffect } from 'react';
import {
  Car,
  User,
  MapPin,
  Clock,
  Calendar,
  Share,
  Bell,
  Phone,
  AlertCircle,
  Check,
  MapIcon,
  Shield,
  ChevronRight,
  Bookmark,
  Info,
  Timer,
  X
} from 'lucide-react';

// Interface for ride details
interface RideDetails {
  driverName: string;
  vehicleNumber: string;
  vehicleModel: string;
  driverAge?: string;
  pickupLocation: string;
  destination: string;
  estimatedArrival: string;
  estimatedDuration: string;
  tripStartTime?: string;
  rideShareCompany: 'uber' | 'lyft' | 'didi' | 'bolt' | 'other';
}

// Interface for trip history
interface TripHistory {
  id: string;
  date: string;
  time: string;
  driverName: string;
  vehicleNumber: string;
  vehicleModel: string;
  pickupLocation: string;
  destination: string;
  tripDuration: string;
  status: 'completed' | 'cancelled';
  rideShareCompany: 'uber' | 'lyft' | 'didi' | 'bolt' | 'other';
}

// Main RideSharing component
export const RideSharing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'newRide' | 'currentRide' | 'history'>('newRide');
  const [rideDetails, setRideDetails] = useState<RideDetails>({
    driverName: '',
    vehicleNumber: '',
    vehicleModel: '',
    driverAge: '',
    pickupLocation: '',
    destination: '',
    estimatedArrival: '',
    estimatedDuration: '',
    rideShareCompany: 'uber',
  });
  const [currentRide, setCurrentRide] = useState<RideDetails | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<{ name: string; phone: string }[]>([
    { name: 'Jane Smith', phone: '(555) 123-4567' },
    { name: 'John Doe', phone: '(555) 987-6543' }
  ]);

  const [tripHistory, setTripHistory] = useState<TripHistory[]>([
    {
      id: '1',
      date: '2023-04-10',
      time: '14:30',
      driverName: 'Michael Johnson',
      vehicleNumber: 'ABC 1234',
      vehicleModel: 'Toyota Camry',
      pickupLocation: '123 Main St',
      destination: '456 Oak Ave',
      tripDuration: '25 min',
      status: 'completed',
      rideShareCompany: 'uber'
    },
    {
      id: '2',
      date: '2023-04-05',
      time: '09:15',
      driverName: 'Sarah Williams',
      vehicleNumber: 'XYZ 5678',
      vehicleModel: 'Honda Civic',
      pickupLocation: '789 Pine Rd',
      destination: '321 Maple St',
      tripDuration: '15 min',
      status: 'completed',
      rideShareCompany: 'lyft'
    },
    {
      id: '3',
      date: '2023-04-01',
      time: '19:45',
      driverName: 'Robert Davis',
      vehicleNumber: 'DEF 9012',
      vehicleModel: 'Ford Escape',
      pickupLocation: '555 Cedar Ln',
      destination: '777 Elm Blvd',
      tripDuration: '35 min',
      status: 'cancelled',
      rideShareCompany: 'didi'
    }
  ]);

  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isSharingLocation, setIsSharingLocation] = useState(false);

  // Handler for submitting new ride details
  const handleSubmitRide = (e: React.FormEvent) => {
    e.preventDefault();
    // Add current timestamp
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const rideWithStartTime = {
      ...rideDetails,
      tripStartTime: formattedTime
    };
    
    // In a real app, this would send data to a server
    setCurrentRide(rideWithStartTime);
    setActiveTab('currentRide');
    
    // Simulate location sharing
    setIsSharingLocation(true);
    
    // Show confirmation
    alert('Your ride has been registered for safety tracking. Your emergency contacts will be notified if you initiate an emergency alert.');
  };

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRideDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for ending current ride
  const handleEndRide = () => {
    if (currentRide) {
      // Add to history
      const endTime = new Date();
      const startTime = new Date();
      startTime.setHours(
        parseInt(currentRide.tripStartTime?.split(':')[0] || '0'), 
        parseInt(currentRide.tripStartTime?.split(':')[1] || '0')
      );
      
      // Calculate duration
      const durationMs = endTime.getTime() - startTime.getTime();
      const durationMinutes = Math.round(durationMs / 60000);
      
      const newHistoryItem: TripHistory = {
        id: Date.now().toString(),
        date: endTime.toLocaleDateString(),
        time: currentRide.tripStartTime || endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        driverName: currentRide.driverName,
        vehicleNumber: currentRide.vehicleNumber,
        vehicleModel: currentRide.vehicleModel,
        pickupLocation: currentRide.pickupLocation,
        destination: currentRide.destination,
        tripDuration: `${durationMinutes} min`,
        status: 'completed',
        rideShareCompany: currentRide.rideShareCompany
      };
      
      setTripHistory(prev => [newHistoryItem, ...prev]);
      setCurrentRide(null);
      setIsSharingLocation(false);
      setActiveTab('history');
    }
  };

  // Handler for emergency button
  const handleEmergency = () => {
    setIsEmergencyModalOpen(true);
  };

  // Function to get company icon
  const getRideShareIcon = (company: string) => {
    switch (company) {
      case 'uber':
        return '🚗';
      case 'lyft':
        return '🚙';
      case 'didi':
        return '🚕';
      case 'bolt':
        return '🚖';
      default:
        return '🚘';
    }
  };

  // New Ride Form
  const NewRideForm = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Ride Safety Tracker</h2>
          <p className="opacity-90 mb-4">
            Enter your rideshare details below for safety monitoring during your trip.
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>Safety Monitoring</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center">
              <Share className="w-5 h-5 mr-2" />
              <span>Location Sharing</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              <span>Emergency Alerts</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmitRide} className="space-y-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 pb-2 border-b border-gray-200">Driver & Vehicle Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rideShareCompany" className="block text-sm font-medium text-gray-700 mb-1">Ride Share Company</label>
              <select
                id="rideShareCompany"
                name="rideShareCompany"
                value={rideDetails.rideShareCompany}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="uber">Uber</option>
                <option value="lyft">Lyft</option>
                <option value="didi">DiDi</option>
                <option value="bolt">Bolt</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="driverName" className="block text-sm font-medium text-gray-700 mb-1">Driver's Name</label>
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={rideDetails.driverName}
                onChange={handleInputChange}
                placeholder="John Smith"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">Vehicle License Plate</label>
              <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                value={rideDetails.vehicleNumber}
                onChange={handleInputChange}
                placeholder="ABC 1234"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label>
              <input
                type="text"
                id="vehicleModel"
                name="vehicleModel"
                value={rideDetails.vehicleModel}
                onChange={handleInputChange}
                placeholder="Toyota Camry"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="driverAge" className="block text-sm font-medium text-gray-700 mb-1">Driver's Age (if known)</label>
              <input
                type="text"
                id="driverAge"
                name="driverAge"
                value={rideDetails.driverAge}
                onChange={handleInputChange}
                placeholder="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <h3 className="font-medium text-gray-900 pb-2 border-b border-gray-200 mt-6">Trip Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
              <input
                type="text"
                id="pickupLocation"
                name="pickupLocation"
                value={rideDetails.pickupLocation}
                onChange={handleInputChange}
                placeholder="123 Main St"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={rideDetails.destination}
                onChange={handleInputChange}
                placeholder="456 Oak Ave"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="estimatedArrival" className="block text-sm font-medium text-gray-700 mb-1">Estimated Arrival Time</label>
              <input
                type="text"
                id="estimatedArrival"
                name="estimatedArrival"
                value={rideDetails.estimatedArrival}
                onChange={handleInputChange}
                placeholder="3:30 PM"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="estimatedDuration" className="block text-sm font-medium text-gray-700 mb-1">Estimated Trip Duration</label>
              <input
                type="text"
                id="estimatedDuration"
                name="estimatedDuration"
                value={rideDetails.estimatedDuration}
                onChange={handleInputChange}
                placeholder="25 minutes"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Emergency Contacts who will be notified</h4>
            <div className="space-y-2">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">{contact.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">{contact.phone}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-end">
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                Manage Contacts
              </button>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Car className="w-5 h-5 mr-2" />
              Start Ride Safety Tracking
            </button>
            
            <div className="text-sm text-gray-500 flex items-start">
              <Info className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
              <p>By tracking your ride, you can quickly alert emergency contacts if needed and share your trip details for added safety.</p>
            </div>
          </div>
        </form>
      </div>
    );
  };

  // Current Ride View
  const CurrentRideView = () => {
    if (!currentRide) return null;

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">Active Ride in Progress</h2>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Started at {currentRide.tripStartTime}</span>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">Tracking Active</span>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <button 
              onClick={handleEmergency}
              className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              Emergency
            </button>
            
            <button 
              onClick={handleEndRide}
              className="bg-white text-green-700 hover:bg-green-50 py-2 px-4 rounded-lg font-medium transition-colors flex items-center"
            >
              <Check className="w-5 h-5 mr-2" />
              End Ride
            </button>
            
            <button className="bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center">
              <Share className="w-5 h-5 mr-2" />
              Share Location
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-3">
                {getRideShareIcon(currentRide.rideShareCompany)}
              </div>
              <h3 className="font-semibold text-gray-900">{currentRide.rideShareCompany.charAt(0).toUpperCase() + currentRide.rideShareCompany.slice(1)} Ride</h3>
            </div>
            
            <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full flex items-center">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1 animate-pulse"></div>
              Active
            </span>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 rounded-full p-3 flex-shrink-0">
                <User className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">DRIVER</h4>
                <p className="font-medium text-gray-900">{currentRide.driverName}</p>
                {currentRide.driverAge && (
                  <p className="text-sm text-gray-600">Age: {currentRide.driverAge}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 rounded-full p-3 flex-shrink-0">
                <Car className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">VEHICLE</h4>
                <p className="font-medium text-gray-900">{currentRide.vehicleModel}</p>
                <p className="text-sm text-gray-600">License Plate: {currentRide.vehicleNumber}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 rounded-full p-3 flex-shrink-0">
                <MapPin className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">TRIP</h4>
                <div className="mt-1 space-y-1">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div className="h-8 w-0.5 bg-gray-300"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Pickup: {currentRide.pickupLocation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 flex items-center">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Destination: {currentRide.destination}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 rounded-full p-3 flex-shrink-0">
                <Clock className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">TIME</h4>
                <p className="font-medium text-gray-900">ETA: {currentRide.estimatedArrival}</p>
                <p className="text-sm text-gray-600">Duration: {currentRide.estimatedDuration}</p>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${isSharingLocation ? 'bg-green-500 animate-pulse' : 'bg-gray-400'} mr-2`}></div>
                <span className="text-sm text-gray-700">
                  {isSharingLocation ? 'Sharing location with emergency contacts' : 'Location sharing disabled'}
                </span>
              </div>
              
              <button 
                onClick={() => setIsSharingLocation(!isSharingLocation)}
                className={`px-3 py-1.5 text-sm rounded-lg flex items-center ${
                  isSharingLocation 
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSharingLocation ? (
                  <>
                    <X className="w-4 h-4 mr-1" />
                    Stop Sharing
                  </>
                ) : (
                  <>
                    <Share className="w-4 h-4 mr-1" />
                    Start Sharing
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Status updates */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-3">Ride Status Updates</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 flex-shrink-0 mr-3">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Trip started at {currentRide.tripStartTime}</p>
                <p className="text-xs text-gray-500">Driver verified, trip tracking activated</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0 mr-3">
                <Share className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Location sharing {isSharingLocation ? 'active' : 'inactive'}</p>
                <p className="text-xs text-gray-500">
                  {isSharingLocation 
                    ? 'Your emergency contacts can view your location' 
                    : 'Enable location sharing for better safety'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-yellow-100 rounded-full p-2 flex-shrink-0 mr-3">
                <Timer className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Estimated arrival: {currentRide.estimatedArrival}</p>
                <p className="text-xs text-gray-500">Trip monitoring active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Trip History View
  const HistoryView = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Recent Ride History</h3>
          
          <div className="space-y-4">
            {tripHistory.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-full p-3 inline-flex mb-3">
                  <Car className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500">No ride history available</p>
              </div>
            ) : (
              tripHistory.map(trip => (
                <div key={trip.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-3">
                        {getRideShareIcon(trip.rideShareCompany)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{trip.date} at {trip.time}</h4>
                        <p className="text-sm text-gray-600">{trip.pickupLocation} to {trip.destination}</p>
                      </div>
                    </div>
                    
                    <span className={`text-xs px-2.5 py-1 rounded-full ${
                      trip.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {trip.status === 'completed' ? 'Completed' : 'Cancelled'}
                    </span>
                  </div>
                  
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs text-gray-500 mb-1">DRIVER & VEHICLE</h5>
                      <p className="text-sm font-medium text-gray-900">{trip.driverName}</p>
                      <p className="text-sm text-gray-700">{trip.vehicleModel} ({trip.vehicleNumber})</p>
                    </div>
                    
                    <div>
                      <h5 className="text-xs text-gray-500 mb-1">TRIP DETAILS</h5>
                      <p className="text-sm font-medium text-gray-900">Duration: {trip.tripDuration}</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex justify-end">
                    <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                      <Info className="w-4 h-4 mr-1" />
                      Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // Emergency modal
  const EmergencyModal = () => {
    if (!isEmergencyModalOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="p-6 bg-red-600 rounded-t-lg text-white">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold">Emergency Alert</h3>
                <p className="opacity-90">Do you need emergency assistance?</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              Alert your emergency contacts and notify authorities of your current location and situation.
            </p>
            
            <div className="space-y-3">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Call 911
              </button>
              
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium flex items-center justify-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Alert Emergency Contacts
              </button>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center">
                <Share className="w-5 h-5 mr-2" />
                Share Live Location
              </button>
            </div>
            
            <div className="pt-3 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setIsEmergencyModalOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        <button
          onClick={() => setActiveTab('newRide')}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
            activeTab === 'newRide' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          New Ride
        </button>
        <button
          onClick={() => setActiveTab('currentRide')}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
            activeTab === 'currentRide' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
          }`}
          disabled={!currentRide}
        >
          Current Ride
          {currentRide && (
            <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
            activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          History
        </button>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'newRide' && <NewRideForm />}
      {activeTab === 'currentRide' && <CurrentRideView />}
      {activeTab === 'history' && <HistoryView />}
      
      {/* Emergency Modal */}
      <EmergencyModal />
    </div>
  );
};

export default RideSharing;