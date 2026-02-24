import { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import Circle_Animation from './utils/Circle_Animation';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Hero = ({ dark }) => {
    const [resumeUrl, setResumeUrl] = useState(null);

    // Fetch the latest resume URL from the backend on mount
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_URL}/api/resume`);
                const json = await res.json();
                if (json.success && json.url) setResumeUrl(json.url);
            } catch (_) {
                // Fallback: keep null — button will link to local file
            }
        })();
    }, []);

    return (
        <section id='home' className='flex flex-col overflow-hidden min-h-fit md:min-h-screen'>
            <div className="hidden md:block absolute left-0 w-full h-full z-0 overflow-hidden mt-[30rem] md:mt-0">
                <div className='h-full w-full rotate-90 mt-[10vh] md:rotate-0 md:top-0 md:mt-0 '>
                    {/* Background Triangle */}
                    <div className="absolute top-0 z-10 right-0 w-0 h-0 border-t-[45vh] border-b-[50vh] border-r-[50vw] border-l-[300px] md:border-t-[50vh] md:border-b-[50vh] md:border-l-[483px] md:border-r-[30vw] border-t-main border-b-main border-r-main border-l-transparent" />
                </div>

                {/* Professional Circle */}
                <Circle_Animation dark={dark} />
            </div>

            {/* Left Content */}
            <div
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                className="w-full md:w-1/2 pt-28 pb-10 md:py-60 md:mt-0 flex flex-col items-center text-center md:items-start md:text-left"
            >
                <h3 className="text-2xl md:text-4xl font-bold text-[var(--text-color)]">
                    Hello, I Am
                </h3>
                <h1 className="text-3xl md:text-5xl font-bold text-[var(--main-color)]">Aaditya Sahani</h1>
                <p className="mt-4 text-xl leading-relaxed max-w-md text-[var(--text-color)]">
                    I'm a web developer who loves to create beautiful and functional websites
                    for people who want to make a difference in the world.
                </p>
                <p className="mt-2 text-xl leading-relaxed max-w-md text-[var(--text-color)]">
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

                {/* Download CV Button — opens as inline preview in new tab */}
                <div className="mt-6 flex items-center gap-4">
                    <a
                        data-aos="fade-up"
                        data-aos-duration="2000"
                        href={resumeUrl || 'AadityaSahani_Resume.pdf'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-main text-white px-6 py-3 rounded hover:brightness-110 transition flex items-center gap-2"
                    >
                        <i className="bx bx-show text-lg" />
                        View CV
                    </a>
                </div>
            </div>

            {/* Right Image */}
            {/* <div className="hidden md:block md:w-1/2 justify-center mt-16 md:mt-20 z-10">
                <img
                    data-aos="zoomin"
                    data-aos-duration="500"
                    src="profilea.png"
                    alt="Profile"
                    className="w-[80%] h-[80%] max-w-[350px] object-contain absolute right-0 bottom-0"
                />
            </div> */}
        </section>
    );
};

export default Hero;