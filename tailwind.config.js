/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Blue: "#639AFF",
        Green: "#1AD37A",
        lightBlue: "#05D1ED",
        Pink: "#FF71C6",
        Red: "#FF7070",
        Yellow: "#FFB547",
        Orange: "#FFA188",
        Purple: "#B79CFF",
      },
    },
  },
  plugins: [],
}

