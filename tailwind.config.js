/** @type {import('tailwindcss').Config} */
// Faqat CDN config uchun reference (index.html da nusxa bor)
export default {
  content: ['./index.html', './src/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0d0d1a',
          card: '#13132a',
          surface: '#1a1a35',
          border: '#2a2a4a',
          hover: '#22224a',
        },
        gold: {
          DEFAULT: '#c8a96e',
          light: '#d4b87a',
          dark: '#a88a50',
        },
      },
    },
  },
  plugins: [],
};
