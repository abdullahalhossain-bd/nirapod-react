import { useState } from 'react';
import { 
  Heart, 
  UserCheck, 
  Moon, 
  MessageSquare, 
  ChevronRight,
  Activity,
  BookOpen
} from 'lucide-react';
import MentalHealth from './mental/MentalHealth';

interface MentalHealthCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color?: string;
  onClick?: () => void;
}

export const MentalHealthSection: React.FC = () => {
  const [showDetailView, setShowDetailView] = useState(false);
  
  const handleViewDetails = () => {
    setShowDetailView(true);
  };
  
  const handleBackToOverview = () => {
    setShowDetailView(false);
  };
  
  const MentalHealthCard: React.FC<MentalHealthCardProps> = ({
    icon: Icon,
    title,
    description,
    color = 'bg-gradient-to-br from-violet-500 to-purple-600',
    onClick
  }) => {
    return (
      <div 
        className={`rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow`}
        onClick={onClick}
      >
        <div className={`${color} p-5 text-white`}>
          <Icon className="w-8 h-8 mb-3" />
          <h3 className="font-semibold text-xl mb-1">{title}</h3>
          <p className="opacity-90 text-sm">{description}</p>
          
          <button className="mt-4 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm hover:bg-white/30 transition-colors flex items-center">
            Explore
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    );
  };
  
  // Overview of the mental health resources
  const MentalHealthOverview = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-md p-6 text-white mb-6">
          <h2 className="text-2xl font-semibold mb-2">Mental Health Support</h2>
          <p className="mb-4 opacity-90">
            Access professional mental health support, guided meditations, and self-care strategies.
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              24/7 Crisis Support
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3 flex items-center">
              <UserCheck className="w-5 h-5 mr-2" />
              Licensed Therapists
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3 flex items-center">
              <Moon className="w-5 h-5 mr-2" />
              Guided Meditation
            </div>
          </div>
          <button 
            onClick={handleViewDetails}
            className="mt-5 bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            View All Resources
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MentalHealthCard 
            icon={Heart}
            title="Crisis Support"
            description="Immediate assistance for mental health emergencies and crisis situations."
            color="bg-gradient-to-br from-red-500 to-red-600"
            onClick={handleViewDetails}
          />
          
          <MentalHealthCard 
            icon={UserCheck}
            title="Find a Therapist"
            description="Connect with licensed therapists and counselors in your area."
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            onClick={handleViewDetails}
          />
          
          <MentalHealthCard 
            icon={Moon}
            title="Guided Meditation"
            description="Reduce stress and anxiety with our guided meditation sessions."
            color="bg-gradient-to-br from-indigo-500 to-purple-600"
            onClick={handleViewDetails}
          />
          
          <MentalHealthCard 
            icon={BookOpen}
            title="Self-Care Activities"
            description="Simple activities to improve your mental wellbeing every day."
            color="bg-gradient-to-br from-green-500 to-emerald-600"
            onClick={handleViewDetails}
          />
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mt-6">
          <div className="flex items-start">
            <Activity className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Track Your Mental Wellbeing</h3>
              <p className="text-gray-600 text-sm mb-3">
                Monitor your mental health patterns and track progress with our easy-to-use tools.
              </p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center">
                Start Tracking
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
          <MentalHealth />
        </div>
      ) : (
        <MentalHealthOverview />
      )}
    </div>
  );
};

export default MentalHealthSection;