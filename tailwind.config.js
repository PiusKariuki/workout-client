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
        "cta": "#6050DC",
        "danger": "#ED2939",
        "success": "#0B6623"
      },
      fontFamily: {
        rubik: ['"Rubik"']
      },
      backgroundImage: {
        'squat-image': "url('https://images.pexels.com/photos/371049/pexels-photo-371049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
      }
    },
  },
  plugins: [require("daisyui")],
}

