import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { UserRound, Phone, History, AlertCircle } from 'lucide-react';

interface PatientType {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  contact_number: string;
  emergency_contact: string;
  medical_history: any;
}

function Patients() {
  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PatientType[];
    }
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patients</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients?.map((patient) => (
          <div key={patient.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="bg-blue-50 p-3 rounded-full">
                  <UserRound className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">{patient.first_name} {patient.last_name}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(patient.date_of_birth).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {patient.contact_number}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <AlertCircle className="w-4 h-4 mr-2" />
                Emergency: {patient.emergency_contact}
              </div>
              {patient.medical_history && (
                <div className="flex items-start text-sm text-gray-600">
                  <History className="w-4 h-4 mr-2 mt-1" />
                  <div>
                    <div className="font-medium">Medical History</div>
                    <ul className="list-disc list-inside mt-1">
                      {Object.entries(patient.medical_history).map(([key, value]) => (
                        <li key={key}>{key}: {String(value)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Schedule Trip
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Patients;