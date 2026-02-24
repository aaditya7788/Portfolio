-- ════════════════════════════════════════════════════════════════════
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ════════════════════════════════════════════════════════════════════

-- ─── 1. Disable RLS on projects (it's a public portfolio — no user auth needed) ─
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- ─── 2. Settings table (stores resume URL) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
    key        TEXT PRIMARY KEY,
    value      TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;

-- ─── 3. Storage buckets ───────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- ─── 4. Storage RLS policies ─────────────────────────────────────────────────
-- project-images
CREATE POLICY "project-images: public read"   ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "project-images: allow upload"  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images');
CREATE POLICY "project-images: allow delete"  ON storage.objects FOR DELETE USING (bucket_id = 'project-images');

-- resumes
CREATE POLICY "resumes: public read"   ON storage.objects FOR SELECT USING (bucket_id = 'resumes');
CREATE POLICY "resumes: allow upload"  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resumes');
CREATE POLICY "resumes: allow delete"  ON storage.objects FOR DELETE USING (bucket_id = 'resumes');
