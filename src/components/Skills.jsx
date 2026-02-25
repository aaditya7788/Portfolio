


const skills = [
  { name: 'HTML', icon: 'bxl-html5' },
  { name: 'CSS', icon: 'bxl-css3' },
  { name: 'Tailwind CSS', icon: 'bxl-tailwind-css' },
  { name: 'JavaScript', icon: 'bxl-javascript' },
  { name: 'React', icon: 'bxl-react' },
  { name: 'Node.js', icon: 'bxl-nodejs' },
  { name: 'MongoDB', icon: 'bxl-mongodb' },
  { name: 'Git', icon: 'bxl-git' },
  { name: 'GitHub', icon: 'bxl-github' }

];

const Skills = ({ dark }) => {


  return (
    <section id="skills" aria-label="Skills section" className="py-20 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-2xl md:text-6xl font-bold text-center mb-16 text-[var(--text-color)]">
          My <span className="text-[var(--main-color)]">Skills</span>
        </h2>

        <div className="relative w-full max-w-4xl">
          {/* center vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-[var(--main-color)]"></div>

          <div className="flex flex-col gap-12">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`w-full flex items-center justify-between ${index % 2 === 0 ? 'flex-row' : 'flex-reverse-row'
                  }`}
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              >
                {/* Skill text + icon */}
                <div className="w-1/2 flex justify-end items-center gap-4 pr-4">
                  {index % 2 === 0 ? (
                    <>
                      <span className="text-[var(--text-color)] text-xl md:text-2xl font-medium">{skill.name}</span>
                      <i className={`bx ${skill.icon} text-2xl md:text-4xl text-[var(--main-color)]`}></i>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                {/* Divider dot */}
                <div className="w-4 h-4 rounded-full bg-[var(--main-color)]"></div>

                {/* Icon + Skill text for reverse */}
                <div className="w-1/2 flex justify-start items-center gap-4 pl-4">
                  {index % 2 !== 0 ? (
                    <>
                      <i className={`bx ${skill.icon} text-2xl md:text-4xl text-[var(--main-color)]`}></i>
                      <span className="text-[var(--text-color)] text-xl md:text-2xl font-medium">{skill.name}</span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
