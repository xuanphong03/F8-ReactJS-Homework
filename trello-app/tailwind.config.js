/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        125: "500px",
      },
      width: {
        75: "300px",
      },
    },
  },
  plugins: [],
};
