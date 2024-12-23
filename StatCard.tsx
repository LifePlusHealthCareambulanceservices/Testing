import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down';
  iconBgColor?: string;
  iconColor?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  changeType = 'up',
  iconBgColor = 'bg-blue-50',
  iconColor = 'text-blue-600'
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`${iconBgColor} p-3 rounded-full`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      {change && (
        <div className={`mt-4 flex items-center ${
          changeType === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
          {changeType === 'up' ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}