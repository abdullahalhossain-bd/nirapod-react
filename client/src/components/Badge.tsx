import React from 'react';
import { Shield } from 'lucide-react';

interface BadgeProps {
  value: number;
}

const Badge: React.FC<BadgeProps> = ({ value }) => {
  return (
    <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
      <Shield className="w-4 h-4 mr-1.5 text-blue-100" />
      <span className="font-medium">{value}</span>
    </div>
  );
};

export default Badge;
