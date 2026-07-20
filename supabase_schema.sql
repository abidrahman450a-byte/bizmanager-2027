-- Run this SQL in your Supabase SQL Editor to set up the database tables.

-- 1. Create Branches Table
CREATE TABLE branches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  manager TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Employees Table
CREATE TABLE employees (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  branch_id UUID REFERENCES branches(id),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT,
  status TEXT DEFAULT 'Active',
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  performance INTEGER DEFAULT 0,
  attendance_rate INTEGER DEFAULT 100,
  absent_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Inventory Table
CREATE TABLE inventory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  stock INTEGER DEFAULT 0,
  price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'In Stock',
  last_restocked TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Realtime
alter publication supabase_realtime add table branches;
alter publication supabase_realtime add table employees;
alter publication supabase_realtime add table inventory;
