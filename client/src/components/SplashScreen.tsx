import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(onComplete, 500); // Give time for exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white animate-splash-fade-in">
      <div className="flex flex-col items-center">
        <div className="relative mb-4 animate-splash-logo">
          <div className="bg-blue-600 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 animate-splash-shine" />
            <Shield className="w-16 h-16 text-white" strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 animate-splash-text">Nirapod</h1>
        <p className="text-gray-500 mt-2 animate-splash-text-delay">Your Personal Safety Companion</p>
        
        {loading && (
          <div className="flex space-x-2 mt-8">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-splash-dot-1" />
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-splash-dot-2" />
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-splash-dot-3" />
          </div>
        )}
      </div>
    </div>
  );
};
