/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: '#D90429', // Sith Red
          primaryHover: '#b40321', // Darker Red Hover
          secondary: '#1A1A1D', // Dark Charcoal
          background: '#0B0C10', // Near Black
          backgroundAlt: '#111218', // Slightly lighter for cards/sections
          accent: '#C5C6C7', // Cold Steel
          accentHover: '#a3a4a5',
          border: '#33363a',
          text: '#FFFFFF',
          subtext: '#9CA3AF',
        },
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        sith: '0 0 10px #D90429', // red glow for buttons/cards
      },
    },
  },
  plugins: [],
};
