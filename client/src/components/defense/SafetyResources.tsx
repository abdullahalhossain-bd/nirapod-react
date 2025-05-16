import { useState } from 'react';
import { 
  Download, 
  FileText, 
  Search, 
  Filter, 
  Check, 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  Home, 
  Smartphone, 
  Globe, 
  Users, 
  CloudLightning, 
  Radio,
  Phone,
  Mail,
  MapPin,
  Printer,
  Star,
  Eye,
  ChevronRight,
  ChevronDown,
  X
} from 'lucide-react';

interface ResourceType {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  count: number;
}

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'doc' | 'jpg' | 'mp3' | 'mp4' | 'ppt';
  category: string;
  downloadCount: number;
  size: string;
  lastUpdated: string;
  featured?: boolean;
  previewUrl?: string;
  downloadUrl: string;
}

// Sample resource types
const resourceTypes: ResourceType[] = [
  { id: '1', name: 'Emergency Contact Cards', icon: Phone, color: 'red', count: 6 },
  { id: '2', name: 'Safety Checklists', icon: CheckCircle, color: 'green', count: 12 },
  { id: '3', name: 'Home Security', icon: Home, color: 'blue', count: 8 },
  { id: '4', name: 'Travel Safety', icon: Globe, color: 'purple', count: 7 },
  { id: '5', name: 'Emergency Preparedness', icon: AlertTriangle, color: 'orange', count: 10 },
  { id: '6', name: 'Quick Reference', icon: FileText, color: 'indigo', count: 9 }
];

// Sample resources
const sampleResources: ResourceItem[] = [
  {
    id: '1',
    title: 'Emergency Contact Information Card',
    description: 'Printable wallet-sized card for essential emergency contacts',
    fileType: 'pdf',
    category: 'Emergency Contact Cards',
    downloadCount: 12845,
    size: '245 KB',
    lastUpdated: 'Apr 05, 2025',
    featured: true,
    downloadUrl: '/resources/emergency-contact-card.pdf'
  },
  {
    id: '2',
    title: 'Home Security Assessment Checklist',
    description: 'Comprehensive checklist to evaluate your home\'s security vulnerabilities',
    fileType: 'pdf',
    category: 'Safety Checklists',
    downloadCount: 8763,
    size: '1.2 MB',
    lastUpdated: 'Mar 28, 2025',
    featured: true,
    downloadUrl: '/resources/home-security-checklist.pdf'
  },
  {
    id: '3',
    title: 'Family Emergency Plan Template',
    description: 'Customizable template for creating a family emergency response plan',
    fileType: 'doc',
    category: 'Emergency Preparedness',
    downloadCount: 7452,
    size: '890 KB',
    lastUpdated: 'Apr 02, 2025',
    downloadUrl: '/resources/family-emergency-plan.docx'
  },
  {
    id: '4',
    title: 'Travel Safety Protocol Cards',
    description: 'Printable cards with safety protocols for different travel scenarios',
    fileType: 'pdf',
    category: 'Travel Safety',
    downloadCount: 5231,
    size: '1.8 MB',
    lastUpdated: 'Mar 15, 2025',
    downloadUrl: '/resources/travel-safety-cards.pdf'
  },
  {
    id: '5',
    title: 'Personal Safety Checklist',
    description: 'Daily checklist for personal safety habits and practices',
    fileType: 'pdf',
    category: 'Safety Checklists',
    downloadCount: 9874,
    size: '380 KB',
    lastUpdated: 'Apr 08, 2025',
    featured: true,
    downloadUrl: '/resources/personal-safety-checklist.pdf'
  },
  {
    id: '6',
    title: 'Home Security Quick Reference Guide',
    description: 'One-page reference sheet for home security best practices',
    fileType: 'pdf',
    category: 'Home Security',
    downloadCount: 6523,
    size: '420 KB',
    lastUpdated: 'Mar 25, 2025',
    downloadUrl: '/resources/home-security-reference.pdf'
  },
  {
    id: '7',
    title: 'Emergency Response Protocols',
    description: 'Step-by-step protocols for common emergency situations',
    fileType: 'pdf',
    category: 'Quick Reference',
    downloadCount: 11245,
    size: '1.4 MB',
    lastUpdated: 'Apr 01, 2025',
    downloadUrl: '/resources/emergency-protocols.pdf'
  },
  {
    id: '8',
    title: 'Community Safety Contact Directory',
    description: 'Template for creating a neighborhood safety contact list',
    fileType: 'doc',
    category: 'Emergency Contact Cards',
    downloadCount: 3452,
    size: '620 KB',
    lastUpdated: 'Mar 18, 2025',
    downloadUrl: '/resources/community-contacts.docx'
  },
  {
    id: '9',
    title: 'Travel Safety Audio Guide',
    description: 'Audio narration of key travel safety tips for on-the-go listening',
    fileType: 'mp3',
    category: 'Travel Safety',
    downloadCount: 2874,
    size: '18.2 MB',
    lastUpdated: 'Mar 30, 2025',
    downloadUrl: '/resources/travel-safety-audio.mp3'
  },
  {
    id: '10',
    title: 'Emergency Kit Supply Checklist',
    description: 'Comprehensive list of supplies for home emergency kits',
    fileType: 'pdf',
    category: 'Emergency Preparedness',
    downloadCount: 15632,
    size: '520 KB',
    lastUpdated: 'Apr 07, 2025',
    featured: true,
    downloadUrl: '/resources/emergency-kit-checklist.pdf'
  }
];

