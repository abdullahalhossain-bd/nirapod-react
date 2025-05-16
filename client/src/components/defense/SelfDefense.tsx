import { useState } from 'react';
import { 
  Video, 
  FileText, 
  Download, 
  Phone, 
  Laptop, 
  ChevronRight, 
  Play, 
  BookOpen,
  Check,
  Users,
  Calendar,
  Clock,
  Search,
  Filter,
  Star,
  ArrowRight,
  Share2,
  Bookmark,
  ArrowUpRight
} from 'lucide-react';
// Import required components
import VideoTutorialDetail from './VideoTutorial';
import SafetyGuides from './SafetyGuides';
import SafetyResources from './SafetyResources';
import EmergencyContacts from './EmergencyContacts';

interface VideoTutorialProps {
  id: string;
  title: string;
  duration: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  views: number;
  rating: number;
  description: string;
}

interface GuideProps {
  id: string;
  title: string;
  type: 'pdf' | 'interactive' | 'article';
  pages: number;
  summary: string;
  lastUpdated: string;
}

interface ResourceProps {
  id: string;
  title: string;
  format: 'pdf' | 'doc' | 'audio' | 'video' | 'image';
  size: string;
  downloadCount: number;
}

interface ContactProps {
  id: string;
  name: string;
  type: 'personal' | 'emergency' | 'police' | 'medical';
  phone: string;
  location?: string;
  notes?: string;
}

