const express = require('express');
const router = express.Router();
const multer = require('multer');
const { supabase, supabaseAdmin } = require('../supabase');

// Memory storage — keeps the file as a buffer (no disk writes)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed.'));
        }
    },
});

// ─── POST /api/projects/upload ────────────────────────────────────────────────
// Upload a project image to Supabase Storage → return its public URL.
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file provided.' });
        }

        const { originalname, mimetype, buffer } = req.file;
        const timestamp = Date.now();
        const safeName = originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filePath = `${timestamp}_${safeName}`;

        // Use supabaseAdmin (service role) to bypass RLS
        const { error: uploadError } = await supabaseAdmin.storage
            .from('project-images')
            .upload(filePath, buffer, { contentType: mimetype, upsert: false });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabaseAdmin.storage
            .from('project-images')
            .getPublicUrl(filePath);

        res.json({ success: true, url: urlData.publicUrl });
    } catch (err) {
        console.error('Error uploading image:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// ─── GET /api/projects ────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json({ success: true, projects: data });
    } catch (err) {
        console.error('Error fetching projects:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// ─── POST /api/projects ───────────────────────────────────────────────────────
router.post('/', async (req, res) => {
    try {
        const { title, description, image, link } = req.body;

        if (!title || !description || !link) {
            return res.status(400).json({
                success: false,
                message: 'title, description, and link are required.',
            });
        }

        // Use supabaseAdmin to bypass RLS on INSERT
        const { data, error } = await supabaseAdmin
            .from('projects')
            .insert([{ title, description, image: image || null, link }])
            .select();

        if (error) throw error;
        res.status(201).json({ success: true, project: data[0] });
    } catch (err) {
        console.error('Error adding project:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// ─── DELETE /api/projects/:id ─────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the project to get its image URL
        const { data: project, error: fetchError } = await supabase
            .from('projects')
            .select('image')
            .eq('id', id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        // If the image lives in our Storage bucket, delete it too
        if (project?.image) {
            try {
                const url = new URL(project.image);
                const parts = url.pathname.split('/project-images/');
                if (parts.length === 2) {
                    await supabaseAdmin.storage.from('project-images').remove([parts[1]]);
                }
            } catch (_) { /* not a Supabase Storage URL */ }
        }

        // Use supabaseAdmin to bypass RLS on DELETE
        const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);
        if (error) throw error;

        res.json({ success: true, message: `Project ${id} deleted.` });
    } catch (err) {
        console.error('Error deleting project:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
