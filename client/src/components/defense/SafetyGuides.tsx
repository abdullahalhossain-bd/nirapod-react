import { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  Search, 
  Filter, 
  ArrowRight, 
  Eye, 
  Download, 
  Bookmark, 
  Share2, 
  FileText, 
  Globe,
  Home,
  AlertTriangle,
  Shield,
  MapPin,
  Camera,
  Zap,
  Users,
  Maximize,
  MessageSquare,
  ThumbsUp,
  Printer
} from 'lucide-react';

interface GuideCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  count: number;
}

interface GuideContent {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  author: string;
  lastUpdated: string;
  views: number;
  likes: number;
  sections: GuideSection[];
  resources: Resource[];
}

interface GuideSection {
  id: string;
  title: string;
  content: string;
  images?: string[];
  tips?: string[];
  warnings?: string[];
  videoUrl?: string;
}

interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'video' | 'checklist';
  url: string;
  size?: string;
}

const guideCategories: GuideCategory[] = [
  { id: '1', name: 'Basic Self-Defense', icon: Shield, color: 'blue', count: 12 },
  { id: '2', name: 'Situational Awareness', icon: Eye, color: 'purple', count: 8 },
  { id: '3', name: 'De-escalation', icon: MessageSquare, color: 'green', count: 5 },
  { id: '4', name: 'Home Security', icon: Home, color: 'yellow', count: 14 },
  { id: '5', name: 'Travel Safety', icon: Globe, color: 'red', count: 9 }
];