const VideoTutorialCard: React.FC<{ tutorial: VideoTutorialProps }> = ({ tutorial }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-shadow hover:shadow-md">
      <div className="relative">
        <div className="aspect-video bg-gray-800 relative overflow-hidden">
          <img 
            src={tutorial.thumbnail} 
            alt={tutorial.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-3 text-white">
              <div className="flex items-center text-xs mb-1">
                <Clock className="w-3 h-3 mr-1" />
                <span>{tutorial.duration}</span>
                <span className="mx-2">•</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  tutorial.level === 'beginner' ? 'bg-green-600' : 
                  tutorial.level === 'intermediate' ? 'bg-yellow-600' : 
                  'bg-red-600'
                }`}>
                  {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
                </span>
              </div>
              <h3 className="font-medium line-clamp-1">{tutorial.title}</h3>
            </div>
          </div>
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600/90 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors">
            <Play className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">Instructor: {tutorial.instructor}</p>
            <div className="flex items-center mt-1">
              <div className="text-yellow-500 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3" fill={i < tutorial.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({tutorial.views} views)</span>
            </div>
          </div>
          <div className="flex space-x-1">
            <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GuideCard: React.FC<{ guide: GuideProps }> = ({ guide }) => {
  const typeIcon = {
    pdf: FileText,
    interactive: BookOpen,
    article: FileText
  }[guide.type];
  
  const TypeIcon = typeIcon;
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="rounded-lg bg-blue-50 p-2.5 mr-3">
          <TypeIcon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{guide.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{guide.summary}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <span className="inline-block px-2 py-0.5 bg-gray-100 rounded mr-2">
                {guide.pages} pages
              </span>
              <span>Updated: {guide.lastUpdated}</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
              Read
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourceCard: React.FC<{ resource: ResourceProps }> = ({ resource }) => {
  const formatIcons = {
    pdf: FileText,
    doc: FileText,
    audio: Video,
    video: Video,
    image: FileText
  };
  
  const FormatIcon = formatIcons[resource.format];
  
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="rounded-full bg-purple-50 p-2 mr-3">
          <FormatIcon className="w-4 h-4 text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 text-sm">{resource.title}</h3>
          <div className="flex items-center text-xs text-gray-500 mt-0.5">
            <span className="uppercase">{resource.format}</span>
            <span className="mx-1">•</span>
            <span>{resource.size}</span>
          </div>
        </div>
        <button className="bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs font-medium py-1 px-2 rounded transition-colors flex items-center">
          <Download className="w-3.5 h-3.5 mr-1" />
          Download
        </button>
      </div>
    </div>
  );
};

const ContactCard: React.FC<{ contact: ContactProps }> = ({ contact }) => {
  const typeColors = {
    personal: 'bg-blue-50 text-blue-700',
    emergency: 'bg-red-50 text-red-700',
    police: 'bg-indigo-50 text-indigo-700',
    medical: 'bg-green-50 text-green-700'
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium text-gray-900 mb-1">{contact.name}</h3>
          <div className="flex items-center mb-1">
            <span className={`text-xs px-2 py-0.5 rounded ${typeColors[contact.type]}`}>
              {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
            </span>
            {contact.location && (
              <span className="text-xs text-gray-500 ml-2">{contact.location}</span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-800">{contact.phone}</p>
          {contact.notes && (
            <p className="text-xs text-gray-500 mt-1">{contact.notes}</p>
          )}
        </div>
        <button className="h-fit bg-green-100 text-green-700 hover:bg-green-200 text-xs font-medium py-1 px-2 rounded transition-colors flex items-center">
          <Phone className="w-3.5 h-3.5 mr-1" />
          Call
        </button>
      </div>
    </div>
  );
};
const VideoTutorialSection: React.FC<{ tutorials: VideoTutorialProps[] }> = ({ tutorials }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Video Tutorials</h2>
        <div className="flex items-center space-x-2">
          <button className="text-sm text-gray-600 border border-gray-300 rounded-lg py-1 px-3 flex items-center">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </button>
          <button className="text-sm text-blue-600 font-medium flex items-center">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutorials.map((tutorial) => (
          <VideoTutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
};

const UpcomingTrainingCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-4 shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg mb-1">Upcoming Live Training</h3>
          <p className="opacity-90 mb-3">Join our certified instructors for a live virtual self-defense training session.</p>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex flex-col">
              <Calendar className="w-5 h-5 mb-1" />
              <span className="text-xs opacity-90">Apr 15</span>
            </div>
            <div className="flex flex-col">
              <Clock className="w-5 h-5 mb-1" />
              <span className="text-xs opacity-90">6:00 PM</span>
            </div>
            <div className="flex flex-col">
              <Users className="w-5 h-5 mb-1" />
              <span className="text-xs opacity-90">23 attending</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-white text-blue-700 hover:bg-blue-50 font-medium py-1.5 px-3 rounded-lg text-sm transition-colors">
              Register Now
            </button>
            <button className="bg-blue-600 text-white border border-blue-400 hover:bg-blue-700 font-medium py-1.5 px-3 rounded-lg text-sm transition-colors">
              Get Reminder
            </button>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg self-end">
          <Laptop className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

const CertificationPromoCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg p-4 shadow-md">
      <h3 className="font-semibold text-lg mb-1">Get Certified</h3>
      <p className="opacity-90 mb-3">Complete our comprehensive self-defense program and receive an official certification.</p>
      
      <div className="flex items-center space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((level) => (
          <div key={level} className={`w-8 h-8 rounded-full flex items-center justify-center ${level <= 2 ? 'bg-white text-indigo-700' : 'bg-indigo-500 border border-indigo-400'}`}>
            {level <= 2 ? <Check className="w-5 h-5" /> : level}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm">2/5 modules completed</span>
        <button className="bg-white text-indigo-700 hover:bg-indigo-50 font-medium py-1.5 px-3 rounded-lg text-sm transition-colors flex items-center">
          Continue
          <ArrowUpRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};



export const SelfDefense: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'tutorials' | 'guides' | 'resources' | 'contacts' | 'tutorialDetail'>('tutorials');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);
  
  const tutorials: VideoTutorialProps[] = [
    {
      id: '1',
      title: 'Basic Self-Defense Techniques for Beginners',
      duration: '18:45',
      instructor: 'Sarah Martinez',
      level: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=600&q=80',
      views: 12432,
      rating: 4.8,
      description: 'Learn the foundational self-defense techniques that everyone should know. This tutorial covers basic stances, blocks, and escapes.'
    },
    {
      id: '2',
      title: 'Situational Awareness Training',
      duration: '24:10',
      instructor: 'Michael Chen',
      level: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=600&q=80',
      views: 8765,
      rating: 4.6,
      description: 'Develop your situational awareness skills to identify and avoid potential threats before they become dangerous.'
    },
    {
      id: '3',
      title: 'Advanced Defense Against Multiple Attackers',
      duration: '32:20',
      instructor: 'James Wilson',
      level: 'advanced',
      thumbnail: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80',
      views: 5432,
      rating: 4.9,
      description: 'This advanced tutorial teaches techniques for defending yourself against multiple attackers in various scenarios.'
    },
    {
      id: '4',
      title: 'Street Safety Techniques',
      duration: '22:15',
      instructor: 'Elena Rodriguez',
      level: 'intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?auto=format&fit=crop&w=600&q=80',
      views: 7654,
      rating: 4.7,
      description: 'Learn practical self-defense techniques specifically designed for street safety and urban environments.'
    }
  ];
  
  const guides: GuideProps[] = [
    {
      id: '1',
      title: 'Complete Self-Defense Strategy Guide',
      type: 'pdf',
      pages: 42,
      summary: 'A comprehensive guide covering all aspects of personal self-defense strategy, preparation, and technique.',
      lastUpdated: 'Mar 15, 2025'
    },
    {
      id: '2',
      title: 'Interactive Emergency Response Trainer',
      type: 'interactive',
      pages: 18,
      summary: 'Step-by-step interactive scenarios that help you practice decision-making during emergency situations.',
      lastUpdated: 'Apr 2, 2025'
    },
    {
      id: '3',
      title: 'Personal Safety Checklist',
      type: 'pdf',
      pages: 12,
      summary: 'A printable checklist to help you assess and improve your personal safety in various environments.',
      lastUpdated: 'Mar 28, 2025'
    }
  ];
  
  const resources: ResourceProps[] = [
    {
      id: '1',
      title: 'Emergency Response Protocol Infographic',
      format: 'pdf',
      size: '2.4 MB',
      downloadCount: 1245
    },
    {
      id: '2',
      title: 'Self-Defense Technique Reference Cards',
      format: 'pdf',
      size: '3.8 MB',
      downloadCount: 978
    },
    {
      id: '3',
      title: 'Audio Guide: Verbal De-escalation Techniques',
      format: 'audio',
      size: '18.5 MB',
      downloadCount: 654
    },
    {
      id: '4',
      title: 'Home Security Assessment Form',
      format: 'doc',
      size: '1.2 MB',
      downloadCount: 432
    },
    {
      id: '5',
      title: 'Quick Reference: Emergency Contact Information',
      format: 'pdf',
      size: '0.8 MB',
      downloadCount: 1876
    }
  ];
  
  const contacts: ContactProps[] = [
    {
      id: '1',
      name: 'Emergency Services',
      type: 'emergency',
      phone: '911',
      notes: 'For immediate emergency assistance'
    },
    {
      id: '2',
      name: 'Local Police Department',
      type: 'police',
      phone: '(555) 123-4567',
      location: 'Main Street Station',
      notes: 'Non-emergency contact'
    },
    {
      id: '3',
      name: 'City Hospital',
      type: 'medical',
      phone: '(555) 987-6543',
      location: '501 Medical Center Drive',
      notes: 'Emergency room open 24/7'
    },
    {
      id: '4',
      name: 'Safety Buddy - John',
      type: 'personal',
      phone: '(555) 555-1234',
      notes: 'Primary safety contact'
    }
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter results based on the search query
    console.log('Searching for:', searchQuery);
  };
  
  const handleTutorialSelect = (tutorialId: string) => {
    setSelectedTutorial(tutorialId);
    setActiveSection('tutorialDetail');
  };
  
  // Updated VideoTutorialSection component with tutorial selection capability
  const VideoTutorialSectionWithSelect: React.FC<{ 
    tutorials: VideoTutorialProps[], 
    onSelect: (id: string) => void 
  }> = ({ tutorials, onSelect }) => {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Video Tutorials</h2>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-gray-600 border border-gray-300 rounded-lg py-1 px-3 flex items-center">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </button>
            <button className="text-sm text-blue-600 font-medium flex items-center">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} onClick={() => onSelect(tutorial.id)}>
              <VideoTutorialCard tutorial={tutorial} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {activeSection !== 'tutorialDetail' && (
        <>
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for tutorials, guides, resources..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
            <button
              onClick={() => setActiveSection('tutorials')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
                activeSection === 'tutorials' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Video Tutorials
            </button>
            <button
              onClick={() => setActiveSection('guides')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
                activeSection === 'guides' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Step-by-Step Guides
            </button>
            <button
              onClick={() => setActiveSection('resources')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
                activeSection === 'resources' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Safety Resources
            </button>
            <button
              onClick={() => setActiveSection('contacts')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
                activeSection === 'contacts' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Emergency Contacts
            </button>
          </div>
        </>
      )}
      
      {/* Content Sections */}
      {activeSection === 'tutorials' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <UpcomingTrainingCard />
            <CertificationPromoCard />
          </div>
          
          <VideoTutorialSectionWithSelect 
            tutorials={tutorials} 
            onSelect={handleTutorialSelect} 
          />
        </div>
      )}
      
      {activeSection === 'tutorialDetail' && (
        <div className="space-y-4">
          <button 
            onClick={() => setActiveSection('tutorials')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
            Back to Tutorials
          </button>
          <VideoTutorialDetail />
        </div>
      )}
      
      {activeSection === 'guides' && <SafetyGuides />}
      
      {activeSection === 'resources' && <SafetyResources />}
      
      {activeSection === 'contacts' && <EmergencyContacts />}
    </div>
  );
};

export default SelfDefense;