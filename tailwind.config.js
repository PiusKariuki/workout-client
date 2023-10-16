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
        "secondary": "#FFFFFF",
        "cta": "#6F00FF",
      },
      fontFamily: {
        rubik: ['"Rubik']
      }
    },
  },
  plugins: [require("daisyui")],
}

