
import'boxicons/css/boxicons.min.css';
import { useState, useEffect } from 'react';
const Header = ({dark,setdark}) => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    if( window.innerHeight <=640 ){
      setIsScrolled(window.scrollY > 100);
    }
    else{
    setIsScrolled(window.scrollY > 500);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

 
  return (
      <header
    className={`fixed w-full z-40 flex justify-between items-center pr-0 pl-5 py-1 md:py-4 transition-all duration-500 md:pl-28 md:pr-24
      ${
        isScrolled
          ? dark
            ? 'bg-dark-bg-color shadow-lg'
            : 'bg-white shadow-lg'
          : 'bg-transparent'
      }
    `}
  >

      <h1 className='text-[var(--main-color)] font-bold text-[1.5rem] md:text-[2rem]'
         data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="300"
        data-aos-offset="0"
         >Aaditya.</h1>

      {/* Desktop Navigation: links and dark mode toggle */}

      <nav className={`hidden z-50 md:flex gap-10 mr-[3.5rem] text-[1.5rem] font-[500]
        ${
          isScrolled? dark ?'text-[var(--white-color)]': 'text-black':'text-[var(--white-color)]'} 
        `}>
        <a data-aos="fade-down"
         data-aos-easing="linear"
         data-aos-duration="1000"
         href='#home'>Home</a>

        <a data-aos="fade-down"
         data-aos-easing="linear"
         data-aos-duration="1200"
        href='#about'>About</a>

        <a data-aos="fade-down"
         data-aos-easing="linear"
         data-aos-duration="1400"
         href='#portfolio'>Portfolio</a>

        <a data-aos="fade-down"
         data-aos-easing="linear"
         data-aos-duration="1600"
         href='#skills'>Skills</a>

        <a data-aos="fade-down"
         data-aos-easing="linear"
         data-aos-duration="1800"
         href='#contact'>Contact</a>

        <button data-aos="fade-down"
         data-aos-easing="linear"
         data-aos-duration="2000"
          onClick={()=>setdark(!dark)}>
          {
            dark? 
               < i class='bx  bx-brightness'  ></i> 
            :< i class='bx  bx-moon'  ></i>
          }
        </button>
      </nav>

{/* Mobile Navigation: menu & dark toggle */}
<div className="md:hidden w-full justify-end flex items-center">
  {/* Dark mode toggle */}
  <button data-aos="fade-down"
         data-aos-easing="linear"
         data-aos-duration="1000"
    onClick={() => setdark(!dark)}
    className={`p-2 rounded-full transition-all duration-300
      ${isScrolled ? (dark ? '' : '') : 'bg-transparent'}
      hover:text-gray-500`}
  >
    {dark ? (
      <i className="bx bx-brightness text-xl text-white"></i>
    ) : (
      <i className="bx bx-moon text-xl text-black"></i>
    )}
  </button>

  {/* Hamburger menu */}
  <button
  data-aos="fade-down"
         data-aos-easing="linear"
         data-aos-duration="1200"
  onClick={() => setMenuOpen(!menuOpen)}
    className={`p-2 text-xl transition-all duration-300
      ${isScrolled ? (dark ? '' : '') : 'bg-transparent'}
      hover: text-gray-500`}
  >
    <i
  className={`${menuOpen ? 'bx bx-x' : 'bx bx-menu'} text-2xl ${
    dark ? 'text-white' : 'text-black'
  }`}
/>

  </button>

  {/* Mobile Menu */}
  {
    menuOpen && (
      <div className={`absolute top-16 right-[10vw] border self-center w-[80vw] p-4 shadow-lg rounded-lg z-50 ${dark? 'bg-dark-bg-color text-white' : 'bg-white text-black'}`}>
        <nav className="flex flex-col gap-4 text-lg font-medium justify-center">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </div>
    )
  }
</div>


      
    </header>
  )
}

export default Header