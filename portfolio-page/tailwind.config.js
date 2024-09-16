/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'system-ui'],
      },
      colors: {
        primaryColor: '#212121',
        secondaryColor: '#9e9e9e',
      },
      backgroundColor: {
        primaryColor: '#212121',
        secondaryColor: '#9e9e9e',
      },
      aspectRatio: {
        '2/1': '2 / 1',
      },
      boxShadow: {
        '3xl': 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
      },
      container: {
        center: true,
      },
      screens: {
        sm: '540px',
        // => @media (min-width: 540px) { ... }

        md: '720px',
        // => @media (min-width: 720px) { ... }

        lg: '960px',
        // => @media (min-width: 960px) { ... }

        xl: '1140px',
        // => @media (min-width: 1140px) { ... }

        '2xl': '1320px',
        // => @media (min-width: 1320px) { ... }
      },
    },
  },
  plugins: [],
};
