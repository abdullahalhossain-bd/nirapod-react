import { useState } from 'react';
import { 
  Stethoscope, 
  ChevronFirst as FirstAid, 
  Clock, 
  Video as VideoCall, 
  Heart, 
  UserCheck, 
  Search, 
  ChevronRight, 
  Calendar, 
  Pill, 
  Thermometer, 
  Activity 
} from 'lucide-react';

interface HealthFeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: string;
  color?: string;
  onClick?: () => void;
}

const HealthFeatureCard: React.FC<HealthFeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  action = "Access Now",
  color = "blue",
  onClick
}) => (
  <div 
    className="feature-card bg-white rounded-xl p-5 shadow-soft hover:shadow-hover transition-shadow border border-gray-100"
    onClick={onClick}
  >
    <div className={`w-12 h-12 rounded-full bg-${color}-50 flex items-center justify-center mb-3`}>
      <Icon className={`w-6 h-6 text-${color}-600`} strokeWidth={1.5} />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <button className={`text-${color}-600 text-sm font-medium flex items-center group`}>
      {action}
      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

interface HealthProviderProps {
  name: string;
  type: string;
  distance: string;
  rating: number;
  address: string;
  phone: string;
  image?: string;
}

const HealthProvider: React.FC<HealthProviderProps> = ({
  name,
  type,
  distance,
  rating,
  address,
  phone,
  image
}) => (
  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex">
      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{type}</span>
          <span>{distance}</span>
          <div className="flex items-center">
            <span className="text-yellow-500">{'★'.repeat(rating)}</span>
            <span className="text-gray-300">{'★'.repeat(5 - rating)}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2">{address}</p>
      </div>
    </div>
    <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
      <button className="text-blue-600 text-sm font-medium flex items-center">
        <Calendar className="w-4 h-4 mr-1" />
        Book Appointment
      </button>
      <button className="text-green-600 text-sm font-medium flex items-center">
        <VideoCall className="w-4 h-4 mr-1" />
        Telemedicine
      </button>
    </div>
  </div>
);

interface MedicationReminderProps {
  name: string;
  time: string;
  dosage: string;
  instructions: string;
  status: 'upcoming' | 'taken' | 'missed';
}

const MedicationReminder: React.FC<MedicationReminderProps> = ({
  name,
  time,
  dosage,
  instructions,
  status
}) => {
  const statusColors = {
    upcoming: 'bg-blue-50 text-blue-700',
    taken: 'bg-green-50 text-green-700',
    missed: 'bg-red-50 text-red-700'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-3">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{dosage}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <span className="text-sm font-medium mt-1">{time}</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">{instructions}</p>
      <div className="flex space-x-2 mt-3">
        <button className="flex-1 bg-gray-100 text-gray-700 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          Skip
        </button>
        <button className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Mark as Taken
        </button>
      </div>
    </div>
  );
};

const HealthWellness = () => {
  const [activeSection, setActiveSection] = useState<'main' | 'healthcare' | 'firstaid' | 'medication' | 'telemedicine'>('main');
  const [searchQuery, setSearchQuery] = useState('');

  const healthProviders = [
    { id: '1', name: 'Dr. Sarah Williams', type: 'Family Medicine', distance: '0.5 miles', rating: 5, address: '123 Health St, Medical Center', phone: '(555) 123-4567' },
    { id: '2', name: 'City Hospital', type: 'Emergency Care', distance: '1.2 miles', rating: 4, address: '456 Hospital Ave, Medical District', phone: '(555) 987-6543' },
    { id: '3', name: 'Dr. Michael Chen', type: 'Urgent Care', distance: '0.8 miles', rating: 4, address: '789 Urgent Ln, Health Plaza', phone: '(555) 234-5678' },
  ];

  const medications = [
    { id: '1', name: 'Vitamin D', time: '8:00 AM', dosage: '1000 IU', instructions: 'Take with food', status: 'taken' as const },
    { id: '2', name: 'Allergy Medication', time: '12:00 PM', dosage: '10mg', instructions: 'Take with water', status: 'upcoming' as const },
    { id: '3', name: 'Pain Reliever', time: '6:00 PM', dosage: '500mg', instructions: 'Take as needed for pain', status: 'upcoming' as const },
  ];

  const firstAidGuides = [
    { id: '1', title: 'Basic First Aid', icon: FirstAid, color: 'red' },
    { id: '2', title: 'CPR Guide', icon: Heart, color: 'red' },
    { id: '3', title: 'Wound Care', icon: FirstAid, color: 'blue' },
    { id: '4', title: 'Burns Treatment', icon: Thermometer, color: 'orange' },
    { id: '5', title: 'Choking Response', icon: Activity, color: 'purple' },
    { id: '6', title: 'Allergic Reactions', icon: Pill, color: 'yellow' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter results or perform an API call
    console.log(`Searching for: ${searchQuery}`);
  };

  if (activeSection === 'healthcare') {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setActiveSection('main')}
            className="flex items-center text-blue-600 text-sm font-medium"
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Back
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Healthcare Directory</h2>
          <div className="w-16"></div> {/* For alignment */}
        </div>

        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search healthcare providers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button className="whitespace-nowrap px-3 py-1.5 text-sm bg-blue-600 text-white rounded-full">All Providers</button>
            <button className="whitespace-nowrap px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full">Hospitals</button>
            <button className="whitespace-nowrap px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full">Urgent Care</button>
            <button className="whitespace-nowrap px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full">Family Medicine</button>
            <button className="whitespace-nowrap px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full">Mental Health</button>
          </div>
        </div>

        <div className="space-y-4">
          {healthProviders.map(provider => (
            <HealthProvider
              key={provider.id}
              name={provider.name}
              type={provider.type}
              distance={provider.distance}
              rating={provider.rating}
              address={provider.address}
              phone={provider.phone}
            />
          ))}
        </div>
      </div>
    );
  }

  if (activeSection === 'firstaid') {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setActiveSection('main')}
            className="flex items-center text-blue-600 text-sm font-medium"
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Back
          </button>
          <h2 className="text-lg font-semibold text-gray-900">First Aid Guides</h2>
          <div className="w-16"></div> {/* For alignment */}
        </div>

        <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
          <h3 className="text-red-700 font-medium mb-1">Emergency Situation?</h3>
          <p className="text-sm text-red-600 mb-2">If this is a life-threatening emergency, call 911 immediately.</p>
          <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            Call Emergency Services
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {firstAidGuides.map(guide => (
            <div key={guide.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-full bg-${guide.color}-50 flex items-center justify-center mb-2`}>
                <guide.icon className={`w-6 h-6 text-${guide.color}-600`} />
              </div>
              <h3 className="text-sm font-medium text-gray-900">{guide.title}</h3>
              <button className="mt-2 text-xs text-blue-600">View Guide</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeSection === 'medication') {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setActiveSection('main')}
            className="flex items-center text-blue-600 text-sm font-medium"
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Back
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Medication Reminders</h2>
          <div className="w-16"></div> {/* For alignment */}
        </div>

        <div className="flex justify-end mb-4">
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Pill className="w-4 h-4 mr-1" />
            Add Medication
          </button>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <h3 className="text-blue-700 font-medium mb-1">Today's Schedule</h3>
          <p className="text-sm text-blue-600">You have 2 medications due today</p>
        </div>

        <div className="space-y-3">
          {medications.map(med => (
            <MedicationReminder
              key={med.id}
              name={med.name}
              time={med.time}
              dosage={med.dosage}
              instructions={med.instructions}
              status={med.status}
            />
          ))}
        </div>
      </div>
    );
  }

  if (activeSection === 'telemedicine') {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setActiveSection('main')}
            className="flex items-center text-blue-600 text-sm font-medium"
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Back
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Telemedicine</h2>
          <div className="w-16"></div> {/* For alignment */}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <h3 className="font-medium text-gray-900 mb-2">Available Now</h3>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {['General Health', 'Mental Health', 'Urgent Care', 'Pediatrics'].map((category, index) => (
              <button key={index} className="bg-gray-100 text-gray-700 text-sm rounded-lg py-2 hover:bg-gray-200 transition-colors">
                {category}
              </button>
            ))}
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
            <VideoCall className="w-4 h-4 mr-1" />
            Start Consultation
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-2">Upcoming Appointments</h3>
          <div className="border border-gray-100 rounded-lg p-3 mb-3">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Dr. Emily Chen</h4>
                <p className="text-xs text-gray-500">General Practitioner</p>
              </div>
              <span className="text-sm text-blue-600 font-medium">Apr 15, 3:00 PM</span>
            </div>
            <div className="flex space-x-2 mt-3">
              <button className="flex-1 bg-gray-100 text-gray-700 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                Reschedule
              </button>
              <button className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                Join Call
              </button>
            </div>
          </div>
          <button className="w-full border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Schedule New Appointment
          </button>
        </div>
      </div>
    );
  }

  // Main view (activeSection === 'main')
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <HealthFeatureCard
        icon={Stethoscope}
        title="Healthcare Directory"
        description="Find verified healthcare providers near you"
        color="blue"
        onClick={() => setActiveSection('healthcare')}
      />
      <HealthFeatureCard
        icon={FirstAid}
        title="First Aid Guides"
        description="Step-by-step emergency medical guidance"
        color="red"
        onClick={() => setActiveSection('firstaid')}
      />
      <HealthFeatureCard
        icon={Clock}
        title="Medication Reminders"
        description="Set up alerts for medication schedules"
        color="purple"
        onClick={() => setActiveSection('medication')}
      />
      <HealthFeatureCard
        icon={VideoCall}
        title="Telemedicine"
        description="Book virtual consultations with doctors"
        color="green"
        onClick={() => setActiveSection('telemedicine')}
      />
    </div>
  );
};

export default HealthWellness;