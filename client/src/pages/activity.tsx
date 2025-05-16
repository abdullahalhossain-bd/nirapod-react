import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, Bell, Shield, Table, List, ArrowUpDown, ChevronDown, Calendar, Users, MapPin, AlertCircle, AlertTriangle, Filter, Home as HomeIcon, Map, UserCircle, Activity } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { NotificationCenter, Notification } from '@/components/NotificationCenter';
import { SOSConfirmDialog } from '@/components/SOSConfirmDialog';

interface SafetyDataItem {
  id: string;
  date: string;
  location: string;
  incidentType: string;
  status: 'resolved' | 'pending' | 'active';
  reportedBy: string;
  severity: 'low' | 'medium' | 'high';
}

const ActivityPage = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSOSDialogOpen, setIsSOSDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortField, setSortField] = useState<keyof SafetyDataItem>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [greeting, setGreeting] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

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

  // Sample safety data
  const [safetyData, setSafetyData] = useState<SafetyDataItem[]>([
    {
      id: '1',
      date: '2025-04-11',
      location: 'Downtown Area',
      incidentType: 'Suspicious Activity',
      status: 'active',
      reportedBy: 'Community Watch',
      severity: 'medium'
    },
    {
      id: '2',
      date: '2025-04-10',
      location: 'Central Park',
      incidentType: 'Theft Report',
      status: 'pending',
      reportedBy: 'Local Resident',
      severity: 'medium'
    },
    {
      id: '3',
      date: '2025-04-09',
      location: 'North District',
      incidentType: 'Street Light Outage',
      status: 'resolved',
      reportedBy: 'Safety Patrol',
      severity: 'low'
    },
    {
      id: '4',
      date: '2025-04-08',
      location: 'East Square',
      incidentType: 'Vandalism',
      status: 'resolved',
      reportedBy: 'Anonymous Report',
      severity: 'low'
    },
    {
      id: '5',
      date: '2025-04-08',
      location: 'South Beach',
      incidentType: 'Medical Emergency',
      status: 'resolved',
      reportedBy: 'First Responder',
      severity: 'high'
    },
    {
      id: '6',
      date: '2025-04-07',
      location: 'West Mall',
      incidentType: 'Suspicious Activity',
      status: 'pending',
      reportedBy: 'Security Camera',
      severity: 'medium'
    },
  ]);

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

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

  // Handle sorting
  const handleSort = (field: keyof SafetyDataItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort data
  const sortedData = [...safetyData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Get status badge styling
  const getStatusBadge = (status: SafetyDataItem['status']) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border border-green-200';
    }
  };

  // Get severity badge styling
  const getSeverityBadge = (severity: SafetyDataItem['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
    }
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

      {/* Page content */}
      <div className="p-4 pb-24 max-w-screen-xl mx-auto">
        {/* Table Header Section */}
        <div className="bg-white p-4 rounded-t-xl shadow-sm border border-gray-200 border-b-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Safety Incidents</h2>
              <p className="text-sm text-gray-500">
                {greeting}, Sarah. Here's your latest safety data.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setFilterOpen(!filterOpen)} 
                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg text-sm font-medium text-gray-700"
              >
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </button>
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`flex items-center px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4 mr-1" />
                  Grid
                </button>
                <button 
                  onClick={() => setViewMode('table')} 
                  className={`flex items-center px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Table className="w-4 h-4 mr-1" />
                  Table
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {filterOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                  <option value="">All Types</option>
                  <option value="suspicious">Suspicious Activity</option>
                  <option value="theft">Theft</option>
                  <option value="vandalism">Vandalism</option>
                  <option value="medical">Medical Emergency</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 3 months</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>
              <div className="md:col-span-3 flex justify-end gap-2">
                <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
                  Reset
                </button>
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('location')}
                    >
                      <div className="flex items-center">
                        Location
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('incidentType')}
                    >
                      <div className="flex items-center">
                        Incident Type
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('severity')}
                    >
                      <div className="flex items-center">
                        Severity
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.incidentType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityBadge(item.severity)}`}>
                          {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {sortedData.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.incidentType}</h3>
                    <p className="text-sm text-gray-500">{item.location}</p>
                    <p className="text-sm text-gray-500 mt-1">Reported by: {item.reportedBy}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityBadge(item.severity)}`}>
                      {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedData.length === 0 && (
          <div className="mt-4 bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No safety incidents</h3>
            <p className="text-sm text-gray-500 mb-4">There are no incidents matching your current filters.</p>
            <button 
              onClick={() => setFilterOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Adjust Filters
            </button>
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

export default ActivityPage;
