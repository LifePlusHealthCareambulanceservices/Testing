import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { 
  BarChart3, 
  Download, 
  FileText, 
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function Reports() {
  const [dateRange, setDateRange] = useState('week');

  const { data: tripStats, isLoading } = useQuery({
    queryKey: ['tripStats', dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trips')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  const mockChartData = [
    { name: 'Mon', trips: 4 },
    { name: 'Tue', trips: 3 },
    { name: 'Wed', trips: 6 },
    { name: 'Thu', trips: 4 },
    { name: 'Fri', trips: 5 },
    { name: 'Sat', trips: 3 },
    { name: 'Sun', trips: 2 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex space-x-4">
          <select 
            className="bg-white border border-gray-300 rounded-lg px-4 py-2"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Trips</p>
              <h3 className="text-2xl font-bold mt-1">156</h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>12% vs last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Revenue</p>
              <h3 className="text-2xl font-bold mt-1">$24,500</h3>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>8% vs last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Response Time</p>
              <h3 className="text-2xl font-bold mt-1">12 min</h3>
            </div>
            <div className="bg-yellow-50 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-red-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>2 min slower</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Patient Satisfaction</p>
              <h3 className="text-2xl font-bold mt-1">4.8/5</h3>
            </div>
            <div className="bg-purple-50 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>0.2 increase</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Trip Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="trips" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-medium">Monthly Performance Report</h4>
                    <p className="text-sm text-gray-600">Generated on March {i}, 2024</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;