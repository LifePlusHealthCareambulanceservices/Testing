import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Route, MapPin, Clock, AlertCircle } from 'lucide-react';

interface TripType {
  id: string;
  pickup_location: string;
  destination_location: string;
  status: string;
  priority_level: string;
  start_time: string;
  end_time: string;
  distance: number;
}

function Trips() {
  const { data: trips, isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          ambulances (vehicle_number),
          patients (first_name, last_name),
          hospitals (name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trips</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Schedule New Trip
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trip Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trips?.map((trip: any) => (
                <tr key={trip.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <Route className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <div className="font-medium">{trip.ambulances?.vehicle_number}</div>
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {trip.pickup_location} → {trip.destination_location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${trip.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        trip.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {trip.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${trip.priority_level === 'high' ? 'bg-red-100 text-red-800' : 
                        trip.priority_level === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {trip.priority_level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(trip.start_time).toLocaleTimeString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                    {trip.status !== 'completed' && (
                      <button className="text-red-600 hover:text-red-900">Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Trips;