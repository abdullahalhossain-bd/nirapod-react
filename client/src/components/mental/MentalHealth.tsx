import { useState } from 'react';
import {
  Heart,
  UserCheck,
  Moon,
  UserPlus,
  ChevronRight,
  Phone,
  MapPin,
  MessageSquare,
  Calendar,
  Clock,
  Search,
  Filter,
  Plus,
  Star,
  Info,
  AlertTriangle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Headphones,
  Share2,
  ThumbsUp,
  Bookmark,
  FileText,
  MenuSquare,
  HelpCircle,
  BarChart,
  Bell,
  SkipBack,
  SkipForward,
  Check,
  Users,
  Video,
  MessageCircle,
  Calendar as CalendarIcon,
  Tag,
  Globe,
  Shield
} from 'lucide-react';

interface TherapistProps {
  id: string;
  name: string;
  specialty: string[];
  rating: number;
  reviewCount: number;
  availability: string;
  distance: string;
  address: string;
  phone: string;
  online: boolean;
  acceptingNew: boolean;
  insurances: string[];
  image?: string;
}

interface MeditationProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'sleep' | 'anxiety' | 'stress' | 'focus' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  isFeatured: boolean;
  imageUrl: string;
  audioUrl: string;
}

interface CrisisResourceProps {
  id: string;
  name: string;
  description: string;
  phone: string;
  available: '24/7' | 'weekdays' | 'weekends' | string;
  website?: string;
  category: 'suicide' | 'crisis' | 'domestic' | 'addiction' | 'youth' | 'general';
}

interface SelfCareActivityProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  steps: string[];
  benefits: string[];
}

// Support group interface
interface SupportGroupProps {
  id: string;
  name: string;
  category: string;
  schedule: string;
  format: 'online' | 'in-person' | 'hybrid';
  participants: number;
  description: string;
  facilitator: string;
  joinLink?: string;
  location?: string;
  tags: string[];
}

