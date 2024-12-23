import React from 'react';
import { 
  Ambulance, 
  Route, 
  Hospital, 
  Users,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const mockData = [
  { name: 'Jan', trips: 65 },
  { name: 'Feb', trips: 59 },
  { name: 'Mar', trips: 80 },
  { name: 'Apr', trips: 81 },
  { name: 'May', trips: 56 },
  { name: 'Jun', trips: 55 },
];

function StatCard({ icon: Icon, label, value, change, changeType }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="bg-blue-50 p-3 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <TrendingUp className={`w-4 h-4 ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`} />
        <span className={`ml-1 ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Ambulance}
          label="Active Ambulances"
          value="12"
          change="8% vs last month"
          changeType="up"
        />
        <StatCard
          icon={Route}
          label="Total Trips"
          value="156"
          change="12% vs last month"
          changeType="up"
        />
        <StatCard
          icon={Hospital}
          label="Partner Hospitals"
          value="8"
          change="2 new this month"
          changeType="up"
        />
        <StatCard
          icon={Users}
          label="Active Staff"
          value="24"
          change="3 new this month"
          changeType="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Trip Statistics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="trips" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start p-3 bg-gray-50 rounded">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium">Maintenance Required</h4>
                  <p className="text-sm text-gray-600">
                    Ambulance AMB-{i} is due for maintenance in 3 days
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors">
            Schedule New Trip
          </button>
          <button className="p-4 bg-green-50 rounded-lg text-green-600 hover:bg-green-100 transition-colors">
            Add New Ambulance
          </button>
          <button className="p-4 bg-purple-50 rounded-lg text-purple-600 hover:bg-purple-100 transition-colors">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;