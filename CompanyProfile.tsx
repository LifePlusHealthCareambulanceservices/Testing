import React from 'react';

function CompanyProfile() {
  return (
    <div>
      <h2 className="text-lg font-medium">Company Profile</h2>
      <p className="mt-1 text-gray-500">
        Manage your company information and preferences
      </p>

      <form className="mt-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            defaultValue="Ambulance Management Services"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Business Address
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            defaultValue="123 Healthcare Street"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Email
          </label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            defaultValue="contact@ambulanceservices.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            defaultValue="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Business Hours
          </label>
          <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="time"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue="09:00"
            />
            <input
              type="time"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue="17:00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Emergency Contact
          </label>
          <input
            type="tel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            defaultValue="+1 (555) 999-8888"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyProfile;