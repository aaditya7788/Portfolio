/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 12s linear infinite',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      borderWidth: {
        '450': '450px',
        '384': '384px',
        '50vh': '50vh',
      },
      colors: {
        main: 'var(--main-color)',
        'light-bg-color': 'var(--bg-color)', // Renamed for clarity
        'dark-bg-color': 'var(--dark-color)', // Renamed for clarity
        'text-color': 'var(--text-color)',
        'text-white-color': 'var(--text-white-color)',
        'white-color': 'var(--white-color)',
        'shadow-color': 'var(--shadow-color)',
        darkbg: '#10041c', // Optional shorthand
      },
    },
  },
  plugins: [],
}