// Sample detailed guide content
const sampleGuideContent: GuideContent = {
  id: '1',
  title: 'Basic Self-Defense Moves for Beginners',
  description: 'Learn fundamental self-defense techniques that can be effective regardless of size or strength. This comprehensive guide covers proper stance, strikes, blocks, and escapes that are easy to learn and remember.',
  category: 'Basic Self-Defense',
  difficulty: 'beginner',
  estimatedTime: '15 minutes',
  author: 'Sarah Martinez',
  lastUpdated: 'March 15, 2025',
  views: 15422,
  likes: 947,
  sections: [
    {
      id: 's1',
      title: 'Proper Defensive Stance',
      content: `Your stance is the foundation of all self-defense techniques. A proper stance provides balance, mobility, and power generation.

Follow these steps to achieve a proper defensive stance:

1. Position your feet shoulder-width apart
2. Place your dominant foot slightly back (about 6-8 inches)
3. Bend your knees slightly to lower your center of gravity
4. Keep your weight distributed 60% on your front foot, 40% on your back foot
5. Raise your hands to protect your face, keeping elbows in to protect ribs
6. Tuck your chin slightly to protect your throat

Practice this stance until it becomes second nature. You should be able to move quickly in any direction from this position while maintaining balance.`,
      images: [
        'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80'
      ],
      tips: [
        'Practice shifting your weight between feet while maintaining the stance',
        'Try to move in all directions while keeping your hands up and balance centered',
        'Your stance should feel natural and comfortable, not rigid or forced'
      ]
    },
    {
      id: 's2',
      title: 'Palm Heel Strike',
      content: `The palm heel strike is one of the most effective basic strikes. It uses the hard base of your palm to deliver impact while protecting your fingers from injury.

To execute a proper palm heel strike:

1. Start from your defensive stance
2. Tighten your hand with fingers pulled back and slightly curled
3. Strike forward with the heel of your palm (the hard base area)
4. Aim for vulnerable areas: nose, chin, or chest
5. Pull back quickly to defensive position after striking

The advantage of the palm heel strike is that it's less likely to injure your hand compared to a closed fist, while still delivering significant force.`,
      images: [
        'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=600&q=80'
      ],
      tips: [
        'Practice on a cushion or pad to get used to the impact',
        'Focus on speed and proper form rather than power initially',
        'Keep your wrist straight and aligned with your forearm to prevent injury'
      ],
      warnings: [
        'Never practice strikes on another person without proper training and safety equipment',
        'Always start slowly and increase speed gradually as you gain confidence'
      ]
    },
    {
      id: 's3',
      title: 'Basic Wrist Escape',
      content: `Being grabbed by the wrist is a common scenario. This technique will help you escape from a same-side wrist grab (where someone grabs your right wrist with their right hand, or your left with their left).

To escape from a same-side wrist grab:

1. As soon as you're grabbed, rotate your grabbed hand so your thumb points down
2. Step slightly toward your attacker while rotating your wrist
3. Continue rotating your arm in an arc, moving your elbow up and over
4. The rotation breaks the grip at its weakest point (the attacker's thumb)
5. Immediately move back to create distance once free

This technique uses leverage and body mechanics rather than strength, making it effective regardless of size differences.`,
      images: [
        'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=600&q=80'
      ],
      tips: [
        'Practice slowly with a partner, gradually increasing speed',
        'Focus on the rotation motion rather than pulling away',
        'The escape should feel smooth, not forceful'
      ],
      videoUrl: 'https://example.com/videos/wrist-escape'
    },
    {
      id: 's4',
      title: 'Practice Routine',
      content: `To develop muscle memory for these techniques, establish a regular practice routine:

1. Practice the defensive stance for 2-3 minutes daily
2. Add 10-15 palm heel strikes on each side
3. Practice wrist escapes with a partner 5-10 times on each side
4. As you improve, gradually increase speed and resistance

Remember that self-defense is primarily about escaping danger, not engaging in prolonged fighting. Always prioritize creating distance and getting to safety when possible.`,
      tips: [
        'Practice in front of a mirror when possible to check your form',
        'Focus on smooth, controlled movements rather than speed initially',
        'Consistent short practice sessions are more effective than occasional long ones'
      ],
      warnings: [
        'These techniques are for educational purposes and emergency situations only',
        'Consider professional self-defense classes for comprehensive training'
      ]
    }
  ],
  resources: [
    {
      id: 'r1',
      name: 'Self-Defense Technique Printable Reference',
      type: 'pdf',
      url: '/resources/self-defense-reference.pdf',
      size: '2.4 MB'
    },
    {
      id: 'r2',
      name: 'Wrist Escape Video Demonstration',
      type: 'video',
      url: '/resources/wrist-escape-demo.mp4',
      size: '18.7 MB'
    },
    {
      id: 'r3',
      name: 'Practice Checklist',
      type: 'checklist',
      url: '/resources/practice-checklist.pdf',
      size: '0.8 MB'
    }
  ]
};

