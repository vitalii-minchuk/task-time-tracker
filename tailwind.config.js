/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -100px) scale(1.3)",
          },
          "66%": {
            transform: "translate(-20px, 70px) scale(0.7)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1.2)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
