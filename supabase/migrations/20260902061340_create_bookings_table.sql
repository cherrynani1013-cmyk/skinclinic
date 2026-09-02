/*
# Create bookings table for appointment requests

## Overview
Creates a `bookings` table to store appointment consultation requests submitted
from the website's booking form. The admin panel will read and manage these.

## New Tables

### `bookings`
- `id` (uuid, primary key, auto-generated)
- `full_name` (text, not null) — the patient's full name
- `phone` (text, not null) — contact phone number
- `email` (text, not null) — contact email address
- `treatment` (text, not null) — the treatment or consultation type selected
- `preferred_date` (date, not null) — the patient's preferred appointment date
- `notes` (text, nullable) — optional message about skin goals
- `status` (text, not null, default 'pending') — tracking status: pending, confirmed, contacted, cancelled
- `email_sent` (boolean, default false) — whether a confirmation email was sent
- `created_at` (timestamptz, default now()) — when the booking was submitted

## Security (RLS)

- Row Level Security is ENABLED on `bookings`.
- **Public insert**: anyone (anon + authenticated) can submit a booking request
  via the website form. This is the public contact form.
- **Authenticated read/update/delete**: only authenticated admin users can
  view, update status, or delete bookings. This protects patient data.
- No `user_id` column is needed because bookings are submitted by anonymous
  visitors (no patient login), and managed only by authenticated admins.

## Important Notes
1. The booking form on the website writes to this table using the anon key.
2. The admin panel reads/updates this table using an authenticated session.
3. The `status` column is constrained to valid values via a CHECK constraint.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  treatment text NOT NULL,
  preferred_date date NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'contacted', 'cancelled')),
  email_sent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public can insert new booking requests (the website form)
DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings"
ON bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated admin users can read bookings
DROP POLICY IF EXISTS "authenticated_select_bookings" ON bookings;
CREATE POLICY "authenticated_select_bookings"
ON bookings FOR SELECT
TO authenticated
USING (true);

-- Only authenticated admin users can update bookings (e.g. change status)
DROP POLICY IF EXISTS "authenticated_update_bookings" ON bookings;
CREATE POLICY "authenticated_update_bookings"
ON bookings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated admin users can delete bookings
DROP POLICY IF EXISTS "authenticated_delete_bookings" ON bookings;
CREATE POLICY "authenticated_delete_bookings"
ON bookings FOR DELETE
TO authenticated
USING (true);

-- Index for sorting by most recent first
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings (created_at DESC);
