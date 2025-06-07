
import'boxicons/css/boxicons.min.css';
import Circle_Animation from './utils/Circle_Animation';


const Hero = ({dark}) => {
  // Add this array before your return


  return (
      <section id='home' className='flex flex-col overflow-hidden min-h-screen'>
        <div className="absolute left-0 w-full h-full z-0 overflow-hidden mt-[30rem] md:mt-0">
          <div className='h-full w-full rotate-90 mt-[10vh] md:rotate-0 md:top-0 md:mt-0 '>
            {/* Background Triangle */}
          <div className="absolute top-0 z-10 right-0 w-0 h-0 border-t-[45vh] border-b-[50vh] border-r-[50vw] border-l-[300px] md:border-t-[50vh] md:border-b-[50vh] md:border-l-[483px] md:border-r-[30vw] border-t-main border-b-main border-r-main border-l-transparent"/>

          </div>
        
        
        {/* Professional Circle */}

        <Circle_Animation dark={dark}/>
        </div>
      

      {/* Left Content */}

      <div  data-aos="fade-right"
     data-aos-offset="300" data-aos-easing="ease-in-sine" className="w-full md:w-1/2 py-20 md:py-60 md:mt-0 flex flex-col items-center text-center md:items-start md:text-left ">

        <h3 className={`text-2xl md:text-4xl font-bold ${!dark ? 'text-[var(--text-color)]' : 'text-white'}`} >Hello, I am</h3>
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--main-color)]">Aaditya Sahani</h1>
        <p className={`mt-4 text-xl leading-relaxed max-w-md ${!dark ? 'text-[var(--text-color)]' : 'text-white'}`}>
          I'm a web developer who loves to create beautiful and functional websites
          for people who want to make a difference in the world.
        </p>
        <p className={`mt-2 text-xl leading-relaxed max-w-md ${!dark ? 'text-[var(--text-color)]' : 'text-white'}`}>
          Currently I'm learning backend development using Node.js, Express, MongoDB, and WordPress.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-6">
          <a data-aos="fade-up" data-aos-duration="1000" href="mailto:aadityasahani78@gmail.com" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-gmail text-[var(--main-color)] border p-4 rounded-full border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white transition" />
          </a>
          <a data-aos="fade-up" data-aos-duration="1200" href="https://www.instagram.com/_adi._78/" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-instagram text-[var(--main-color)] border p-4 rounded-full border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white transition" />
          </a>
          <a data-aos="fade-up" data-aos-duration="1400" href="https://github.com/aaditya7788" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-github text-[var(--main-color)] border p-4 rounded-full border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white transition" />
          </a>
          <a data-aos="fade-up" data-aos-duration="1600" href="https://www.linkedin.com/in/aadityasahani78" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-linkedin text-[var(--main-color)] border p-4 rounded-full border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white transition" />
          </a>
        </div>

        {/* Download Button */}
        <div className="mt-6 flex items-center gap-4">
          <a data-aos="fade-up" data-aos-duration="2000"
            href="Aaditya Resume.pdf"
            className="bg-main text-white px-6 py-3 rounded hover:brightness-110 transition"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:block md:w-1/2 justify-center mt-16 md:mt-20 z-10">
        <img data-aos="zoomin" data-aos-duration="500"
          src="profile.png"
          alt="Profile"
          className="w-[80%] h-[80%] max-w-[350px] object-contain absolute right-20 bottom-0"
        />
      </div>
    </section>
  )
}

export default Hero
