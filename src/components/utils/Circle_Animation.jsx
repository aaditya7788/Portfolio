import { useEffect, useState } from "react";

const Circle_Animation = ({ dark }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const professions = [
    { icon: "bx bx-code-alt", label: "Web Developer" },
    { icon: "bx bxl-react", label: "ReactJs Dev" },
    { icon: "bx bx-palette", label: "Web Designer" },
    { icon: "bx bx-mobile-alt", label: "Mobile Developer" },
  ];

  return (
    <div
      className={`absolute ${
        isMobile ? "top-[28vh]" : "top-[30vh]"
      } left-1/2 transform -translate-x-1/2 w-[50vh] h-[50vh] ${
        isMobile ? "overflow-hidden" : ""
      } sm:right-[50vw] sm:left-auto sm:translate-x-0 md:top-[25vh] md:right-[20vw] z-[-20]`}
    >
      <div className="profession-circle animate-spin-slow relative w-full h-full">
        {professions.map((item, index) => {
          // For mobile: only show top 2 items (0 and 1)
          if (isMobile && index > 1) return null;

          const rotation = `translate(-50%, -50%) rotate(${
            90 * index
          }deg) translate(25vh) rotate(${index % 2 === 0 ? 180 : -180}deg)`;

          return (
            <div
              key={index}
              className={`profession absolute top-1/2 left-1/2 ${
                dark ? "bg-dark-bg-color" : "bg-light-bg-color"
              }`}
              style={{ transform: rotation }}
            >
              <i className={item.icon}></i>
              <h3>{item.label}</h3>
            </div>
          );
        })}
        <div className="circle absolute w-full h-full rounded-full border border-gray-400"></div>
      </div>
    </div>
  );
};

export default Circle_Animation;
