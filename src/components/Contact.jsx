import React from 'react';

const Contact = ({ dark }) => {
  return (
    <section id='contact' className='py-20 px-4 sm:px-8'>
      <div className='container mx-auto flex flex-col items-center'>
        <h1 data-aos="fade-up" data-aos-duration="1000" className='text-3xl sm:text-5xl font-bold text-center mb-16 text-[var(--main-color)]'>
          <span className={`${dark ? 'text-white' : 'text-black'}`}>Contact</span> Me!
        </h1>

        <form data-aos="fade-left" data-aos-duration="1500"
          action="https://formspree.io/f/xyzjkydj"
          method="POST"
          className="w-full max-w-4xl flex flex-col gap-6 animate-fade-in"
        >
          {/* Name & Email */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="userName"
              placeholder="Full Name"
              required
              className={`w-full sm:w-1/2 p-4 border border-gray-300 rounded-xl shadow-md ${dark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
            />
            <input
              type="email"
              name="userEmail"
              placeholder="Email Address"
              required
              className={`w-full sm:w-1/2 p-4 border border-gray-300 rounded-xl shadow-md ${dark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
            />
          </div>

          {/* Phone & Subject */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              name="userPhone"
              placeholder="Mobile Number"
              required
              className={`w-full sm:w-1/2 p-4 border border-gray-300 rounded-xl shadow-md ${dark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
            />
            <input
              type="text"
              name="userSubject"
              placeholder="Email Subject"
              required
              className={`w-full sm:w-1/2 p-4 border border-gray-300 rounded-xl shadow-md ${dark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
            />
          </div>

          {/* Message */}
          <textarea
            name="userMessage"
            rows="6"
            placeholder="Your Message"
            required
            className={`w-full p-4 border border-gray-300 rounded-xl shadow-md ${dark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
          ></textarea>

          {/* Submit Button */}
          <div className="flex justify-center items-center">
            <input 
              type="submit"
              value="Send Message"
              className="bg-[var(--main-color)] text-white text-lg w-full sm:w-auto px-8 py-3 rounded-lg hover:brightness-110 transition cursor-pointer"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