// Main MentalHealth component
export const MentalHealth: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'crisis' | 'therapists' | 'meditation' | 'selfcare' | 'groups'>('crisis');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeditation, setSelectedMeditation] = useState<string | null>(null);
  const [playingMeditation, setPlayingMeditation] = useState<boolean>(false);
  const [meditationTime, setMeditationTime] = useState<string>('00:00');
  const [meditationVolume, setMeditationVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // For therapist filtering
  const [specialtyFilter, setSpecialtyFilter] = useState<string[]>([]);
  const [insuranceFilter, setInsuranceFilter] = useState<string[]>([]);
  const [distanceFilter, setDistanceFilter] = useState<number>(25); // miles
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would perform API-based search
    console.log(`Searching for: ${searchQuery}`);
  };
  
  // Crisis resource section
  const CrisisSupport = () => {
    const crisisResources: CrisisResourceProps[] = [
      {
        id: '1',
        name: 'National Suicide Prevention Lifeline',
        description: 'Free and confidential support for people in distress, plus prevention and crisis resources.',
        phone: '1-800-273-8255',
        available: '24/7',
        website: 'suicidepreventionlifeline.org',
        category: 'suicide'
      },
      {
        id: '2',
        name: 'Crisis Text Line',
        description: 'Text HOME to 741741 to connect with a Crisis Counselor. Free 24/7 support.',
        phone: 'Text HOME to 741741',
        available: '24/7',
        website: 'crisistextline.org',
        category: 'crisis'
      },
      {
        id: '3',
        name: 'SAMHSA National Helpline',
        description: 'Treatment referral and information service for individuals facing mental health or substance use disorders.',
        phone: '1-800-662-4357',
        available: '24/7',
        website: 'samhsa.gov/find-help/national-helpline',
        category: 'addiction'
      },
      {
        id: '4',
        name: 'National Domestic Violence Hotline',
        description: 'Support, crisis intervention, safety planning, and referrals for survivors of domestic violence.',
        phone: '1-800-799-7233',
        available: '24/7',
        website: 'thehotline.org',
        category: 'domestic'
      },
      {
        id: '5',
        name: 'Trevor Project',
        description: 'Crisis intervention and suicide prevention services for LGBTQ young people under 25.',
        phone: '1-866-488-7386',
        available: '24/7',
        website: 'thetrevorproject.org',
        category: 'youth'
      }
    ];
    
    const handleEmergencyCall = (phoneNumber: string) => {
      // In a real app, this would use the device's phone capabilities
      alert(`In a real app, this would initiate a call to ${phoneNumber}`);
    };
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-lg p-6 text-white relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl mb-2">In Immediate Danger?</h3>
              <p className="text-white/90 mb-4">
                If you're experiencing thoughts of harming yourself or others, or are in immediate danger, please call emergency services right away.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleEmergencyCall('911')}
                  className="bg-white text-red-600 py-3 px-6 rounded-lg font-bold text-base shadow-lg hover:bg-red-50 transition-colors flex items-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 911 Now
                </button>
                <button className="bg-red-700 border border-red-400 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-800 transition-colors flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Crisis Text Line
                </button>
              </div>
              <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="text-white/90 text-sm">
                  <strong>Remember:</strong> If you are unable to safely call 911, you can text 911 in many areas. Text your location and the nature of your emergency.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">24/7 Crisis Support</h2>
          <p className="text-gray-600">
            These helplines provide free, confidential support from trained counselors who can help with various mental health challenges and crises.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            {crisisResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      resource.category === 'suicide' ? 'bg-red-100 text-red-800' :
                      resource.category === 'crisis' ? 'bg-orange-100 text-orange-800' :
                      resource.category === 'domestic' ? 'bg-purple-100 text-purple-800' :
                      resource.category === 'addiction' ? 'bg-blue-100 text-blue-800' :
                      resource.category === 'youth' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                  
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Available: {resource.available}</span>
                  </div>
                  
                  {resource.website && (
                    <div className="mb-3 text-sm">
                      <a 
                        href={`https://${resource.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {resource.website}
                      </a>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleEmergencyCall(resource.phone)}
                    className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {resource.phone}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-600 rounded-lg p-6 mt-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-80"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-start gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 flex-shrink-0">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-xl mb-2">24/7 Crisis Helpline - Access Now</h3>
                <p className="text-white/90 mb-4">
                  Our trained mental health professionals are available 24/7 through the app for immediate, confidential support and guidance during a crisis.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-white text-blue-700 py-3 px-6 rounded-lg font-medium text-base shadow-lg hover:bg-blue-50 transition-colors flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now (24/7)
                  </button>
                  <button className="bg-blue-800 border border-blue-300 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-900 transition-colors flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Live Chat Support
                  </button>
                </div>
                <div className="mt-4 flex items-center text-white/80 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Average response time: &lt;2 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Therapist finder section
  const TherapistFinder = () => {
    const therapists: TherapistProps[] = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        specialty: ['Anxiety', 'Depression', 'Trauma'],
        rating: 4.9,
        reviewCount: 127,
        availability: 'Available this week',
        distance: '2.3 miles',
        address: '123 Therapy Lane, Suite 101',
        phone: '(555) 123-4567',
        online: true,
        acceptingNew: true,
        insurances: ['Blue Cross', 'Aetna', 'United Healthcare'],
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=150&h=150&q=80'
      },
      {
        id: '2',
        name: 'Dr. Michael Rodriguez',
        specialty: ['Addiction', 'Family Therapy', 'LGBTQ+'],
        rating: 4.7,
        reviewCount: 93,
        availability: 'Next week',
        distance: '5.1 miles',
        address: '456 Wellness Blvd, Suite 210',
        phone: '(555) 234-5678',
        online: true,
        acceptingNew: true,
        insurances: ['Cigna', 'Kaiser', 'Medicare'],
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=150&h=150&q=80'
      },
      {
        id: '3',
        name: 'Dr. Emily Chen',
        specialty: ['Children', 'Adolescents', 'ADHD'],
        rating: 4.8,
        reviewCount: 116,
        availability: 'Available today',
        distance: '3.7 miles',
        address: '789 Healing Road',
        phone: '(555) 345-6789',
        online: true,
        acceptingNew: true,
        insurances: ['Blue Cross', 'Medicaid', 'Tricare'],
        image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=150&h=150&q=80'
      },
      {
        id: '4',
        name: 'Dr. James Wilson',
        specialty: ['Relationships', 'Grief', 'Depression'],
        rating: 4.6,
        reviewCount: 84,
        availability: 'Available this week',
        distance: '8.2 miles',
        address: '321 Mindful Street, Suite 45',
        phone: '(555) 456-7890',
        online: false,
        acceptingNew: true,
        insurances: ['Aetna', 'Cigna', 'Humana'],
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&h=150&q=80'
      }
    ];
    
    const formatSpecialties = (specialties: string[]) => {
      if (specialties.length === 0) return "";
      if (specialties.length === 1) return specialties[0];
      if (specialties.length === 2) return specialties.join(' & ');
      return `${specialties.slice(0, 2).join(', ')} & ${specialties.length - 2} more`;
    };
    
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, specialty, or location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
                <button 
                  type="button" 
                  className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                >
                  <Filter className="w-5 h-5 mr-1" />
                  Filters
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-700 mr-1">Quick filters:</span>
              <button 
                type="button" 
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                Available Today
              </button>
              <button 
                type="button" 
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                Online Sessions
              </button>
              <button 
                type="button" 
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                Accepting New Patients
              </button>
              <button 
                type="button" 
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                In-Network Insurance
              </button>
            </div>
          </form>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Therapists Near You</h2>
            <select className="text-sm border border-gray-300 rounded-lg p-2">
              <option value="distance">Closest</option>
              <option value="rating">Highest Rated</option>
              <option value="availability">Soonest Available</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {therapists.map(therapist => (
              <div key={therapist.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-32 sm:h-32 flex-shrink-0">
                      {therapist.image ? (
                        <img 
                          src={therapist.image} 
                          alt={therapist.name} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                          <UserCheck className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{therapist.name}</h3>
                          <p className="text-sm text-gray-600">{formatSpecialties(therapist.specialty)}</p>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                          <span className="font-medium">{therapist.rating}</span>
                          <span className="text-gray-500 text-sm">({therapist.reviewCount})</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{therapist.availability}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{therapist.distance}</span>
                        </div>
                        {therapist.online && (
                          <div className="flex items-center">
                            <MessageSquare className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700">Online sessions available</span>
                          </div>
                        )}
                        {therapist.acceptingNew && (
                          <div className="flex items-center">
                            <UserPlus className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700">Accepting new patients</span>
                          </div>
                        )}
                      </div>
                      
                      {therapist.insurances.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 mb-1">Insurance accepted:</p>
                          <div className="flex flex-wrap gap-1">
                            {therapist.insurances.map((insurance, index) => (
                              <span 
                                key={index} 
                                className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded"
                              >
                                {insurance}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                          Book Appointment
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                          <Phone className="w-4 h-4 mr-1.5" />
                          Call
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1.5" />
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-1.5" />
              Load More Therapists
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Function to toggle mute state
  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real app, this would also mute/unmute the actual audio
  };
  
  // Meditation section
  const MeditationGuide = () => {
    const meditations: MeditationProps[] = [
      {
        id: '1',
        title: 'Stress Relief Breathing',
        description: 'Guided breathing exercise to reduce stress and anxiety in moments of tension.',
        duration: '10 min',
        category: 'stress',
        level: 'beginner',
        isFeatured: true,
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
        audioUrl: 'https://example.com/meditations/stress-relief.mp3'
      },
      {
        id: '2',
        title: 'Deep Sleep Meditation',
        description: 'Calming meditation to help you unwind and prepare for a restful night\'s sleep.',
        duration: '20 min',
        category: 'sleep',
        level: 'all',
        isFeatured: true,
        imageUrl: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&w=600&q=80',
        audioUrl: 'https://example.com/meditations/deep-sleep.mp3'
      },
      {
        id: '3',
        title: 'Morning Mindfulness',
        description: 'Start your day with clarity and intention through this gentle guided meditation.',
        duration: '15 min',
        category: 'focus',
        level: 'beginner',
        isFeatured: false,
        imageUrl: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=600&q=80',
        audioUrl: 'https://example.com/meditations/morning.mp3'
      },
      {
        id: '4',
        title: 'Anxiety Relief',
        description: 'Guided meditation to help calm anxious thoughts and find inner peace.',
        duration: '18 min',
        category: 'anxiety',
        level: 'all',
        isFeatured: true,
        imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80',
        audioUrl: 'https://example.com/meditations/anxiety.mp3'
      },
      {
        id: '5',
        title: 'Body Scan Relaxation',
        description: 'Progressive relaxation technique to release tension throughout your body.',
        duration: '15 min',
        category: 'stress',
        level: 'intermediate',
        isFeatured: false,
        imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
        audioUrl: 'https://example.com/meditations/body-scan.mp3'
      },
      {
        id: '6',
        title: '5-Minute Calm',
        description: 'Quick meditation for busy moments when you need to center yourself.',
        duration: '5 min',
        category: 'general',
        level: 'beginner',
        isFeatured: false,
        imageUrl: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=600&q=80',
        audioUrl: 'https://example.com/meditations/quick-calm.mp3'
      }
    ];
    
    const filteredMeditations = selectedMeditation 
      ? meditations.filter(m => m.id === selectedMeditation) 
      : meditations;
    
    const handlePlayMeditation = (id: string) => {
      setSelectedMeditation(id);
      setPlayingMeditation(true);
      // In a real app, this would play the audio file
    };
    
    const handlePauseMeditation = () => {
      setPlayingMeditation(false);
      // In a real app, this would pause the audio
    };
    
    const handleResetMeditation = () => {
      setSelectedMeditation(null);
      setPlayingMeditation(false);
      setMeditationTime('00:00');
      // In a real app, this would stop the audio and reset
    };
    
    const selectedMeditationData = selectedMeditation 
      ? meditations.find(m => m.id === selectedMeditation)
      : null;
    
    const MeditationCard: React.FC<{ meditation: MeditationProps }> = ({ meditation }) => (
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        onClick={() => setSelectedMeditation(meditation.id)}
      >
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={meditation.imageUrl} 
            alt={meditation.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <div className="flex justify-between items-center w-full">
                <div>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    meditation.category === 'sleep' ? 'bg-blue-500/90' :
                    meditation.category === 'anxiety' ? 'bg-purple-500/90' :
                    meditation.category === 'stress' ? 'bg-red-500/90' :
                    meditation.category === 'focus' ? 'bg-green-500/90' :
                    'bg-gray-500/90'
                  }`}>
                    {meditation.category.charAt(0).toUpperCase() + meditation.category.slice(1)}
                  </span>
                  <span className="ml-2 text-xs">{meditation.duration}</span>
                </div>
                <button 
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayMeditation(meditation.id);
                  }}
                >
                  <Play className="w-4 h-4 text-white" />
                </button>
              </div>
              <h3 className="font-medium mt-1">{meditation.title}</h3>
            </div>
          </div>
        </div>
        
        <div className="p-3">
          <p className="text-sm text-gray-600 line-clamp-2">{meditation.description}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">{meditation.level.charAt(0).toUpperCase() + meditation.level.slice(1)}</span>
            <div className="flex space-x-1">
              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
      
    // Meditation player component
    const MeditationPlayer = () => {
      if (!selectedMeditationData) return null;
      
      return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
          <div className="relative">
            <img 
              src={selectedMeditationData.imageUrl} 
              alt={selectedMeditationData.title} 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 text-white">
                <h2 className="text-xl font-semibold">{selectedMeditationData.title}</h2>
                <div className="flex items-center mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded mr-2 ${
                    selectedMeditationData.category === 'sleep' ? 'bg-blue-500/90' :
                    selectedMeditationData.category === 'anxiety' ? 'bg-purple-500/90' :
                    selectedMeditationData.category === 'stress' ? 'bg-red-500/90' :
                    selectedMeditationData.category === 'focus' ? 'bg-green-500/90' :
                    'bg-gray-500/90'
                  }`}>
                    {selectedMeditationData.category.charAt(0).toUpperCase() + selectedMeditationData.category.slice(1)}
                  </span>
                  <span className="text-xs">{selectedMeditationData.duration}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-gray-600 mb-4">{selectedMeditationData.description}</p>
            
            {/* Audio player controls */}
            <div className="space-y-3">
              {/* Progress bar */}
              <div className="relative w-full h-1.5 bg-gray-200 rounded-full">
                <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full" style={{ width: '35%' }}></div>
                <div className="absolute top-0 w-3 h-3 bg-white border-2 border-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/4" style={{ left: '35%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{meditationTime}</span>
                <span className="text-sm text-gray-500">{selectedMeditationData.duration}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <button 
                    onClick={toggleMute}
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={meditationVolume} 
                    onChange={(e) => {
                      setMeditationVolume(parseInt(e.target.value));
                      if (parseInt(e.target.value) === 0) {
                        setIsMuted(true);
                      } else if (isMuted) {
                        setIsMuted(false);
                      }
                    }}
                    className="w-20 h-1 bg-gray-300 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={playingMeditation ? handlePauseMeditation : () => handlePlayMeditation(selectedMeditationData.id)}
                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    {playingMeditation ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
                
                <button 
                  onClick={handleResetMeditation}
                  className="px-3 py-1 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors flex items-center text-sm">
                  <Bookmark className="w-4 h-4 mr-1" />
                  Save
                </button>
                <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors flex items-center text-sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </button>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="w-5 h-5 text-blue-600 mr-1" />
                <span className="text-sm text-gray-600">247 people found this helpful</span>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    return (
      <div className="space-y-6">
        {selectedMeditation && <MeditationPlayer />}
        
        {!selectedMeditation && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 text-white">
              <h2 className="text-xl font-semibold mb-2">Guided Meditation</h2>
              <p className="mb-4 opacity-90">
                Explore our collection of guided meditations to reduce stress, improve focus, and enhance well-being.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Headphones className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">30+ Sessions</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Moon className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">Sleep Aid</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Heart className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">Stress Relief</span>
                </div>
              </div>
              <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                Explore All
              </button>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
          <div className="flex space-x-2">
            <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <select className="text-sm border border-gray-300 rounded-lg p-1">
              <option value="recommended">Recommended</option>
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="shortest">Shortest</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredMeditations.slice(0, 6).map(meditation => (
            <MeditationCard key={meditation.id} meditation={meditation} />
          ))}
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Meditation Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-blue-800 mb-2">Sleep & Relaxation</h3>
              <p className="text-sm text-blue-700 mb-3">Calming meditations to help you relax and get better sleep.</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-600">8 meditations</span>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center">
                  Explore
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-purple-800 mb-2">Anxiety Relief</h3>
              <p className="text-sm text-purple-700 mb-3">Guided sessions to calm anxiety and find inner peace.</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-purple-600">6 meditations</span>
                <button className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors flex items-center">
                  Explore
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-green-800 mb-2">Focus & Productivity</h3>
              <p className="text-sm text-green-700 mb-3">Meditations to sharpen your focus and boost productivity.</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-green-600">5 meditations</span>
                <button className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors flex items-center">
                  Explore
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-red-800 mb-2">Stress Management</h3>
              <p className="text-sm text-red-700 mb-3">Techniques to reduce stress and build resilience.</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-red-600">7 meditations</span>
                <button className="text-red-600 text-sm font-medium hover:text-red-800 transition-colors flex items-center">
                  Explore
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Self-care activities
  // Support Groups section
  const SupportGroups = () => {
    const supportGroups: SupportGroupProps[] = [
      {
        id: '1',
        name: 'Anxiety & Stress Support',
        category: 'Anxiety',
        schedule: 'Tuesdays & Thursdays, 7:00 PM',
        format: 'hybrid',
        participants: 24,
        description: 'A supportive community for those dealing with anxiety, stress, and panic disorders. Share experiences and coping strategies in a safe environment.',
        facilitator: 'Dr. Lisa Reynolds',
        joinLink: 'https://example.com/anxiety-support',
        location: 'Community Center, 456 Main St',
        tags: ['anxiety', 'stress', 'panic attacks', 'beginners welcome']
      },
      {
        id: '2',
        name: 'Depression Recovery',
        category: 'Depression',
        schedule: 'Mondays, 6:30 PM',
        format: 'online',
        participants: 18,
        description: 'For individuals navigating depression and seeking connection with others who understand. Focus on recovery strategies and mutual support.',
        facilitator: 'Mark Johnson, LCSW',
        joinLink: 'https://example.com/depression-group',
        tags: ['depression', 'recovery', 'mood disorders']
      },
      {
        id: '3',
        name: 'Grief & Loss Circle',
        category: 'Grief',
        schedule: 'Every other Saturday, 10:00 AM',
        format: 'in-person',
        participants: 15,
        description: 'A compassionate space for those experiencing grief and loss. Process emotions and find strength in shared experiences.',
        facilitator: 'Sarah Williams, LPC',
        location: 'Healing Center, 789 Oak Drive',
        tags: ['grief', 'loss', 'bereavement', 'healing']
      },
      {
        id: '4',
        name: 'LGBTQ+ Mental Health',
        category: 'Identity',
        schedule: 'Wednesdays, 7:30 PM',
        format: 'hybrid',
        participants: 20,
        description: 'A safe and affirming group for LGBTQ+ individuals to discuss mental health challenges specific to their experiences.',
        facilitator: 'Dr. Jordan Martinez',
        joinLink: 'https://example.com/lgbtq-support',
        location: 'Pride Center, 123 Rainbow Ave',
        tags: ['lgbtq', 'identity', 'safe space', 'affirmation']
      },
      {
        id: '5',
        name: 'Addiction Recovery Support',
        category: 'Addiction',
        schedule: 'Daily, 8:00 PM',
        format: 'hybrid',
        participants: 30,
        description: 'A judgment-free community supporting each other on the journey to recovery from substance use disorders.',
        facilitator: 'Michael Roberts, CADC',
        joinLink: 'https://example.com/recovery-support',
        location: 'Recovery Center, 555 Hope Street',
        tags: ['addiction', 'recovery', 'sobriety', 'substance use']
      },
      {
        id: '6',
        name: 'Parents Mental Health Group',
        category: 'Parenting',
        schedule: 'Every other Sunday, 4:00 PM',
        format: 'online',
        participants: 22,
        description: 'For parents navigating mental health challenges while raising children. Share struggles and strategies in a supportive environment.',
        facilitator: 'Emma Chen, LMFT',
        joinLink: 'https://example.com/parent-support',
        tags: ['parenting', 'family', 'balance', 'self-care']
      }
    ];
    
    const groupCategories = [
      { name: 'All Groups', count: supportGroups.length },
      { name: 'Anxiety', count: supportGroups.filter(g => g.category === 'Anxiety').length },
      { name: 'Depression', count: supportGroups.filter(g => g.category === 'Depression').length },
      { name: 'Grief', count: supportGroups.filter(g => g.category === 'Grief').length },
      { name: 'Addiction', count: supportGroups.filter(g => g.category === 'Addiction').length },
      { name: 'Identity', count: supportGroups.filter(g => g.category === 'Identity').length },
      { name: 'Parenting', count: supportGroups.filter(g => g.category === 'Parenting').length }
    ];
    
    const [selectedCategory, setSelectedCategory] = useState<string>('All Groups');
    const [selectedFormat, setSelectedFormat] = useState<string>('all');
    
    const getFormatIcon = (format: 'online' | 'in-person' | 'hybrid') => {
      switch (format) {
        case 'online':
          return <Video className="w-4 h-4 text-blue-600" />;
        case 'in-person':
          return <MapPin className="w-4 h-4 text-green-600" />;
        case 'hybrid':
          return <div className="flex space-x-1">
            <Video className="w-4 h-4 text-purple-600" />
            <MapPin className="w-4 h-4 text-purple-600" />
          </div>;
      }
    };
    
    const formatLabel = (format: 'online' | 'in-person' | 'hybrid') => {
      switch (format) {
        case 'online':
          return 'Online';
        case 'in-person':
          return 'In Person';
        case 'hybrid':
          return 'Online & In Person';
      }
    };
    
    const filteredGroups = supportGroups.filter(group => {
      // Filter by category
      if (selectedCategory !== 'All Groups' && group.category !== selectedCategory) {
        return false;
      }
      
      // Filter by format
      if (selectedFormat !== 'all' && group.format !== selectedFormat) {
        return false;
      }
      
      return true;
    });
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg shadow-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Support Group Communities</h2>
          <p className="mb-4 opacity-90">
            Connect anonymously with others facing similar challenges in facilitated group sessions.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3">
              <Users className="w-5 h-5" />
              <span>Join anonymously</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3">
              <Shield className="w-5 h-5" />
              <span>Professionally moderated</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3">
              <Video className="w-5 h-5" />
              <span>Online & in-person options</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filters */}
          <div className="md:w-1/4 space-y-5">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Group Categories</h3>
              <div className="space-y-2">
                {groupCategories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex justify-between items-center px-3 py-2 text-sm rounded-md ${
                      selectedCategory === category.name
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Meeting Format</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedFormat('all')}
                  className={`w-full flex justify-between items-center px-3 py-2 text-sm rounded-md ${
                    selectedFormat === 'all'
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>All Formats</span>
                </button>
                <button
                  onClick={() => setSelectedFormat('online')}
                  className={`w-full flex justify-between items-center px-3 py-2 text-sm rounded-md ${
                    selectedFormat === 'online'
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <Video className="w-4 h-4 mr-2" />
                    <span>Online Only</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedFormat('in-person')}
                  className={`w-full flex justify-between items-center px-3 py-2 text-sm rounded-md ${
                    selectedFormat === 'in-person'
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>In-Person Only</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedFormat('hybrid')}
                  className={`w-full flex justify-between items-center px-3 py-2 text-sm rounded-md ${
                    selectedFormat === 'hybrid'
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      <Video className="w-4 h-4" />
                      <MapPin className="w-4 h-4 -ml-1" />
                    </div>
                    <span>Hybrid</span>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Start a New Group</h3>
              <p className="text-blue-700 text-sm mb-3">
                Don't see a group that fits your needs? You can create a new one and invite others.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                <Plus className="w-4 h-4 mr-1" />
                Create Group
              </button>
            </div>
          </div>
          
          {/* Main content - group cards */}
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCategory === 'All Groups' ? 'All Support Groups' : `${selectedCategory} Support Groups`}
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <select className="text-sm border border-gray-300 rounded-lg p-1.5">
                  <option value="recommended">Recommended</option>
                  <option value="newest">Newest</option>
                  <option value="participants">Most Participants</option>
                </select>
              </div>
            </div>
            
            {filteredGroups.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any groups matching your current filters. Try changing your selection or create a new group.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors inline-flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Create New Group
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGroups.map(group => (
                  <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5">
                      <div className="flex justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{group.name}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <div className="flex items-center mr-4">
                              {getFormatIcon(group.format)}
                              <span className="ml-1">{formatLabel(group.format)}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1 text-gray-500" />
                              <span>{group.participants} participants</span>
                            </div>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                          {group.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{group.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{group.schedule}</span>
                        </div>
                        <div className="flex items-center">
                          <UserCheck className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{group.facilitator}</span>
                        </div>
                        {group.location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700 truncate">{group.location}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {group.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors">
                          Join Group
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Self-care activities section
  const SelfCareActivities = () => {
    const selfCareActivities: SelfCareActivityProps[] = [
      {
        id: '1',
        title: '5-Minute Mindful Breathing',
        description: 'A quick breathing exercise you can do anywhere to reduce stress and anxiety.',
        duration: '5 min',
        category: 'Stress Relief',
        steps: [
          'Find a comfortable seated position',
          'Close your eyes or maintain a soft gaze',
          'Breathe in slowly through your nose for 4 counts',
          'Hold your breath for 2 counts',
          'Exhale slowly through your mouth for 6 counts',
          'Repeat for 5 minutes'
        ],
        benefits: [
          'Reduces stress and anxiety',
          'Lowers heart rate',
          'Improves focus',
          'Can be done anywhere'
        ]
      },
      {
        id: '2',
        title: 'Gratitude Journaling',
        description: "A simple practice of writing down things you're grateful for to improve mood and outlook.",
        duration: '10 min',
        category: 'Positive Psychology',
        steps: [
          'Find a quiet space and take out a journal or paper',
          'Set a timer for 10 minutes',
          "Write down 3-5 things you're grateful for today",
          'For each item, write a few sentences about why it brings you gratitude',
          'Reflect on how these things make you feel'
        ],
        benefits: [
          'Increases positive emotions',
          'Improves sleep quality',
          'Reduces stress',
          'Builds resilience'
        ]
      },
      {
        id: '3',
        title: 'Progressive Muscle Relaxation',
        description: 'A technique to release physical tension by tensing and relaxing muscle groups.',
        duration: '15 min',
        category: 'Relaxation',
        steps: [
          'Find a comfortable position lying down',
          'Starting with your feet, tense the muscles for 5 seconds',
          'Release the tension and notice the relaxation for 10 seconds',
          'Move up to your calves, then thighs, and continue up through your body',
          'End with tensing and relaxing your facial muscles',
          'Take a few deep breaths to complete the practice'
        ],
        benefits: [
          'Reduces physical tension',
          'Helps with insomnia',
          'Lowers overall stress levels',
          'Increases body awareness'
        ]
      },
      {
        id: '4',
        title: 'Digital Detox Hour',
        description: 'Taking a break from screens to reduce mental fatigue and improve wellbeing.',
        duration: '60 min',
        category: 'Mental Clarity',
        steps: [
          'Set your devices to "Do Not Disturb" or turn them off completely',
          "Let others know you'll be unavailable",
          'Choose a non-digital activity you enjoy (reading, walking, crafting)',
          'Engage fully with your chosen activity for one hour',
          'Notice how you feel before returning to your devices'
        ],
        benefits: [
          'Reduces eye strain and mental fatigue',
          'Improves present moment awareness',
          'Enhances real-world connections',
          'Helps establish healthier technology habits'
        ]
      }
    ];
    
    const ActivityCard: React.FC<{ activity: SelfCareActivityProps }> = ({ activity }) => (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">{activity.title}</h3>
              <div className="flex items-center mt-1">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full mr-2">{activity.category}</span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.duration}
                </span>
              </div>
            </div>
            <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Steps:</h4>
              <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-600">
                {activity.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Benefits:</h4>
              <ul className="space-y-1">
                {activity.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <ThumbsUp className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-xs text-gray-500">{Math.floor(Math.random() * 200) + 50} people tried this</span>
            </div>
            <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Start Activity
            </button>
          </div>
        </div>
      </div>
    );
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Daily Self-Care</h2>
          <p className="mb-4 opacity-90">
            Simple activities to nurture your mental health and emotional wellbeing.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <BarChart className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Track Progress</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <Bell className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Reminders</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Schedule</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <Heart className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Favorites</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 bg-white text-green-700 px-3 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
              Today's Activities
            </button>
            <button className="flex-1 bg-green-700 text-white border border-green-400 px-3 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors">
              Create Custom
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Quick Self-Care Activities</h2>
          <div className="flex space-x-1">
            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">
              5-15 min
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
              All Activities
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selfCareActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
        
        <div className="mt-6 bg-blue-50 rounded-lg p-5 border border-blue-100">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <MenuSquare className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Personalized Self-Care Plan</h2>
              <p className="text-blue-700 mb-4">
                Create a customized self-care plan tailored to your needs, schedule, and mental health goals.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Create Your Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        <button
          onClick={() => setActiveSection('crisis')}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
            activeSection === 'crisis' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          Crisis Support
        </button>
        <button
          onClick={() => setActiveSection('therapists')}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
            activeSection === 'therapists' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          Find Therapists
        </button>
        <button
          onClick={() => setActiveSection('meditation')}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
            activeSection === 'meditation' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          Meditation
        </button>
        <button
          onClick={() => setActiveSection('selfcare')}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
            activeSection === 'selfcare' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          Self-Care
        </button>
        <button
          onClick={() => setActiveSection('groups')}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
            activeSection === 'groups' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          Support Groups
        </button>
      </div>
      
      {/* Content based on active section */}
      {activeSection === 'crisis' && <CrisisSupport />}
      {activeSection === 'therapists' && <TherapistFinder />}
      {activeSection === 'meditation' && <MeditationGuide />}
      {activeSection === 'selfcare' && <SelfCareActivities />}
      {activeSection === 'groups' && <SupportGroups />}
    </div>
  );
};

export default MentalHealth;