// Custom emergency contact card component
const EmergencyContactCardCreator: React.FC = () => {
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactRelation, setContactRelation] = useState('');
  const [contactType, setContactType] = useState('personal');
  
  const [contacts, setContacts] = useState<Array<{
    id: string;
    name: string;
    phone: string;
    email: string;
    relation: string;
    type: string;
  }>>([
    {
      id: '1',
      name: 'John Smith',
      phone: '(555) 123-4567',
      email: 'john@example.com',
      relation: 'Spouse',
      type: 'personal'
    },
    {
      id: '2',
      name: 'City Police Department',
      phone: '(555) 987-6543',
      email: 'police@citygov.org',
      relation: 'Law Enforcement',
      type: 'emergency'
    }
  ]);
  
  const addContact = () => {
    if (contactName && contactPhone) {
      setContacts([...contacts, {
        id: Date.now().toString(),
        name: contactName,
        phone: contactPhone,
        email: contactEmail,
        relation: contactRelation,
        type: contactType
      }]);
      
      // Reset form
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactRelation('');
    }
  };
  
  const removeContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  
  const generatePDF = () => {
    // In a real implementation, this would generate a downloadable PDF
    alert('In a real implementation, this would generate a downloadable custom emergency contact card PDF with your contacts.');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200 bg-blue-50">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Emergency Contact Card Creator</h2>
        <p className="text-sm text-gray-700">
          Create a personalized emergency contact card that you can print and carry with you. Add all your important contacts and customize the card layout.
        </p>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Contacts Form */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Add Emergency Contacts</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name*</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Enter contact name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship/Notes</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={contactRelation}
                  onChange={(e) => setContactRelation(e.target.value)}
                  placeholder="E.g., Spouse, Doctor, Neighbor"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={contactType}
                  onChange={(e) => setContactType(e.target.value)}
                >
                  <option value="personal">Personal</option>
                  <option value="medical">Medical</option>
                  <option value="emergency">Emergency Services</option>
                  <option value="work">Work</option>
                </select>
              </div>
              
              <button
                onClick={addContact}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Contact
              </button>
            </div>
          </div>
          
          {/* Preview */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Your Emergency Contacts</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <div className="text-center mb-4">
                <h4 className="font-bold text-lg text-gray-900">EMERGENCY CONTACT CARD</h4>
                <p className="text-sm text-gray-600">Keep this card with you at all times</p>
              </div>
              
              {contacts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No contacts added yet. Add contacts using the form.</p>
              ) : (
                <div className="space-y-3">
                  {contacts.map(contact => (
                    <div key={contact.id} className="flex justify-between items-start bg-white p-3 rounded-lg border border-gray-200">
                      <div>
                        <div className="flex items-center">
                          <h5 className="font-semibold text-gray-900">{contact.name}</h5>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            contact.type === 'emergency' ? 'bg-red-100 text-red-700' :
                            contact.type === 'medical' ? 'bg-green-100 text-green-700' :
                            contact.type === 'work' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{contact.phone}</p>
                        {contact.email && <p className="text-xs text-gray-600">{contact.email}</p>}
                        {contact.relation && <p className="text-xs text-gray-500 italic mt-1">{contact.relation}</p>}
                      </div>
                      <button
                        onClick={() => removeContact(contact.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Card Options</h4>
                <p className="text-sm text-gray-600">Customize your emergency contact card</p>
              </div>
              <button
                onClick={generatePDF}
                disabled={contacts.length === 0}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  contacts.length === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}
              >
                <Printer className="w-4 h-4 mr-2" />
                Generate Printable PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home security assessment tool
const HomeSecurityAssessment: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState(false);
  
  const sections = [
    {
      id: 'exterior',
      title: 'Exterior Security',
      questions: [
        { id: 'ext1', question: 'Are all entry doors solid core or metal?', options: ['Yes', 'No', 'Unsure'] },
        { id: 'ext2', question: 'Do all exterior doors have deadbolt locks?', options: ['Yes', 'No', 'Unsure'] },
        { id: 'ext3', question: 'Are door frames reinforced with strike plates and 3-inch screws?', options: ['Yes', 'No', 'Unsure'] },
        { id: 'ext4', question: 'Are sliding doors secured with secondary locks or bars?', options: ['Yes', 'No', 'Not Applicable'] },
        { id: 'ext5', question: 'Is exterior lighting adequate around all entry points?', options: ['Yes', 'No', 'Partial'] }
      ]
    },
    {
      id: 'windows',
      title: 'Windows & Visibility',
      questions: [
        { id: 'win1', question: 'Do all windows have functioning locks?', options: ['Yes', 'No', 'Some'] },
        { id: 'win2', question: 'Are ground-floor windows reinforced with security film or bars?', options: ['Yes', 'No', 'Some'] },
        { id: 'win3', question: 'Is landscaping maintained to eliminate hiding spots?', options: ['Yes', 'No', 'Partially'] },
        { id: 'win4', question: 'Do you have window break sensors or alarms?', options: ['Yes', 'No', 'Some windows'] }
      ]
    },
    {
      id: 'interior',
      title: 'Interior Security',
      questions: [
        { id: 'int1', question: 'Do you have a security system installed?', options: ['Yes', 'No', 'Partial system'] },
        { id: 'int2', question: 'Do you have smoke detectors on every level and in sleeping areas?', options: ['Yes', 'No', 'Some areas'] },
        { id: 'int3', question: 'Do you have carbon monoxide detectors installed?', options: ['Yes', 'No', 'Some areas'] },
        { id: 'int4', question: 'Do you have a safe for valuables and important documents?', options: ['Yes', 'No', 'Use alternative storage'] }
      ]
    }
  ];
  
  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };
  
  const calculateResults = () => {
    let score = 0;
    let total = 0;
    
    // Simple scoring - count all "Yes" answers
    Object.values(answers).forEach(answer => {
      total++;
      if (answer === 'Yes') score++;
    });
    
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    
    return {
      score,
      total,
      percentage,
      rating: percentage >= 80 ? 'Excellent' : 
              percentage >= 60 ? 'Good' : 
              percentage >= 40 ? 'Fair' : 'Needs Improvement'
    };
  };
  
  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };
  
  const isCurrentSectionComplete = () => {
    const currentQuestions = sections[currentSection].questions;
    return currentQuestions.every(q => answers[q.id]);
  };
  
  const results = calculateResults();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200 bg-blue-50">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Home Security Assessment Tool</h2>
        <p className="text-sm text-gray-700">
          Complete this assessment to identify security vulnerabilities in your home and receive customized recommendations for improvements.
        </p>
      </div>
      
      {!showResults ? (
        <div className="p-5">
          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Assessment Progress</span>
              <span className="text-sm text-gray-600">{currentSection + 1} of {sections.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Current section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{sections[currentSection].title}</h3>
            
            <div className="space-y-6 mb-8">
              {sections[currentSection].questions.map((q, index) => (
                <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-3">{index + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {q.options.map(option => (
                      <button
                        key={option}
                        className={`py-2 px-4 rounded-lg border ${
                          answers[q.id] === option
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        } transition-colors`}
                        onClick={() => handleAnswer(q.id, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevSection}
                className={`px-4 py-2 rounded-lg ${
                  currentSection === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors`}
                disabled={currentSection === 0}
              >
                Previous Section
              </button>
              
              <button
                onClick={nextSection}
                disabled={!isCurrentSectionComplete()}
                className={`px-4 py-2 rounded-lg ${
                  isCurrentSectionComplete()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                } transition-colors`}
              >
                {currentSection < sections.length - 1 ? 'Next Section' : 'View Results'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Assessment Results</h3>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Your Home Security Score</h4>
                <p className="text-gray-700 mb-2">Based on your responses to {results.total} questions</p>
                <div className="flex items-center">
                  <div className={`text-lg font-bold ${
                    results.percentage >= 80 ? 'text-green-600' :
                    results.percentage >= 60 ? 'text-blue-600' :
                    results.percentage >= 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {results.rating}
                  </div>
                  <div className="text-sm text-gray-600 ml-2">
                    ({results.score}/{results.total} points, {results.percentage}%)
                  </div>
                </div>
              </div>
              
              <div className="relative w-24 h-24 mt-4 sm:mt-0">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={
                      results.percentage >= 80 ? '#059669' :
                      results.percentage >= 60 ? '#2563EB' :
                      results.percentage >= 40 ? '#D97706' : '#DC2626'
                    }
                    strokeWidth="3"
                    strokeDasharray={`${results.percentage}, 100`}
                  />
                  <text x="18" y="20.35" className="text-5xl font-bold" textAnchor="middle" fill="#374151">
                    {results.percentage}%
                  </text>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 mb-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Recommendations</h4>
              <div className="space-y-3">
                {Object.entries(answers).filter(([_, value]) => value === 'No' || value === 'Unsure' || value === 'Some').map(([id, _]) => {
                  // Find the question
                  let question;
                  for (const section of sections) {
                    const found = section.questions.find(q => q.id === id);
                    if (found) {
                      question = found;
                      break;
                    }
                  }
                  
                  if (!question) return null;
                  
                  // Generate recommendation based on question
                  let recommendation;
                  if (id.startsWith('ext')) {
                    recommendation = `Consider upgrading your ${question.question.toLowerCase().includes('door') ? 'doors' : 'exterior security features'}`;
                  } else if (id.startsWith('win')) {
                    recommendation = `Improve window security and visibility around your home`;
                  } else if (id.startsWith('int')) {
                    recommendation = `Enhance your interior security measures and safety equipment`;
                  }
                  
                  return (
                    <div key={id} className="flex items-start bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-800 font-medium">{recommendation}</p>
                        <p className="text-sm text-yellow-700 mt-1">Based on your answer to: {question.question}</p>
                      </div>
                    </div>
                  );
                })}
                
                {Object.values(answers).every(value => value === 'Yes') && (
                  <div className="flex items-start bg-green-50 border border-green-100 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-green-800">Excellent! Your home appears to have strong security measures in place. Continue to maintain these security practices.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h4>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <button className="flex items-center justify-between w-full text-left">
                    <span className="font-medium text-gray-900">Download Detailed Assessment Report</span>
                    <Download className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
                <div className="p-4 border-b border-gray-200">
                  <button className="flex items-center justify-between w-full text-left">
                    <span className="font-medium text-gray-900">Print Security Improvement Checklist</span>
                    <Printer className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
                <div className="p-4">
                  <button className="flex items-center justify-between w-full text-left">
                    <span className="font-medium text-gray-900">Schedule a Professional Security Assessment</span>
                    <ChevronRight className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => {
              setShowResults(false);
              setCurrentSection(0);
              setAnswers({});
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Start New Assessment
          </button>
        </div>
      )}
    </div>
  );
};

// Resource preview component
const ResourcePreview: React.FC<{ resource: ResourceItem }> = ({ resource }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">{resource.title}</h3>
        <div className="flex space-x-2">
          <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full transition-colors">
            <Printer className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full transition-colors">
            <Star className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-5">
        {/* Document preview - this would be more sophisticated in a real implementation */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center mb-6">
          {resource.fileType === 'pdf' ? (
            <div className="flex flex-col items-center">
              <FileText className="w-16 h-16 text-red-600 mb-3" />
              <h3 className="text-xl font-bold text-gray-900">{resource.title}</h3>
              <p className="text-gray-600 mt-2 max-w-md mx-auto">{resource.description}</p>
              <div className="mt-4 flex justify-center">
                <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">PDF Document</div>
              </div>
            </div>
          ) : resource.fileType === 'doc' ? (
            <div className="flex flex-col items-center">
              <FileText className="w-16 h-16 text-blue-600 mb-3" />
              <h3 className="text-xl font-bold text-gray-900">{resource.title}</h3>
              <p className="text-gray-600 mt-2 max-w-md mx-auto">{resource.description}</p>
              <div className="mt-4 flex justify-center">
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Word Document</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FileText className="w-16 h-16 text-gray-600 mb-3" />
              <h3 className="text-xl font-bold text-gray-900">{resource.title}</h3>
              <p className="text-gray-600 mt-2 max-w-md mx-auto">{resource.description}</p>
              <div className="mt-4 flex justify-center">
                <div className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">{resource.fileType.toUpperCase()} File</div>
              </div>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">Preview not available. Download the file to view its contents.</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="text-gray-600 text-sm">Last updated: {resource.lastUpdated}</div>
            <div className="text-gray-600 text-sm mt-1">Downloaded {resource.downloadCount} times</div>
          </div>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download ({resource.size})
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component for downloadable resources
export const SafetyResources: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTool, setShowTool] = useState<'none' | 'contacts' | 'security'>('none');
  const [previewResource, setPreviewResource] = useState<ResourceItem | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter results or call an API
    console.log('Searching for:', searchQuery);
  };
  
  const filteredResources = selectedType
    ? sampleResources.filter(resource => resource.category === selectedType)
    : sampleResources;
  
  const featuredResources = sampleResources.filter(resource => resource.featured);
  
  const ResourceTypeButton: React.FC<{ type: ResourceType }> = ({ type }) => {
    const isSelected = selectedType === type.name;
    const Icon = type.icon;
    
    return (
      <button
        onClick={() => setSelectedType(isSelected ? null : type.name)}
        className={`flex items-center justify-between p-3 rounded-lg transition-all ${
          isSelected 
            ? `bg-${type.color}-100 text-${type.color}-800 border border-${type.color}-200` 
            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
        }`}
      >
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full bg-${type.color}-100 flex items-center justify-center mr-3`}>
            <Icon className={`w-4 h-4 text-${type.color}-600`} />
          </div>
          <span className="font-medium">{type.name}</span>
        </div>
        <span className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
          {type.count}
        </span>
      </button>
    );
  };
  
  const ResourceCard: React.FC<{ resource: ResourceItem }> = ({ resource }) => {
    const fileTypeIcons = {
      pdf: <FileText className="w-10 h-10 text-red-600" />,
      doc: <FileText className="w-10 h-10 text-blue-600" />,
      jpg: <FileText className="w-10 h-10 text-green-600" />,
      mp3: <FileText className="w-10 h-10 text-purple-600" />,
      mp4: <FileText className="w-10 h-10 text-indigo-600" />,
      ppt: <FileText className="w-10 h-10 text-orange-600" />
    };
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-4 flex">
          <div className="mr-4">
            {fileTypeIcons[resource.fileType as keyof typeof fileTypeIcons]}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{resource.title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{resource.description}</p>
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-2">{resource.category}</span>
              <span>•</span>
              <span className="mx-2">{resource.fileType.toUpperCase()}</span>
              <span>•</span>
              <span className="ml-2">{resource.size}</span>
            </div>
          </div>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <span>{resource.downloadCount.toLocaleString()} downloads</span>
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={() => setPreviewResource(resource)}
              className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1 text-sm flex items-center"
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </button>
            <button className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-1" />
              Download
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {previewResource ? (
        <div className="space-y-4">
          <button 
            onClick={() => setPreviewResource(null)}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
            Back to Resources
          </button>
          <ResourcePreview resource={previewResource} />
        </div>
      ) : showTool === 'contacts' ? (
        <div className="space-y-4">
          <button 
            onClick={() => setShowTool('none')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
            Back to Resources
          </button>
          <EmergencyContactCardCreator />
        </div>
      ) : showTool === 'security' ? (
        <div className="space-y-4">
          <button 
            onClick={() => setShowTool('none')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
            Back to Resources
          </button>
          <HomeSecurityAssessment />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Hero section with tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div 
              className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg shadow-md p-6 relative overflow-hidden"
              onClick={() => setShowTool('contacts')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-10 -mr-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -mb-8 -ml-8"></div>
              
              <div className="relative">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Create Custom Emergency Contact Cards</h3>
                <p className="text-blue-100 mb-4">Generate printable cards with your emergency contacts, medical information, and more.</p>
                
                <button className="bg-white text-blue-700 px-4 py-2 rounded-lg flex items-center hover:bg-blue-50 transition-colors">
                  <ChevronRight className="w-5 h-5 mr-1" />
                  Create Contacts Card
                </button>
              </div>
            </div>
            
            <div 
              className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-lg shadow-md p-6 relative overflow-hidden"
              onClick={() => setShowTool('security')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-10 -mr-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -mb-8 -ml-8"></div>
              
              <div className="relative">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Home className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Home Security Assessment Tool</h3>
                <p className="text-indigo-100 mb-4">Evaluate your home's security and get personalized recommendations for improvements.</p>
                
                <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg flex items-center hover:bg-indigo-50 transition-colors">
                  <ChevronRight className="w-5 h-5 mr-1" />
                  Start Assessment
                </button>
              </div>
            </div>
          </div>
          
          {/* Search and filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <form onSubmit={handleSearch} className="flex flex-1 gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search downloadable resources..."
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-semibold text-gray-900 mb-3">Resource Types</h2>
                <div className="space-y-2">
                  {resourceTypes.map(type => (
                    <ResourceTypeButton key={type.id} type={type} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-3">
              {selectedType ? (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedType}</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {filteredResources.map(resource => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Featured Resources</h2>
                    <p className="text-gray-600">Most popular downloadable safety resources</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {featuredResources.map(resource => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">All Resources</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {sampleResources.map(resource => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyResources;