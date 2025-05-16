import { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Settings, 
  Maximize, 
  ChevronRight, 
  CheckCircle, 
  BookOpen, 
  Languages, 
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  RotateCw,
  Save,
  AlertCircle,
  HelpCircle,
  Download
} from 'lucide-react';

interface VideoTutorialDetailProps {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  publishedDate: string;
  viewCount: number;
  rating: number;
  reviewCount: number;
  hasQuiz: boolean;
  hasCaptions: boolean;
  hasSlowMotion: boolean;
  supportedLanguages: string[];
}

const demoVideoTutorial: VideoTutorialDetailProps = {
  id: '1',
  title: 'Basic Self-Defense Techniques for Beginners',
  description: 'This comprehensive tutorial covers essential self-defense techniques that everyone should know. Learn proper stance, basic blocks, strikes, and escape maneuvers that can help you protect yourself in threatening situations. Our expert instructor breaks down each technique step by step, with slow-motion demonstrations to help you master the correct form and execution.',
  videoUrl: 'https://example.com/videos/basic-selfdefense',
  duration: '18:45',
  instructor: 'Sarah Martinez',
  level: 'beginner',
  category: 'Self-Defense',
  tags: ['basics', 'beginners', 'techniques', 'safety'],
  publishedDate: 'Apr 02, 2025',
  viewCount: 12432,
  rating: 4.8,
  reviewCount: 256,
  hasQuiz: true,
  hasCaptions: true,
  hasSlowMotion: true,
  supportedLanguages: ['English', 'Spanish', 'French', 'German', 'Japanese']
};

interface QuizQuestion {
  id: string;
  timeStamp: string; // MM:SS format
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
}

const demoQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    timeStamp: '04:30',
    question: 'What is the primary purpose of the basic stance demonstrated?',
    options: [
      'To appear intimidating to an attacker',
      'To prepare to strike with maximum force',
      'To maintain balance and stability',
      'To signal to others you need help'
    ],
    correctAnswer: 2,
    explanation: 'The basic stance is designed primarily to help you maintain balance and stability during a confrontation. This allows you to respond to threats from multiple directions and prevents you from being easily pushed or pulled off balance.'
  },
  {
    id: '2',
    timeStamp: '09:15',
    question: 'When executing a palm strike, which part of the hand should make contact?',
    options: [
      'The fingers',
      'The heel of the palm',
      'The side of the hand',
      'The knuckles'
    ],
    correctAnswer: 1,
    explanation: 'The heel of the palm is the safest and most effective part to use for a palm strike. It provides a hard surface that can deliver significant force while minimizing the risk of injury to your hand compared to striking with knuckles or fingers.'
  },
  {
    id: '3',
    timeStamp: '15:20',
    question: 'What should you do immediately after successfully breaking free from a grab?',
    options: [
      'Counterattack the assailant',
      'Call for help while maintaining visual contact',
      'Create distance and evaluate escape routes',
      'Take a defensive stance and wait'
    ],
    correctAnswer: 2,
    explanation: 'Your priority after breaking free should be creating distance between yourself and the threat, then quickly evaluating possible escape routes. Self-defense is primarily about ensuring your safety, not engaging further with an assailant.'
  }
];

interface PracticeScenario {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  setup: string;
  steps: string[];
  tips: string[];
}

