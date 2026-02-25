import React from 'react';

const Contact = ({ dark }) => {
  return (
    <section id='contact' aria-label="Contact section" className='py-20 px-4 sm:px-8'>
      <div className='container mx-auto flex flex-col items-center'>
        <h2 data-aos="fade-up" data-aos-duration="1000" className='text-3xl sm:text-5xl font-bold text-center mb-6 text-[var(--main-color)]'>
          Contact <span className="text-[var(--text-color)]">Aaditya Sahani</span>
        </h2>
        <p className="text-center text-[var(--text-color)] opacity-80 max-w-2xl mb-12 text-lg">
          Have a project in mind or just want to say hi? Feel free to reach out for collaborations,
          freelance opportunities, or full-stack development inquiries.
        </p>

        <form data-aos="fade-left" data-aos-duration="1500"
          action="https://formspree.io/f/xyzjkydj"
          method="POST"
          className="w-full max-w-4xl flex flex-col gap-6 animate-fade-in"
        >
          {/* Name & Email */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label htmlFor="userName" className="sr-only">Full Name</label>
              <input
                id="userName"
                type="text"
                name="userName"
                placeholder="Full Name"
                required
                className={`w-full p-4 border border-gray-300 rounded-xl shadow-md ${dark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label htmlFor="userEmail" className="sr-only">Email Address</label>
              <input
                id="userEmail"
                type="email"
                name="userEmail"
                placeholder="Email Address"
                required
                className={`w-full p-4 border border-gray-300 rounded-xl shadow-md ${dark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
              />
            </div>
          </div>

          {/* Phone & Subject */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label htmlFor="userPhone" className="sr-only">Mobile Number</label>
              <input
                id="userPhone"
                type="number"
                name="userPhone"
                placeholder="Mobile Number"
                required
                className={`w-full p-4 border border-gray-300 rounded-xl shadow-md ${dark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label htmlFor="userSubject" className="sr-only">Email Subject</label>
              <input
                id="userSubject"
                type="text"
                name="userSubject"
                placeholder="Email Subject"
                required
                className={`w-full p-4 border border-gray-300 rounded-xl shadow-md ${dark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="userMessage" className="sr-only">Your Message</label>
            <textarea
              id="userMessage"
              name="userMessage"
              rows="6"
              placeholder="Your Message"
              required
              className={`w-full p-4 border border-gray-300 rounded-xl shadow-md ${dark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
            ></textarea>
          </div>

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
