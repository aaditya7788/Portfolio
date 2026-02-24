import React, { useState, useEffect, useRef } from 'react';

const PROJECTS_PER_PAGE = 4;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Fallback projects shown while loading or if API fails
const FALLBACK_PROJECTS = [
  {
    title: 'Space Portfolio',
    description: 'Space themed portfolio website showcasing my projects and skills.',
    image: 'projects/space_portfolio.jpg',
    link: 'https://space-portfolio-one-self.vercel.app/',
  },
  {
    title: 'Mealmate',
    description: 'Mealmate is a social media platform for food lovers to share recipes and connect.',
    image: 'projects/mealmate_banner.webp',
    link: 'https://github.com/aaditya7788/MealMate',
  },
  {
    title: 'Manali Sliding Book',
    description: 'An interactive 3D sliding book showcasing the Tour of Manali.',
    image: 'projects/ManaliSlidingBook.png',
    link: 'https://manali-slide-book.vercel.app/',
  },
  {
    title: '3D Model Landing Page',
    description: 'A landing page featuring a 3D model of a Robot, built with Spline.',
    image: 'projects/3dmodel.png',
    link: 'https://3d-model-landing-page-three.vercel.app/',
  },
];

const Portfolio = ({ dark }) => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [slideDir, setSlideDir] = useState('left'); // 'left' | 'right'
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        const json = await res.json();
        if (json.success && json.projects.length > 0) {
          setProjects(json.projects);
        }
      } catch (err) {
        console.warn('Could not fetch projects from API, using fallback.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const currentProjects = projects.slice(
    currentPage * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE + PROJECTS_PER_PAGE
  );

  const goToPage = (newPage, dir) => {
    if (sliding || newPage === currentPage) return;
    setSlideDir(dir);
    setSliding(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setSliding(false);
    }, 400);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1, 'left');
  };

  const handlePrev = () => {
    if (currentPage > 0) goToPage(currentPage - 1, 'right');
  };

  const slideClass = sliding
    ? slideDir === 'left'
      ? 'portfolio-slide-out-left'
      : 'portfolio-slide-out-right'
    : 'portfolio-slide-in';

  return (
    <section
      id="portfolio"
      className="relative flex flex-col items-center justify-center mt-[10rem] mb-[10rem] overflow-hidden"
    >
      {/* Heading */}
      <div className="flex-wrap gap-x-4 mb-10">
        <h1 className="font-bold text-2xl md:text-6xl text-[var(--text-color)]">
          Latest <span className="text-[var(--main-color)]">Scratch</span> Projects
        </h1>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-start gap-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="md:w-[40vw] md:h-[50vh] rounded-3xl bg-gray-300 dark:bg-gray-700 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Project Grid */}
      {!loading && (
        <div
          ref={gridRef}
          className={`flex flex-col md:flex-row flex-wrap justify-center items-start gap-10 overflow-hidden ${slideClass}`}
          style={{ minHeight: '50vh' }}
        >
          {currentProjects.map((project, index) => (
            <div
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              data-aos-duration={1500 + index * 100}
              key={project.id || index}
              className="group relative md:w-[40vw] md:h-[50vh] rounded-3xl overflow-hidden shadow-2xl border-gray-300 dark:border-gray-700"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/800x500?text=No+Image';
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-xl md:text-4xl font-bold mb-2">{project.title}</h4>
                <p className="text-sm md:text-2xl font-semibold text-center mb-4 text-wrap">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--main-color)] text-xl hover:scale-110 transition-transform duration-300"
                >
                  <i className="bx bx-link-external text-2xl md:text-4xl"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center gap-6 mt-12">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
              ${currentPage === 0
                ? 'border-gray-400 text-gray-400 cursor-not-allowed opacity-40'
                : 'border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white hover:scale-110'
              }`}
            aria-label="Previous page"
          >
            <i className="bx bx-chevron-left text-2xl"></i>
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i, i > currentPage ? 'left' : 'right')}
                className={`rounded-full transition-all duration-300 ${i === currentPage
                  ? 'bg-[var(--main-color)] w-8 h-3'
                  : 'bg-gray-400 w-3 h-3 hover:bg-[var(--main-color)] hover:opacity-70'
                  }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
              ${currentPage === totalPages - 1
                ? 'border-gray-400 text-gray-400 cursor-not-allowed opacity-40'
                : 'border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white hover:scale-110'
              }`}
            aria-label="Next page"
          >
            <i className="bx bx-chevron-right text-2xl"></i>
          </button>
        </div>
      )}

      {/* Page label */}
      {!loading && totalPages > 1 && (
        <p className={`mt-4 text-sm ${!dark ? 'text-gray-500' : 'text-gray-400'}`}>
          Page {currentPage + 1} of {totalPages}
        </p>
      )}

      {/* Slide animation styles */}
      <style>{`
        .portfolio-slide-in {
          animation: slideIn 0.4s ease forwards;
        }
        .portfolio-slide-out-left {
          animation: slideOutLeft 0.4s ease forwards;
        }
        .portfolio-slide-out-right {
          animation: slideOutRight 0.4s ease forwards;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-60px); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(60px); }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
