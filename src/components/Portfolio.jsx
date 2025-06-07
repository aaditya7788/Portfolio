import React from 'react';

const Portfolio = ({ dark }) => {
  const projects = [
    {
      title: 'Space Portfolio',
      description: 'space themed portfolio website showcasing my projects and skills.',
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
      description: 'An interactive 3d sliding book showcasing the Tour of Manali.',
      image: 'projects/ManaliSlidingBook.png',
      link: 'https://manali-slide-book.vercel.app/',
    },
    {
      title: '3d Model Landing Page',
      description: 'A landing page featuring a 3D model of a Robot, built with Spline.',
      image: 'projects/3dmodel.png',
      link: 'https://3d-model-landing-page-three.vercel.app/',
    },
  ];

  return (
    <section id='portfolio' className='relative flex flex-col items-center justify-center mt-[10rem] mb-[10rem] overflow-hidden'>
      <div className='flex-wrap gap-x-4 mb-10'>
        <h1 className={`font-bold text-2xl md:text-6xl ${!dark ? 'text-text-color' : 'text-white-color'}`}>
          Latest <span className='text-[var(--main-color)]'>Scratch</span> Projects
        </h1>
      </div>

      <div className='flex flex-col md:flex-row flex-wrap justify-center items-start gap-10 overflow-hidden'>
        {projects.map((project, index) => ( 
          <div data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
          data-aos-duration={1500 + index * 100}
            key={index}
            className='group relative md:w-[40vw] md:h-[50vh] rounded-3xl overflow-hidden shadow-2xl border-gray-300 dark:border-gray-700'
          >
            <img
              src={project.image}
              alt={project.title}
              className='w-full h-full object-cover transform duration-300 group-hover:scale-110'
            />
            {/* Overlay */}
            <div className='absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <h4 className='text-xl md:text-4xl font-bold mb-2'>{project.title}</h4>
              <p className='text-sm md:text-2xl font-semibold text-center mb-4 text-wrap'>{project.description}</p>
              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--main-color)] text-xl hover:scale-110 transition-transform duration-300'
              >
                <i className='bx bx-link-external text-2xl md:text-4xl'></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
