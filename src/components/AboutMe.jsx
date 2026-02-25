import React from 'react';

const AboutMe = ({ dark }) => {
  return (
    <section
      id="about"
      aria-label="About Aaditya Sahani"
      className="relative flex flex-col md:flex-row justify-center items-center gap-y-12 md:gap-x-20 px-6 md:px-20 mt-10 md:mt-[8rem] mb-[8rem]"
    >
      {/* Profile Image */}
      <div className="w-[80%] md:w-[40%] mt-[5vh] border-8 border-[var(--main-color)] bg-main rounded-xl overflow-hidden">
        <img
          data-aos="zoom-in"
          data-aos-duration="500"
          src="profile2.png"
          alt="Aaditya Sahani – Full-Stack Developer"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-[55%] text-center md:text-left">
        <div data-aos="fade-left" data-aos-duration="1000" className="flex flex-wrap justify-center md:justify-start gap-x-2">
          {/* ✅ Section heading — H2 (H1 is the name in Hero) */}
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-color)]">About</h2>
          <h2 className="text-[var(--main-color)] text-4xl md:text-5xl font-bold">Me</h2>
        </div>

        <p data-aos="fade-left" data-aos-duration="1200" className="mt-4 text-lg md:text-xl leading-relaxed text-[var(--text-color)]">
          I'm <span className="text-[var(--main-color)] font-bold">Aaditya Sahani</span>, a passionate{' '}
          <strong>full-stack developer</strong> with expertise in building modern web and mobile applications
          using <strong>React.js, Next.js, Node.js</strong>, and <strong>React Native (Expo)</strong>.
          I specialize in scalable backend systems powered by <strong>Supabase (PostgreSQL)</strong> and{' '}
          <strong>AWS</strong> cloud services, and I'm deeply interested in <strong>AI integration</strong> and
          blockchain technology.
        </p>

        <p data-aos="fade-left" data-aos-duration="1400" className="mt-4 text-lg md:text-xl leading-relaxed text-[var(--text-color)]">
          I built <strong>Voxen</strong> — a blockchain-integrated governance platform on Base — and{' '}
          <strong>MealMate</strong>, a full-stack social meal-planning app. My AI Voice Calling Agent, built
          with <strong>Twilio, Amazon Transcribe, Polly &amp; Bedrock</strong>, was awarded{' '}
          <em>Best Project by Magic Bus</em> for innovation and real-world impact.
        </p>

        <p data-aos="fade-left" data-aos-duration="1600" className="mt-4 text-lg md:text-xl leading-relaxed text-[var(--text-color)]">
          Currently completing my <strong>BSc IT</strong>, I'm always exploring new technologies to deliver
          better, faster, and more impactful solutions. I'm open to <strong>freelance projects</strong>,
          collaborations, and full-time opportunities.
        </p>

        {/* Quick stats row */}
        <div data-aos="fade-up" data-aos-duration="1800" className="mt-6 flex flex-wrap justify-center md:justify-start gap-6">
          {[
            { label: 'Projects Shipped', value: '10+' },
            { label: 'Technologies', value: '15+' },
            { label: 'Award Won', value: '1' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center md:items-start">
              <span className="text-3xl font-bold text-[var(--main-color)]">{value}</span>
              <span className="text-sm text-[var(--text-color)] opacity-75">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
          <a
            data-aos="fade-up"
            data-aos-duration="2000"
            href="#contact"
            className="inline-block px-10 py-3 bg-[var(--main-color)] text-white font-bold rounded-lg hover:brightness-110 transition"
            aria-label="Contact Aaditya Sahani"
          >
            Contact Me
          </a>
          <a
            data-aos="fade-up"
            data-aos-duration="2200"
            href="https://www.linkedin.com/in/aadityasahani78"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-3 border-2 border-[var(--main-color)] text-[var(--main-color)] font-bold rounded-lg hover:bg-[var(--main-color)] hover:text-white transition"
            aria-label="Aaditya Sahani LinkedIn Profile"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
