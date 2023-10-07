/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1F1F1F",
        "secondary": "#F2F9DE",
        "cta": "#FA6A2D",
        "jungle":"#B3CB6D",
        "berry": "#5A80E2"
      },
      fontFamily: {
        rubik: ['"Rubik']
      }
    },
  },
  plugins: [require("daisyui")],
}

