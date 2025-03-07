/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        blog: "url('../assets/images/pexels-suzyhazelwood-3601081.jpg')"
      }
    },
  },
  plugins: [],
}

