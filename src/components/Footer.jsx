import { useEffect, useState } from 'react';

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000 * 60 * 60); // updates hourly in case user keeps tab open long
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-main text-white py-4 px-6 relative">
      <div className="flex justify-center items-center">
        <p className="text-center text-sm sm:text-base">
          Aaditya Sahani © {year} | All Rights Reserved.
        </p>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-md shadow hover:bg-gray-200 transition"
        aria-label="Scroll to top"
      >
        <i className="bx bx-up-arrow-alt text-xl"></i>
      </button>
    </footer>
  );
};

export default Footer;
