import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ambulance, 
  Route, 
  Hospital, 
  Users, 
  UserRound, 
  FileText, 
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/ambulances', icon: Ambulance, label: 'Ambulances' },
  { path: '/trips', icon: Route, label: 'Trips' },
  { path: '/hospitals', icon: Hospital, label: 'Hospitals' },
  { path: '/staff', icon: Users, label: 'Staff' },
  { path: '/patients', icon: UserRound, label: 'Patients' },
  { path: '/reports', icon: FileText, label: 'Reports' },
  { path: '/settings', icon: SettingsIcon, label: 'Settings' },
];

function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-blue-600">AMS</h1>
          </div>
          <nav className="mt-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                    isActive ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 w-64 p-4">
            <button className="flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 w-full">
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;