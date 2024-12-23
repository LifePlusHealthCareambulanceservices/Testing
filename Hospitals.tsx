import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Hospital, Phone, Mail, MapPin } from 'lucide-react';

interface HospitalType {
  id: string;
  name: string;
  address: string;
  city: string;
  contact_number: string;
  email: string;
  partnership_status: string;
}

function Hospitals() {
  const { data: hospitals, isLoading } = useQuery({
    queryKey: ['hospitals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hospitals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as HospitalType[];
    }
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Partner Hospitals</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Hospital
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals?.map((hospital) => (
          <div key={hospital.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Hospital className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">{hospital.name}</h3>
                  <p className="text-sm text-gray-600">{hospital.city}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${hospital.partnership_status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {hospital.partnership_status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {hospital.address}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {hospital.contact_number}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {hospital.email}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hospitals;