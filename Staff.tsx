import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Users, Phone, Mail, Award } from 'lucide-react';

interface StaffMember {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  license_number: string;
  contact_number: string;
  email: string;
  status: string;
}

function Staff() {
  const { data: staffMembers, isLoading } = useQuery({
    queryKey: ['staff'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as StaffMember[];
    }
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Staff Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffMembers?.map((staff) => (
          <div key={staff.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">{staff.first_name} {staff.last_name}</h3>
                  <div className="flex items-center mt-1">
                    <Award className="w-4 h-4 text-gray-400 mr-1" />
                    <p className="text-sm text-gray-600">{staff.role}</p>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${staff.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {staff.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Award className="w-4 h-4 mr-2" />
                License: {staff.license_number}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {staff.contact_number}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {staff.email}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Staff;