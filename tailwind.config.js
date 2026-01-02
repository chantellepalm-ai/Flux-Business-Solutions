/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#FF10F0',
          purple: '#B84FFF',
          cyan: '#00FFFF',
          lime: '#CCFF00',
          blue: '#0099FF',
          magenta: '#FF00FF',
        }
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 16, 240, 0.6), 0 0 40px rgba(255, 16, 240, 0.3)',
        'neon-purple': '0 0 20px rgba(184, 79, 255, 0.6), 0 0 40px rgba(184, 79, 255, 0.3)',
        'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3)',
        'neon-lime': '0 0 20px rgba(204, 255, 0, 0.6), 0 0 40px rgba(204, 255, 0, 0.3)',
        'neon-multi': '0 0 30px rgba(255, 16, 240, 0.4), 0 0 60px rgba(184, 79, 255, 0.3), 0 0 90px rgba(0, 255, 255, 0.2)',
      },
      dropShadow: {
        'neon-pink': '0 0 20px rgba(255, 16, 240, 0.8)',
        'neon-purple': '0 0 20px rgba(184, 79, 255, 0.8)',
        'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.8)',
        'neon-lime': '0 0 20px rgba(204, 255, 0, 0.8)',
      },
    },
  },
  plugins: [],
};