// Guides listing component
const GuidesList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // This would be populated from API in a real implementation
  const guides = [
    {
      id: '1',
      title: 'Basic Self-Defense Moves for Beginners',
      category: 'Basic Self-Defense',
      difficulty: 'beginner',
      description: 'Learn fundamental self-defense techniques that are effective regardless of size or strength.',
      imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80',
      author: 'Sarah Martinez',
      lastUpdated: 'March 15, 2025',
    },
    {
      id: '2',
      title: 'Developing Situational Awareness',
      category: 'Situational Awareness',
      difficulty: 'beginner',
      description: 'Train yourself to recognize potential threats before they become dangerous.',
      imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=600&q=80',
      author: 'Michael Chen',
      lastUpdated: 'April 2, 2025',
    },
    {
      id: '3',
      title: 'Verbal De-escalation Techniques',
      category: 'De-escalation',
      difficulty: 'intermediate',
      description: 'Learn how to defuse tense situations using effective communication strategies.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      author: 'David Wilson',
      lastUpdated: 'March 28, 2025',
    },
    {
      id: '4',
      title: 'Home Security Assessment',
      category: 'Home Security',
      difficulty: 'beginner',
      description: 'Step-by-step guide to evaluating and improving your home\'s security.',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-10058c1a00f1?auto=format&fit=crop&w=600&q=80',
      author: 'Jennifer Park',
      lastUpdated: 'March 5, 2025',
    },
    {
      id: '5',
      title: 'Travel Safety Protocols',
      category: 'Travel Safety',
      difficulty: 'intermediate',
      description: 'Essential safety practices for traveling locally and internationally.',
      imageUrl: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=600&q=80',
      author: 'Carlos Rodriguez',
      lastUpdated: 'April 10, 2025',
    },
    {
      id: '6',
      title: 'Advanced Home Security Systems',
      category: 'Home Security',
      difficulty: 'advanced',
      description: 'Comprehensive guide to modern home security technologies and integration.',
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80',
      author: 'Alicia Johnson',
      lastUpdated: 'March 22, 2025',
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter results or call an API
    console.log('Searching for:', searchQuery);
  };

  const filteredGuides = selectedCategory
    ? guides.filter(guide => guide.category === selectedCategory)
    : guides;

  const CategoryButton: React.FC<{ category: GuideCategory }> = ({ category }) => {
    const isSelected = selectedCategory === category.name;
    const Icon = category.icon;
    
    return (
      <button
        onClick={() => setSelectedCategory(isSelected ? null : category.name)}
        className={`flex items-center justify-between p-3 rounded-lg transition-all ${
          isSelected 
            ? `bg-${category.color}-100 text-${category.color}-800 border border-${category.color}-200` 
            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
        }`}
      >
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full bg-${category.color}-100 flex items-center justify-center mr-3`}>
            <Icon className={`w-4 h-4 text-${category.color}-600`} />
          </div>
          <span className="font-medium">{category.name}</span>
        </div>
        <span className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
          {category.count}
        </span>
      </button>
    );
  };

  const GuideCard: React.FC<{ guide: any }> = ({ guide }) => {
    const difficultyColors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          <img 
            src={guide.imageUrl} 
            alt={guide.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[guide.difficulty as keyof typeof difficultyColors]}`}>
              {guide.difficulty.charAt(0).toUpperCase() + guide.difficulty.slice(1)}
            </span>
          </div>
          <div className="absolute top-2 right-2 flex space-x-1">
            <button className="bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span className="mr-2">{guide.category}</span>
            <span>•</span>
            <span className="ml-2">Updated {guide.lastUpdated}</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">{guide.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{guide.description}</p>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              By {guide.author}
            </div>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center">
              View Guide
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
          <h2 className="font-semibold text-gray-900 mb-3">Categories</h2>
          <div className="space-y-2">
            {guideCategories.map(category => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-3">Filters</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Difficulty</label>
              <div className="space-y-1">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <label key={level} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Content Type</label>
              <div className="space-y-1">
                {['With Videos', 'Printable', 'Interactive'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Time to Complete</label>
              <div className="space-y-1">
                {['Under 15 min', '15-30 min', 'Over 30 min'].map((time) => (
                  <label key={time} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">{time}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Reset Filters
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search guides..."
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
            <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            {selectedCategory ? selectedCategory : 'All Safety Guides'}
          </h1>
          <p className="text-gray-600">
            Step-by-step guides to improve your personal safety knowledge and skills
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuides.map(guide => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Detailed guide view component
const GuideDetail: React.FC = () => {
  const guide = sampleGuideContent;
  const [currentSection, setCurrentSection] = useState(0);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Guide Header */}
      <div className="border-b border-gray-200">
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <button className="text-blue-600 hover:text-blue-700 font-medium mr-2">
              Guides
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
            <span>{guide.category}</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">{guide.title}</h1>
          <p className="text-gray-700 mb-4">{guide.description}</p>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>{guide.difficulty.charAt(0).toUpperCase() + guide.difficulty.slice(1)}</span>
            </div>
            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{guide.estimatedTime} read</span>
            </div>
            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              <span>{guide.views.toLocaleString()} views</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              By <span className="font-medium">{guide.author}</span> • Updated {guide.lastUpdated}
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full">
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-3 bg-gray-50 flex overflow-x-auto">
          {guide.sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(index)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 ${
                currentSection === index
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {index + 1}. {section.title}
            </button>
          ))}
        </div>
      </div>
      
      {/* Current Section Content */}
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {guide.sections[currentSection].title}
          </h2>
          
          <div className="prose prose-blue max-w-none mb-6">
            {guide.sections[currentSection].content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          {guide.sections[currentSection].images && (
            <div className="mb-6">
              {guide.sections[currentSection].images?.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-gray-200 mb-3">
                  <img src={image} alt={`Illustration for ${guide.sections[currentSection].title}`} className="w-full" />
                  <div className="p-2 bg-gray-50 text-sm text-gray-600 flex justify-between items-center">
                    <span>Figure {currentSection + 1}.{index + 1}</span>
                    <button className="text-blue-600 hover:text-blue-700 flex items-center">
                      <Maximize className="w-4 h-4 mr-1" />
                      Enlarge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {guide.sections[currentSection].tips && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <h3 className="text-blue-800 font-medium mb-2">Pro Tips</h3>
              <ul className="space-y-2">
                {guide.sections[currentSection].tips?.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <Zap className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <span className="text-blue-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {guide.sections[currentSection].warnings && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
              <h3 className="text-yellow-800 font-medium mb-2">Important Warnings</h3>
              <ul className="space-y-2">
                {guide.sections[currentSection].warnings?.map((warning, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0 mt-1" />
                    <span className="text-yellow-700">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {guide.sections[currentSection].videoUrl && (
            <div className="mb-6">
              <h3 className="text-gray-900 font-medium mb-2">Video Demonstration</h3>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-blue-600/90 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>
                {/* This would be a real video player in production */}
                <img 
                  src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=1200&q=80" 
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover rounded-lg opacity-70"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
        <button
          onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
          disabled={currentSection === 0}
          className={`px-4 py-2 rounded-lg flex items-center ${
            currentSection === 0
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
              : 'text-gray-700 bg-white hover:bg-gray-100'
          }`}
        >
          <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
          Previous
        </button>
        
        <div className="text-sm text-gray-600">
          {currentSection + 1} of {guide.sections.length}
        </div>
        
        <button
          onClick={() => setCurrentSection(prev => Math.min(guide.sections.length - 1, prev + 1))}
          disabled={currentSection === guide.sections.length - 1}
          className={`px-4 py-2 rounded-lg flex items-center ${
            currentSection === guide.sections.length - 1
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
              : 'text-white bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      
      {/* Additional Resources */}
      <div className="p-6 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guide.resources.map(resource => (
            <div
              key={resource.id}
              className="border border-gray-200 rounded-lg p-4 flex items-start hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 rounded-full mr-3 ${
                resource.type === 'pdf' ? 'bg-red-100' :
                resource.type === 'video' ? 'bg-blue-100' :
                resource.type === 'checklist' ? 'bg-green-100' :
                'bg-gray-100'
              }`}>
                {resource.type === 'pdf' ? <FileText className="w-6 h-6 text-red-600" /> :
                 resource.type === 'video' ? <Video className="w-6 h-6 text-blue-600" /> :
                 resource.type === 'checklist' ? <FileText className="w-6 h-6 text-green-600" /> :
                 <FileText className="w-6 h-6 text-gray-600" />}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{resource.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs text-gray-500">
                    {resource.type.toUpperCase()}{resource.size && ` • ${resource.size}`}
                  </div>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Was this guide helpful?</h3>
            <p className="text-sm text-gray-600">Your feedback helps us improve our content.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg transition-colors">
              <ThumbsUp className="w-5 h-5" />
              <span>Yes, it helped</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span>Send Feedback</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SafetyGuides: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  
  return (
    <div>
      {view === 'list' ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Safety Guides</h1>
            <button 
              onClick={() => setView('detail')}
              className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center"
            >
              View Example Guide
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <GuidesList />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => setView('list')}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
              Back to Guides
            </button>
          </div>
          <GuideDetail />
        </div>
      )}
    </div>
  );
};

export default SafetyGuides;