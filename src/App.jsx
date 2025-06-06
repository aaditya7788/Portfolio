import './App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState,useEffect } from 'react'
import AboutMe from './components/AboutMe'
import Header from './components/Header'
import Hero from './components/Hero'


import Portfolio from './components/Portfolio'
import Skills from './components/Skills'
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
   const [dark,setdark] = useState(false);

   useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
        <div> {/* Apply dark mode class */}
      <Header dark={dark} setdark={setdark} />
      
            <div className={`overflow-auto ${dark ? 'dark:bg-[#0f172a]' : ''} px-4 md:px-28`}>

              <Hero dark={dark} setdark={setdark}/>
              <AboutMe dark={dark}/>
              <Portfolio dark={dark}/>
              <Skills dark={dark}/>
              <Contact dark={dark}/>
              <Footer/>
            </div>
            </div>
        


  )
}

export default App