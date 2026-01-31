/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sdi: {
          black: '#1A1A1A',
          gray: {
            bg: '#F7F8F9',
            text: '#666666',
            border: '#E5E7EB',
          },
        },
      },
    },
  },
  plugins: [],
};