const demoPracticeScenarios: PracticeScenario[] = [
  {
    id: '1',
    title: 'Wrist Grab Escape Practice',
    description: 'Practice escaping from different types of wrist grabs using the techniques demonstrated in the tutorial.',
    objectives: [
      'Master the circular escape motion',
      'Practice using proper body mechanics rather than just arm strength',
      'Develop muscle memory for quick response'
    ],
    setup: 'Work with a partner in a spacious area with soft flooring if possible. Take turns being the "defender" and the "grabber."',
    steps: [
      'Partner A grabs Partner B\'s wrist with moderate pressure (not causing pain)',
      'Partner B practices the escape technique demonstrated at 07:30 in the video',
      'Once successful, switch roles and repeat',
      'Gradually increase speed and pressure as technique improves',
      'Practice with both same-side and cross-body grabs'
    ],
    tips: [
      'Focus on technique rather than speed initially',
      'Communicate clearly with your partner about pressure levels',
      'The goal is learning, not competing or causing discomfort',
      'Practice regularly for muscle memory development'
    ]
  },
  {
    id: '2',
    title: 'Situational Awareness Drill',
    description: 'Practice the situational awareness techniques covered in the tutorial in various environments.',
    objectives: [
      'Develop habitual scanning of your environment',
      'Practice identifying potential escape routes',
      'Improve recognition of potential threat indicators'
    ],
    setup: 'This can be practiced during daily activities in public spaces. No partner is required.',
    steps: [
      'While in a public space, take a moment to pause and identify all exits',
      'Note potential barriers or obstacles between you and those exits',
      'Identify any secure areas or potential allies nearby',
      'Practice the 30-second assessment technique shown at 12:15 in the video',
      'Mentally rehearse your response to a potential threat'
    ],
    tips: [
      'Don\'t be obvious or make others uncomfortable while practicing',
      'Incorporate this into regular daily activities until it becomes habit',
      'Vary the locations where you practice to develop adaptability',
      'Remember that awareness itself is often a deterrent to potential threats'
    ]
  }
];

