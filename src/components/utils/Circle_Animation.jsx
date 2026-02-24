const Circle_Animation = ({ dark }) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    const professions = [
        { icon: 'bx bx-code-alt', label: 'Web Developer' },
        { icon: 'bx bxl-react', label: 'ReactJs Dev' },
        { icon: 'bx bx-palette', label: 'Web Designer' },
        { icon: 'bx bx-mobile-alt', label: 'Mobile Developer' },
    ];

    return (
        <div
            className={`absolute top-[30vh] left-1/2 transform -translate-x-1/2 sm:right-[50vw] sm:left-auto sm:translate-x-0 md:top-[25vh] md:right-[20vw] w-[50vh] h-[50vh] mx-auto -z-10`}
        >


            <div className="profession-circle animate-spin-slow w-full h-full relative">
                {professions.map((item, index) => {
                    const baseRotation = `translate(-50%, -50%) rotate(${90 * index}deg) translate(25vh) rotate(${index % 2 === 0 ? 180 : -180}deg)`;
                    const fullTransform = isMobile ? `${baseRotation} rotate(-90deg)` : baseRotation;

                    return (
                        <div
                            key={index}
                            className={`profession absolute top-1/2 left-1/2 ${dark ? 'bg-dark-bg-color' : 'bg-light-bg-color'}`}
                            style={{ transform: fullTransform }}
                        >
                            <i className={item.icon}></i>
                            <h3>{item.label}</h3>
                        </div>
                    );
                })}
                <div className="circle absolute w-full h-full rounded-full border border-[var(--main-color)]" />
            </div>
        </div>
    );
};
export default Circle_Animation;