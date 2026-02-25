import { useEffect, useState } from 'react';
import 'boxicons/css/boxicons.min.css';

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/aaditya7788',
      icon: 'bxl-github',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/aadityasahani78',
      icon: 'bxl-linkedin',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/_adi._78/',
      icon: 'bxl-instagram',
    },
    {
      label: 'Email',
      href: 'mailto:aadityasahani78@gmail.com',
      icon: 'bxl-gmail',
    },
  ];

  return (
    <footer className="w-full bg-main text-white pt-10 pb-4 px-6 relative" aria-label="Site footer">

      {/* Top grid: Brand + Nav + Social */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 text-center sm:text-left">

        {/* Brand */}
        <div>
          <p className="text-2xl font-bold mb-2">Aaditya.</p>
          <p className="text-sm text-white/75 leading-relaxed">
            Full-Stack Developer specializing in React, Node.js &amp; React Native.
            Building impactful web and mobile applications.
          </p>
        </div>

        {/* Internal navigation links — important for crawlers */}
        <nav aria-label="Footer navigation">
          <p className="font-semibold mb-3 text-white/90 uppercase tracking-wider text-xs">Navigation</p>
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm text-white/75 hover:text-white transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social profile links */}
        <div>
          <p className="font-semibold mb-3 text-white/90 uppercase tracking-wider text-xs">Connect</p>
          <div className="flex justify-center sm:justify-start gap-3 flex-wrap">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={`${label} – Aaditya Sahani`}
                className="flex items-center gap-1.5 text-sm text-white/75 hover:text-white transition-colors duration-200 group"
              >
                <i className={`bx ${icon} text-lg group-hover:scale-110 transition-transform`} />
                <span>{label}</span>
              </a>
            ))}
          </div>
          {/* External link to GitHub repos */}
          <a
            href="https://github.com/aaditya7788?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-xs text-white/60 hover:text-white underline underline-offset-2 transition-colors duration-200"
          >
            View all GitHub repositories →
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-5xl mx-auto border-t border-white/20 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-center text-sm text-white/75">
          © {year} Aaditya Sahani — All Rights Reserved.
        </p>
        <p className="text-xs text-white/50">
          Built with React &amp; Tailwind CSS · Hosted on Vercel
        </p>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute right-4 bottom-4 bg-white text-black p-2 rounded-md shadow hover:bg-gray-200 transition"
        aria-label="Scroll to top"
      >
        <i className="bx bx-up-arrow-alt text-xl"></i>
      </button>
    </footer>
  );
};

export default Footer;
