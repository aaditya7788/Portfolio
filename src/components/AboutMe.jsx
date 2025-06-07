import React from 'react';

const AboutMe = ({ dark }) => {
  return (
    <section
      id="about"
      className="relative flex flex-col md:flex-row justify-center items-center gap-y-12 md:gap-x-20 px-6 md:px-20 mt-[8rem] mb-[8rem]"
    >
      {/* Profile Image */}
      <div className="w-[80%] md:w-[40%] border-8 border-[var(--main-color)] bg-main rounded-xl overflow-hidden">
        <img data-aos="zoom-in" data-aos-duration="500" src="profile2.png" alt="Profile" className="w-full h-auto object-cover" />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-[40%] text-center md:text-left">
        <div data-aos="fade-left" data-aos-duration="1000" className="flex flex-wrap justify-center md:justify-start gap-x-2">
          <h1 className={`text-4xl md:text-5xl font-bold ${!dark ? 'text-[var(--text-color)]' : 'text-white'}`}>About</h1>
          <h1 className="text-[var(--main-color)] text-4xl md:text-5xl font-bold">Me</h1>
        </div>

        <p data-aos="fade-left" data-aos-duration="1500" className={`mt-4 text-lg md:text-xl leading-relaxed ${!dark ? 'text-[var(--text-color)]' : 'text-white'}`}>
          I'm <span className="text-[var(--main-color)] font-bold">Aaditya Sahani</span>, a full-stack developer skilled in the MERN stack and React Native. I specialize in building modern, responsive web and mobile applications with clean, efficient code. Currently freelancing and always exploring new technologies to grow and deliver better solutions.
        </p>

        <div className="mt-6">
          <a data-aos="fade-up" data-aos-duration="2000"
            href="#contact"
            className="inline-block px-10 py-3 bg-[var(--main-color)] text-white font-bold rounded-lg hover:brightness-110 transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
