/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/bg.png')",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        lemon: ["Lemon", "cursive"],
      }
    },
  },
  plugins: [],
};
