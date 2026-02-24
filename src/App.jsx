import './App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react'
import AboutMe from './components/AboutMe'
import Header from './components/Header'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Skills from './components/Skills'
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [dark, setdark] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Toggle .dark class on <html> so CSS variables + Tailwind dark: variants both work
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className="bg-[var(--bg-color)] min-h-screen transition-colors duration-300">
      <Header dark={dark} setdark={setdark} />

      <div className="overflow-hidden px-4 md:px-28">
        <Hero dark={dark} setdark={setdark} />
        <AboutMe dark={dark} />
        <Portfolio dark={dark} />
        <Skills dark={dark} />
        <Contact dark={dark} />
        <Footer />
      </div>

      {/* Admin gear button — bottom right corner */}
      <button
        onClick={() => setShowAdmin(true)}
        title="Admin Panel"
        className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-gray-300/30 hover:bg-[var(--main-color)] text-gray-500 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg opacity-30 hover:opacity-100"
        aria-label="Open admin panel"
      >
        <i className="bx bx-cog text-xl" />
      </button>

      {showAdmin && (
        <AdminPanel dark={dark} onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
}

export default App