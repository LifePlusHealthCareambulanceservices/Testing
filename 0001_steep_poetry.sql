/*
  # Initial Schema for Ambulance Management System

  1. New Tables
    - `ambulances`
      - Basic ambulance information and status
    - `staff`
      - Staff/crew member details
    - `hospitals`
      - Partner hospital information
    - `trips`
      - Trip/service records
    - `maintenance_records`
      - Vehicle maintenance history
    - `patients`
      - Patient information
    - `billing`
      - Payment and billing records
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Ambulances table
CREATE TABLE IF NOT EXISTS ambulances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_number TEXT NOT NULL UNIQUE,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  last_maintenance_date TIMESTAMPTZ,
  next_maintenance_date TIMESTAMPTZ,
  equipment_list JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Staff table
CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL,
  license_number TEXT,
  contact_number TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Hospitals table
CREATE TABLE IF NOT EXISTS hospitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  email TEXT,
  coordinates POINT,
  partnership_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  contact_number TEXT,
  emergency_contact TEXT,
  medical_history JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Trips table
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ambulance_id uuid REFERENCES ambulances(id),
  patient_id uuid REFERENCES patients(id),
  hospital_id uuid REFERENCES hospitals(id),
  pickup_location TEXT NOT NULL,
  pickup_coordinates POINT,
  destination_location TEXT NOT NULL,
  destination_coordinates POINT,
  status TEXT DEFAULT 'scheduled',
  priority_level TEXT NOT NULL,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  distance DECIMAL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Maintenance Records table
CREATE TABLE IF NOT EXISTS maintenance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ambulance_id uuid REFERENCES ambulances(id),
  service_type TEXT NOT NULL,
  service_date TIMESTAMPTZ NOT NULL,
  cost DECIMAL,
  description TEXT,
  next_service_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Billing table
CREATE TABLE IF NOT EXISTS billing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id),
  patient_id uuid REFERENCES patients(id),
  amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_date TIMESTAMPTZ,
  invoice_number TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE ambulances ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated read access" ON ambulances
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON staff
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON hospitals
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON trips
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON maintenance_records
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON patients
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON billing
  FOR SELECT TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ambulances_status ON ambulances(status);
CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
CREATE INDEX IF NOT EXISTS idx_staff_role ON staff(role);
CREATE INDEX IF NOT EXISTS idx_billing_status ON billing(status);