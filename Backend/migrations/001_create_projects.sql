-- Run this SQL in your Supabase Dashboard → SQL Editor

-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  image       TEXT,
  link        TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to READ projects (public portfolio)
CREATE POLICY "Public read access"
  ON projects
  FOR SELECT
  USING (true);

-- Allow only service_role (backend) to INSERT / UPDATE / DELETE
-- (When using the service key in your backend .env, this is automatically satisfied)
CREATE POLICY "Service role full access"
  ON projects
  FOR ALL
  USING (auth.role() = 'service_role');

-- Seed with initial projects (optional)
INSERT INTO projects (title, description, image, link) VALUES
  ('Space Portfolio',       'Space themed portfolio website showcasing my projects and skills.',              'projects/space_portfolio.jpg',     'https://space-portfolio-one-self.vercel.app/'),
  ('Mealmate',              'Mealmate is a social media platform for food lovers to share recipes.',         'projects/mealmate_banner.webp',    'https://github.com/aaditya7788/MealMate'),
  ('Manali Sliding Book',   'An interactive 3D sliding book showcasing the Tour of Manali.',                 'projects/ManaliSlidingBook.png',   'https://manali-slide-book.vercel.app/'),
  ('3D Model Landing Page', 'A landing page featuring a 3D model of a Robot, built with Spline.',           'projects/3dmodel.png',             'https://3d-model-landing-page-three.vercel.app/');
