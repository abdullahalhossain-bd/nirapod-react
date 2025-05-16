import { useEffect } from 'react';
import { AlertTriangle, CheckSquare } from 'lucide-react';

interface SOSConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SOSConfirmDialog = ({ isOpen, onClose, onConfirm }: SOSConfirmDialogProps) => {
  // Prevent scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center transition-opacity duration-300">
      <div className="w-full max-w-md p-5 bg-white rounded-xl shadow-lg transform transition-all duration-300 scale-100 mx-4">
        <div className="text-center mb-5">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Emergency SOS Alert</h2>
          <p className="text-gray-600">Are you sure you want to trigger an emergency SOS alert?</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-5">
          <p className="text-sm text-gray-700 mb-3">This will:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <CheckSquare className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <span>Contact emergency services with your location</span>
            </li>
            <li className="flex items-start">
              <CheckSquare className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <span>Alert your emergency contacts</span>
            </li>
            <li className="flex items-start">
              <CheckSquare className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <span>Begin recording audio and video evidence</span>
            </li>
            <li className="flex items-start">
              <CheckSquare className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <span>Share your real-time location with authorities</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col space-y-3">
          <button 
            onClick={onConfirm}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Yes, Send SOS Alert
          </button>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
