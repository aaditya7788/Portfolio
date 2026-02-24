import React, { useState, useEffect, useRef } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

const STATUS = {
    IDLE: 'idle',
    UPLOADING_IMAGE: 'uploading_image',
    UPLOADING_RESUME: 'uploading_resume',
    SAVING: 'saving',
    SUCCESS: 'success',
    ERROR: 'error',
};

// ─── Reusable status banner ────────────────────────────────────────────────────
function StatusBanner({ status, message }) {
    if (status === STATUS.IDLE) return null;
    const busy = status === STATUS.UPLOADING_IMAGE || status === STATUS.UPLOADING_RESUME || status === STATUS.SAVING;
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
      ${status === STATUS.SUCCESS ? 'bg-green-500/15 text-green-400' : ''}
      ${status === STATUS.ERROR ? 'bg-red-500/15   text-red-400' : ''}
      ${busy ? 'bg-blue-500/15  text-blue-400' : ''}`}
        >
            {busy && (
                <svg className="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
            )}
            {message}
        </div>
    );
}

export default function AdminPanel({ dark, onClose }) {
    // ── auth ──────────────────────────────────────────────────────────────────
    const [authed, setAuthed] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [authError, setAuthError] = useState('');

    // ── projects ──────────────────────────────────────────────────────────────
    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', link: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [projectStatus, setProjectStatus] = useState(STATUS.IDLE);
    const [projectMessage, setProjectMessage] = useState('');
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);

    // ── resume ────────────────────────────────────────────────────────────────
    const [resumeFile, setResumeFile] = useState(null);
    const [currentResumeUrl, setCurrentResumeUrl] = useState(null);
    const [resumeStatus, setResumeStatus] = useState(STATUS.IDLE);
    const [resumeMessage, setResumeMessage] = useState('');
    const resumeInputRef = useRef(null);

    // ── active tab ────────────────────────────────────────────────────────────
    const [tab, setTab] = useState('projects'); // 'projects' | 'resume'

    useEffect(() => {
        if (authed) {
            fetchProjects();
            fetchResumeUrl();
        }
    }, [authed]);

    // ── Data fetchers ─────────────────────────────────────────────────────────
    const fetchProjects = async () => {
        setLoadingProjects(true);
        try {
            const res = await fetch(`${API_URL}/api/projects`);
            const json = await res.json();
            if (json.success) setProjects(json.projects);
        } catch (_) { }
        setLoadingProjects(false);
    };

    const fetchResumeUrl = async () => {
        try {
            const res = await fetch(`${API_URL}/api/resume`);
            const json = await res.json();
            if (json.success) setCurrentResumeUrl(json.url);
        } catch (_) { }
    };

    // ── Auth ──────────────────────────────────────────────────────────────────
    const handleAuth = (e) => {
        e.preventDefault();
        if (passwordInput === ADMIN_PASSWORD) {
            setAuthed(true);
            setAuthError('');
        } else {
            setAuthError('Incorrect password.');
        }
    };

    // ── Image helpers ─────────────────────────────────────────────────────────
    const handleImageChange = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        handleImageChange(e.dataTransfer.files[0]);
    };

    // ── Add project ───────────────────────────────────────────────────────────
    const handleAddProject = async (e) => {
        e.preventDefault();
        const { title, description, link } = form;
        if (!title || !description || !link) {
            setProjectStatus(STATUS.ERROR);
            setProjectMessage('Title, description, and link are required.');
            return;
        }

        try {
            let imageUrl = '';

            if (imageFile) {
                setProjectStatus(STATUS.UPLOADING_IMAGE);
                setProjectMessage('Uploading image to Supabase Storage…');
                const fd = new FormData();
                fd.append('image', imageFile);
                const upRes = await fetch(`${API_URL}/api/projects/upload`, { method: 'POST', body: fd });
                const upJson = await upRes.json();
                if (!upJson.success) throw new Error(upJson.message || 'Image upload failed.');
                imageUrl = upJson.url;
            }

            setProjectStatus(STATUS.SAVING);
            setProjectMessage('Saving project…');
            const saveRes = await fetch(`${API_URL}/api/projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, link, image: imageUrl }),
            });
            const saveJson = await saveRes.json();
            if (!saveJson.success) throw new Error(saveJson.message || 'Save failed.');

            setProjectStatus(STATUS.SUCCESS);
            setProjectMessage('Project added! 🎉');
            setForm({ title: '', description: '', link: '' });
            setImageFile(null);
            setImagePreview('');
            fetchProjects();
            setTimeout(() => setProjectStatus(STATUS.IDLE), 3000);
        } catch (err) {
            setProjectStatus(STATUS.ERROR);
            setProjectMessage(err.message || 'Something went wrong.');
        }
    };

    // ── Delete project ────────────────────────────────────────────────────────
    const handleDelete = async (id) => {
        if (!window.confirm('Delete this project? Its image will also be removed from storage.')) return;
        try {
            const res = await fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE' });
            const json = await res.json();
            if (!json.success) throw new Error(json.message);
            fetchProjects();
        } catch (err) {
            alert('Delete failed: ' + err.message);
        }
    };

    // ── Upload resume ─────────────────────────────────────────────────────────
    const handleUploadResume = async (e) => {
        e.preventDefault();
        if (!resumeFile) {
            setResumeStatus(STATUS.ERROR);
            setResumeMessage('Please select a PDF file first.');
            return;
        }

        try {
            setResumeStatus(STATUS.UPLOADING_RESUME);
            setResumeMessage('Uploading resume to Supabase Storage…');

            const fd = new FormData();
            fd.append('resume', resumeFile);
            const res = await fetch(`${API_URL}/api/resume/upload`, { method: 'POST', body: fd });
            const json = await res.json();
            if (!json.success) throw new Error(json.message || 'Upload failed.');

            setCurrentResumeUrl(json.url);
            setResumeFile(null);
            setResumeStatus(STATUS.SUCCESS);
            setResumeMessage('Resume updated! It now shows on the site. ✅');
            setTimeout(() => setResumeStatus(STATUS.IDLE), 4000);
        } catch (err) {
            setResumeStatus(STATUS.ERROR);
            setResumeMessage(err.message || 'Something went wrong.');
        }
    };

    // ── Password gate ─────────────────────────────────────────────────────────
    if (!authed) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className={`relative w-[90vw] max-w-sm rounded-2xl p-8 shadow-2xl ${dark ? 'bg-[#1e293b] text-white' : 'bg-white text-gray-800'}`}>
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition text-xl">✕</button>
                    <h2 className="text-2xl font-bold mb-1">Admin Login</h2>
                    <p className="text-sm text-gray-400 mb-6">Enter your admin password to continue.</p>
                    <form onSubmit={handleAuth} className="flex flex-col gap-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--main-color)] transition ${dark ? 'bg-[#0f172a] border-slate-600 text-white placeholder-slate-400' : 'bg-gray-50 border-gray-200'}`}
                        />
                        {authError && <p className="text-red-400 text-sm">{authError}</p>}
                        <button type="submit" className="bg-[var(--main-color)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
                            Unlock
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const projectBusy = projectStatus === STATUS.UPLOADING_IMAGE || projectStatus === STATUS.SAVING;
    const resumeBusy = resumeStatus === STATUS.UPLOADING_RESUME;

    // ── Main panel ────────────────────────────────────────────────────────────
    return (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-10 px-4">
            <div className={`relative w-full max-w-3xl rounded-3xl shadow-2xl ${dark ? 'bg-[#1e293b] text-white' : 'bg-white text-gray-800'}`}>

                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-200/20">
                    <div>
                        <h2 className="text-2xl font-bold">Admin Panel</h2>
                        <p className="text-sm text-gray-400 mt-0.5">Manage projects &amp; files via Supabase Storage</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-400 transition text-2xl leading-none">✕</button>
                </div>

                {/* Tabs */}
                <div className={`flex gap-1 px-8 pt-4 pb-0`}>
                    {[
                        { id: 'projects', label: '📁 Projects' },
                        { id: 'resume', label: '📄 Resume' },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`px-5 py-2 rounded-t-xl text-sm font-semibold transition-all border-b-2
                ${tab === t.id
                                    ? 'border-[var(--main-color)] text-[var(--main-color)]'
                                    : `border-transparent ${dark ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="px-8 py-6 space-y-10">

                    {/* ════════════════ PROJECTS TAB ══════════════════════════════════ */}
                    {tab === 'projects' && (
                        <>
                            {/* Add form */}
                            <section>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <span className="text-[var(--main-color)]">+</span> Add New Project
                                </h3>
                                <form onSubmit={handleAddProject} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text" placeholder="Project title *" value={form.title}
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--main-color)] transition ${dark ? 'bg-[#0f172a] border-slate-600 placeholder-slate-400' : 'bg-gray-50 border-gray-200'}`}
                                        />
                                        <input
                                            type="url" placeholder="Project link (https://…) *" value={form.link}
                                            onChange={(e) => setForm({ ...form, link: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--main-color)] transition ${dark ? 'bg-[#0f172a] border-slate-600 placeholder-slate-400' : 'bg-gray-50 border-gray-200'}`}
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Project description *" rows={3} value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--main-color)] transition resize-none ${dark ? 'bg-[#0f172a] border-slate-600 placeholder-slate-400' : 'bg-gray-50 border-gray-200'}`}
                                    />

                                    {/* Drag-and-drop image */}
                                    <div
                                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                        onDragLeave={() => setDragging(false)}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`relative w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center p-6 gap-3
                      ${dragging ? 'border-[var(--main-color)] bg-[var(--main-color)]/10 scale-[1.01]'
                                                : dark ? 'border-slate-600 hover:border-[var(--main-color)]' : 'border-gray-300 hover:border-[var(--main-color)]'}`}
                                        style={{ minHeight: imagePreview ? 'auto' : '130px' }}
                                    >
                                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                                            onChange={(e) => handleImageChange(e.target.files[0])} />
                                        {imagePreview ? (
                                            <div className="relative w-full">
                                                <img src={imagePreview} alt="preview" className="w-full max-h-52 object-cover rounded-xl" />
                                                <button type="button"
                                                    onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(''); }}
                                                    className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-500 transition">
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="text-4xl text-[var(--main-color)] opacity-70">🖼️</div>
                                                <p className="text-sm text-gray-400 text-center">
                                                    Drag &amp; drop image, or <span className="text-[var(--main-color)] font-semibold">click to browse</span>
                                                </p>
                                                <p className="text-xs text-gray-400">PNG · JPG · WEBP — max 10 MB — stored in Supabase Storage</p>
                                            </>
                                        )}
                                    </div>

                                    <StatusBanner status={projectStatus} message={projectMessage} />
                                    <button type="submit" disabled={projectBusy}
                                        className="w-full py-3 rounded-xl bg-[var(--main-color)] text-white font-semibold hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed">
                                        {projectBusy ? 'Working…' : 'Add Project'}
                                    </button>
                                </form>
                            </section>

                            {/* Existing projects */}
                            <section>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <span className="text-[var(--main-color)]">📋</span> Existing Projects
                                    <span className="ml-auto text-sm text-gray-400 font-normal">{projects.length} total</span>
                                </h3>
                                {loadingProjects ? (
                                    <div className="space-y-3">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className={`h-16 rounded-xl animate-pulse ${dark ? 'bg-slate-700' : 'bg-gray-100'}`} />
                                        ))}
                                    </div>
                                ) : projects.length === 0 ? (
                                    <p className="text-gray-400 text-sm">No projects yet.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {projects.map((p) => (
                                            <div key={p.id} className={`flex items-center gap-4 rounded-xl px-4 py-3 ${dark ? 'bg-[#0f172a]' : 'bg-gray-50'}`}>
                                                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-200 dark:bg-slate-700">
                                                    {p.image
                                                        ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                                        : <div className="w-full h-full flex items-center justify-center text-xl text-gray-400">🖼️</div>}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-sm truncate">{p.title}</p>
                                                    <p className={`text-xs truncate ${dark ? 'text-slate-400' : 'text-gray-500'}`}>{p.description}</p>
                                                    {p.image && (
                                                        <p className="text-[10px] text-[var(--main-color)] truncate mt-0.5">
                                                            {p.image.includes('supabase') ? '☁️ Supabase Storage' : '🔗 External URL'}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2 shrink-0">
                                                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                                                        className="text-xs px-3 py-1.5 rounded-lg border border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white transition">View</a>
                                                    <button onClick={() => handleDelete(p.id)}
                                                        className="text-xs px-3 py-1.5 rounded-lg border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition">Delete</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </>
                    )}

                    {/* ════════════════ RESUME TAB ════════════════════════════════════ */}
                    {tab === 'resume' && (
                        <section>
                            <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                                <span className="text-[var(--main-color)]">📄</span> Update Resume
                            </h3>
                            <p className="text-sm text-gray-400 mb-6">
                                Upload a new PDF and it will immediately replace the "Download CV" button on your site.
                            </p>

                            {/* Current resume */}
                            {currentResumeUrl && (
                                <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${dark ? 'bg-[#0f172a]' : 'bg-gray-50'}`}>
                                    <span className="text-2xl">📎</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">Current Resume</p>
                                        <p className="text-xs text-gray-400 truncate">{currentResumeUrl}</p>
                                    </div>
                                    <a href={currentResumeUrl} target="_blank" rel="noopener noreferrer"
                                        className="shrink-0 text-xs px-3 py-1.5 rounded-lg border border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white transition">
                                        Preview
                                    </a>
                                </div>
                            )}

                            {!currentResumeUrl && (
                                <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${dark ? 'bg-[#0f172a]' : 'bg-gray-50'}`}>
                                    <span className="text-2xl">ℹ️</span>
                                    <p className="text-sm text-gray-400">No resume uploaded yet. Upload one below.</p>
                                </div>
                            )}

                            <form onSubmit={handleUploadResume} className="space-y-4">
                                {/* PDF picker */}
                                <div
                                    onClick={() => resumeInputRef.current?.click()}
                                    className={`relative w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center p-8 gap-3
                    ${resumeFile
                                            ? 'border-[var(--main-color)] bg-[var(--main-color)]/5'
                                            : dark ? 'border-slate-600 hover:border-[var(--main-color)]' : 'border-gray-300 hover:border-[var(--main-color)]'}`}
                                >
                                    <input
                                        ref={resumeInputRef}
                                        type="file"
                                        accept="application/pdf"
                                        className="hidden"
                                        onChange={(e) => {
                                            const f = e.target.files[0];
                                            if (f) setResumeFile(f);
                                        }}
                                    />
                                    {resumeFile ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">✅</span>
                                            <p className="text-sm font-semibold text-[var(--main-color)]">{resumeFile.name}</p>
                                            <p className="text-xs text-gray-400">{(resumeFile.size / 1024).toFixed(1)} KB — click to change</p>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-4xl text-[var(--main-color)] opacity-70">📄</span>
                                            <p className="text-sm text-gray-400 text-center">
                                                Click to select your <span className="text-[var(--main-color)] font-semibold">PDF resume</span>
                                            </p>
                                            <p className="text-xs text-gray-400">PDF only — max 10 MB — stored in Supabase Storage</p>
                                        </>
                                    )}
                                </div>

                                <StatusBanner status={resumeStatus} message={resumeMessage} />

                                <button type="submit" disabled={resumeBusy || !resumeFile}
                                    className="w-full py-3 rounded-xl bg-[var(--main-color)] text-white font-semibold hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed">
                                    {resumeBusy ? 'Uploading…' : currentResumeUrl ? '🔄 Replace Resume' : '⬆️ Upload Resume'}
                                </button>
                            </form>
                        </section>
                    )}

                </div>
            </div>
        </div>
    );
}
