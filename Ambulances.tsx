import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Ambulance, Plus, Edit, Trash2 } from 'lucide-react';

interface AmbulanceType {
  id: string;
  vehicle_number: string;
  model: string;
  year: number;
  status: string;
  last_maintenance_date: string;
  next_maintenance_date: string;
  equipment_list: any;
}

function Ambulances() {
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: ambulances, isLoading } = useQuery({
    queryKey: ['ambulances'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ambulances')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as AmbulanceType[];
    }
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ambulances</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Ambulance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ambulances?.map((ambulance) => (
          <div key={ambulance.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Ambulance className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">{ambulance.vehicle_number}</h3>
                  <p className="text-sm text-gray-600">{ambulance.model} ({ambulance.year})</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${ambulance.status === 'available' ? 'bg-green-100 text-green-800' : 
                  ambulance.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}`}>
                {ambulance.status}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="text-gray-500">Last Maintenance:</span>{' '}
                {new Date(ambulance.last_maintenance_date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Next Maintenance:</span>{' '}
                {new Date(ambulance.next_maintenance_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ambulances;