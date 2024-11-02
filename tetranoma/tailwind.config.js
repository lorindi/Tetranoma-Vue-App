/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "custom-image": "url('./src/assets/tablet-cover1.png')",
      },
      // gridTemplateColumns: {
      //   "70/30": "70% 28%",
      // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
