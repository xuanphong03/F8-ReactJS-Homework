/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        100: "400px",
        120: "480px",
        125: "500px",
        150: "600px",
        200: "800px",
      },
      screens: {
        sm: "540px",
        // => @media (min-width: 540px) { ... }

        md: "720px",
        // => @media (min-width: 720px) { ... }

        lg: "960px",
        // => @media (min-width: 960px) { ... }

        xl: "1140px",
        // => @media (min-width: 1140px) { ... }

        "2xl": "1320px",
        // => @media (min-width: 1320px) { ... }
      },
    },
    zIndex: {
      max: 99999,
    },
  },
  plugins: [],
};
