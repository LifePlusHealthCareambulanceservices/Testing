import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

interface TripFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function TripForm({ onSubmit, onCancel }: TripFormProps) {
  const { register, handleSubmit } = useForm();

  const { data: ambulances } = useQuery({
    queryKey: ['available-ambulances'],
    queryFn: async () => {
      const { data } = await supabase
        .from('ambulances')
        .select('*')
        .eq('status', 'available');
      return data;
    }
  });

  const { data: hospitals } = useQuery({
    queryKey: ['hospitals'],
    queryFn: async () => {
      const { data } = await supabase
        .from('hospitals')
        .select('*')
        .eq('partnership_status', 'active');
      return data;
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ambulance
        </label>
        <select
          {...register('ambulance_id')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {ambulances?.map((ambulance) => (
            <option key={ambulance.id} value={ambulance.id}>
              {ambulance.vehicle_number} - {ambulance.model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Pickup Location
        </label>
        <input
          type="text"
          {...register('pickup_location')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Destination Hospital
        </label>
        <select
          {...register('hospital_id')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {hospitals?.map((hospital) => (
            <option key={hospital.id} value={hospital.id}>
              {hospital.name} - {hospital.city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Priority Level
        </label>
        <select
          {...register('priority_level')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
        >
          Schedule Trip
        </button>
      </div>
    </form>
  );
}