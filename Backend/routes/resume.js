const express = require('express');
const router = express.Router();
const multer = require('multer');
const { supabase, supabaseAdmin } = require('../supabase');

const BUCKET = 'resumes';
const RESUME_KEY = 'current_resume'; // fixed key in the DB so there's always one active resume

// Accept PDF only, max 10 MB
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed.'));
        }
    },
});

// ─── GET /api/resume ──────────────────────────────────────────────────────────
// Returns the current public resume URL (or null if none uploaded yet).
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('settings')
            .select('value')
            .eq('key', RESUME_KEY)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        res.json({ success: true, url: data?.value || null });
    } catch (err) {
        console.error('Error fetching resume URL:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// ─── POST /api/resume/upload ──────────────────────────────────────────────────
// Upload a new PDF resume → replace old one in Storage → save URL to DB.
router.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No PDF file provided.' });
        }

        const { originalname, buffer } = req.file;
        const safeName = originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filePath = `resume_${Date.now()}_${safeName}`;

        // ── 1. Delete previously stored resume from Storage ──────────────────
        const { data: existing } = await supabase
            .from('settings')
            .select('value')
            .eq('key', RESUME_KEY)
            .single();

        if (existing?.value) {
            try {
                const url = new URL(existing.value);
                const parts = url.pathname.split(`/${BUCKET}/`);
                if (parts.length === 2) {
                    await supabaseAdmin.storage.from(BUCKET).remove([parts[1]]);
                }
            } catch (_) { /* previous URL was not a Supabase Storage URL */ }
        }

        // ── 2. Upload new resume to Storage ──────────────────────────────────
        const { error: uploadError } = await supabaseAdmin.storage
            .from(BUCKET)
            .upload(filePath, buffer, { contentType: 'application/pdf', upsert: false });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabaseAdmin.storage
            .from(BUCKET)
            .getPublicUrl(filePath);

        const publicUrl = urlData.publicUrl;

        // ── 3. Upsert URL into settings table ─────────────────────────────────
        const { error: upsertError } = await supabase
            .from('settings')
            .upsert({ key: RESUME_KEY, value: publicUrl }, { onConflict: 'key' });

        if (upsertError) throw upsertError;

        res.json({ success: true, url: publicUrl });
    } catch (err) {
        console.error('Error uploading resume:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