export const VideoTutorialDetail: React.FC = () => {
  const tutorial = demoVideoTutorial;
  const quizQuestions = demoQuizQuestions;
  const practiceScenarios = demoPracticeScenarios;
  
  const [activeTab, setActiveTab] = useState<'overview' | 'quizzes' | 'practice' | 'materials'>('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showSlowMotion, setShowSlowMotion] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
    if (parseInt(e.target.value) === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const handleSlowMotion = () => {
    setShowSlowMotion(true);
    setPlaybackSpeed(0.5);
    // In a real implementation, this would seek to the slow-motion section
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Video Player */}
      <div className="relative">
        <div className="aspect-video bg-black relative flex items-center justify-center">
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <button 
                onClick={togglePlay}
                className="w-20 h-20 bg-blue-600/90 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors z-10"
              >
                <Play className="w-10 h-10 ml-1" />
              </button>
              <h2 className="text-white text-lg font-semibold mt-6 max-w-md text-center px-4">{tutorial.title}</h2>
            </div>
          )}
          
          {/* Video Thumbnail/Placeholder */}
          <img 
            src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=1200&q=80" 
            alt="Tutorial thumbnail" 
            className={`w-full h-full object-cover ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* Captions (would be properly synced in a real implementation) */}
          {isPlaying && captionsEnabled && (
            <div className="absolute bottom-20 left-0 right-0 text-center">
              <div className="inline-block bg-black/75 text-white px-4 py-2 rounded text-sm max-w-md mx-auto">
                Remember to keep your weight centered and maintain your balance throughout this technique.
              </div>
            </div>
          )}
          
          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar */}
            <div className="relative w-full h-1.5 bg-gray-600 rounded-full mb-2 cursor-pointer">
              <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full" style={{ width: '35%' }}></div>
              {/* Quiz Markers */}
              {quizQuestions.map((quiz) => (
                <div 
                  key={quiz.id}
                  className="absolute top-0 w-2 h-2 bg-yellow-400 rounded-full transform -translate-y-1/4"
                  style={{ left: `${parseInt(quiz.timeStamp.split(':')[0]) / parseInt(tutorial.duration.split(':')[0]) * 100}%` }}
                  title={`Quiz: ${quiz.question}`}
                ></div>
              ))}
              {/* Current time indicator */}
              <div className="absolute top-0 w-3 h-3 bg-white border-2 border-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/4" style={{ left: '35%' }}></div>
            </div>
            
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <button onClick={togglePlay} className="p-1 hover:text-blue-400 transition-colors">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button className="p-1 hover:text-blue-400 transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button className="p-1 hover:text-blue-400 transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
                <div className="text-sm">{currentTime} / {tutorial.duration}</div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button onClick={toggleMute} className="p-1 hover:text-blue-400 transition-colors">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-500 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                  />
                </div>
                <button className="p-1 hover:text-blue-400 transition-colors relative group">
                  <Settings className="w-5 h-5" />
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-gray-900 rounded-lg p-2 w-48">
                    <div className="text-sm font-medium mb-2">Playback Speed</div>
                    <div className="flex justify-between space-x-1">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                        <button 
                          key={speed} 
                          className={`px-2 py-1 rounded ${playbackSpeed === speed ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} text-xs`}
                          onClick={() => setPlaybackSpeed(speed)}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-700 my-2 pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Captions</span>
                        <button 
                          onClick={() => setCaptionsEnabled(!captionsEnabled)}
                          className={`w-10 h-5 rounded-full ${captionsEnabled ? 'bg-blue-600' : 'bg-gray-600'} flex items-center transition-colors relative`}
                        >
                          <span className={`w-4 h-4 bg-white rounded-full absolute transition-transform ${captionsEnabled ? 'translate-x-5' : 'translate-x-1'}`}></span>
                        </button>
                      </div>
                      <div className="text-sm font-medium mb-1">Language</div>
                      <select 
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full bg-gray-700 text-white text-sm rounded px-2 py-1"
                      >
                        {tutorial.supportedLanguages.map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </button>
                <button className="p-1 hover:text-blue-400 transition-colors">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Special Action Bar */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-blue-50">
        <div className="flex space-x-4">
          <button 
            onClick={handleSlowMotion}
            className="flex items-center text-sm text-blue-700 hover:text-blue-800 transition-colors"
          >
            <RotateCw className="w-4 h-4 mr-1" />
            Show Slow-Motion
          </button>
          <button 
            onClick={() => setCaptionsEnabled(!captionsEnabled)}
            className="flex items-center text-sm text-blue-700 hover:text-blue-800 transition-colors"
          >
            {captionsEnabled ? (
              <>
                <MessageSquare className="w-4 h-4 mr-1" />
                Hide Captions
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4 mr-1" />
                Show Captions
              </>
            )}
          </button>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors">
            <ThumbsUp className="w-4 h-4 mr-1" />
            Helpful
          </button>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors">
            <ThumbsDown className="w-4 h-4 mr-1" />
            Not Helpful
          </button>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors">
            <Save className="w-4 h-4 mr-1" />
            Save
          </button>
        </div>
      </div>
      
      {/* Video Info */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">{tutorial.title}</h1>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <span className="mr-3">{tutorial.viewCount.toLocaleString()} views</span>
              <span className="mr-3">{tutorial.publishedDate}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                tutorial.level === 'beginner' ? 'bg-green-100 text-green-800' : 
                tutorial.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {tutorial.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <div className="text-yellow-500 flex mr-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(tutorial.rating) ? "text-yellow-500" : "text-gray-300"}>★</span>
                ))}
              </div>
              <span className="text-sm text-gray-600">{tutorial.rating} ({tutorial.reviewCount} reviews)</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Instructor: <span className="font-medium">{tutorial.instructor}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-700 mt-3">{tutorial.description}</p>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('quizzes')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'quizzes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Knowledge Checks
        </button>
        <button 
          onClick={() => setActiveTab('practice')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'practice' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Practice Scenarios
        </button>
        <button 
          onClick={() => setActiveTab('materials')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'materials' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Materials
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Proper stance and body positioning for optimal defense</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic striking techniques that require minimal strength</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Effective escape methods from common grabs and holds</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>How to use environmental awareness to avoid dangerous situations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Verbal de-escalation techniques to prevent physical confrontation</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Tutorial Contents</h2>
              <div className="space-y-3">
                <div className="flex justify-between hover:bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-3">1.</span>
                    <span>Introduction and Safety Guidelines</span>
                  </div>
                  <span className="text-sm text-gray-500">00:00 - 02:35</span>
                </div>
                <div className="flex justify-between hover:bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-3">2.</span>
                    <span>Foundational Stance and Movement</span>
                  </div>
                  <span className="text-sm text-gray-500">02:36 - 05:45</span>
                </div>
                <div className="flex justify-between hover:bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-3">3.</span>
                    <span>Basic Strikes and Blocks</span>
                  </div>
                  <span className="text-sm text-gray-500">05:46 - 09:30</span>
                </div>
                <div className="flex justify-between hover:bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-3">4.</span>
                    <span>Escaping Grabs and Holds</span>
                  </div>
                  <span className="text-sm text-gray-500">09:31 - 14:20</span>
                </div>
                <div className="flex justify-between hover:bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-3">5.</span>
                    <span>Situational Awareness Techniques</span>
                  </div>
                  <span className="text-sm text-gray-500">14:21 - 16:55</span>
                </div>
                <div className="flex justify-between hover:bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-3">6.</span>
                    <span>Recap and Practice Recommendations</span>
                  </div>
                  <span className="text-sm text-gray-500">16:56 - 18:45</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites and Recommendations</h2>
              <ul className="list-disc ml-5 space-y-1 text-gray-700">
                <li>No prior self-defense experience required</li>
                <li>Comfortable clothing and adequate space to practice movements</li>
                <li>A practice partner is recommended but not required</li>
                <li>Watch the entire tutorial before attempting techniques</li>
                <li>Practice regularly for muscle memory development</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'quizzes' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-blue-800 font-medium mb-1">Knowledge Checks</h3>
                  <p className="text-sm text-blue-700">
                    These questions appear during the tutorial to help reinforce key concepts. You can review them here and test your knowledge.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {quizQuestions.map((quiz, index) => (
                <div key={quiz.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 flex justify-between items-center border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">Question {index + 1}</h3>
                    <span className="text-sm text-gray-600">Appears at {quiz.timeStamp}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-900 font-medium mb-4">{quiz.question}</p>
                    
                    <div className="space-y-2 mb-6">
                      {quiz.options.map((option, optionIndex) => (
                        <div key={optionIndex} className={`flex items-center p-3 border rounded-lg ${
                          optionIndex === quiz.correctAnswer
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}>
                          <input
                            type="radio"
                            id={`question-${quiz.id}-option-${optionIndex}`}
                            name={`question-${quiz.id}`}
                            className="mr-3"
                            defaultChecked={optionIndex === quiz.correctAnswer}
                          />
                          <label htmlFor={`question-${quiz.id}-option-${optionIndex}`} className="flex-1">
                            {option}
                          </label>
                          {optionIndex === quiz.correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Explanation</h4>
                      <p className="text-sm text-gray-700">{quiz.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <BookOpen className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-purple-800 font-medium mb-1">Practice Makes Perfect</h3>
                  <p className="text-sm text-purple-700">
                    These scenarios help you apply the techniques learned in controlled settings. Practice regularly with a partner to build muscle memory.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {practiceScenarios.map((scenario) => (
                <div key={scenario.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900 text-lg">{scenario.title}</h3>
                    <p className="text-gray-700 mt-1">{scenario.description}</p>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Objectives</h4>
                      <ul className="list-disc ml-5 space-y-1 text-gray-700">
                        {scenario.objectives.map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Setup</h4>
                      <p className="text-gray-700">{scenario.setup}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Steps</h4>
                      <ol className="list-decimal ml-5 space-y-2 text-gray-700">
                        {scenario.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Tips</h4>
                      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                        <ul className="space-y-2">
                          {scenario.tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                              <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-yellow-800">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-2">Track Your Progress</h3>
              <p className="text-gray-700 mb-3">Record your practice sessions to monitor improvement over time.</p>
              
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Practice Journal
                </button>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Printable Practice Log
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'materials' && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Download className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-green-800 font-medium mb-1">Supplementary Materials</h3>
                  <p className="text-sm text-green-700">
                    Download these materials to enhance your learning experience. All resources are available offline once downloaded.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2.5 rounded-lg mr-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Technique Reference Guide</h3>
                    <p className="text-sm text-gray-600 mb-3">Illustrated PDF with detailed breakdowns of all techniques covered</p>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">PDF • 4.2 MB</span>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2.5 rounded-lg mr-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Practice Drill Cards</h3>
                    <p className="text-sm text-gray-600 mb-3">Printable cards with exercise drills to reinforce techniques</p>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">PDF • 1.8 MB</span>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2.5 rounded-lg mr-3">
                    <Video className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Slow-Motion Breakdowns</h3>
                    <p className="text-sm text-gray-600 mb-3">Isolated video clips of key techniques in slow motion</p>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">MP4 • 128 MB</span>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2.5 rounded-lg mr-3">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Safety Guidelines</h3>
                    <p className="text-sm text-gray-600 mb-3">Important safety information for practicing techniques</p>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">PDF • 0.6 MB</span>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Offline Access</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Save Tutorial for Offline Viewing</h4>
                    <p className="text-sm text-gray-600">Download the complete tutorial for access without internet</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Save Offline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTutorialDetail;