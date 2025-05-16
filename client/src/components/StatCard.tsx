import React from 'react';

interface StatCardProps {
  value: number;
  label: string;
  colorClass?: string;
  textClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  value, 
  label, 
  colorClass = "bg-blue-50", 
  textClass = "text-blue-600" 
}) => {
  return (
    <div className={`flex flex-col items-center p-4 rounded-lg ${colorClass}`}>
      <h3 className={`text-2xl font-bold ${textClass}`}>{value}</h3>
      <p className="text-xs text-gray-600 text-center mt-1">{label}</p>
    </div>
  );
};

export default StatCard;
