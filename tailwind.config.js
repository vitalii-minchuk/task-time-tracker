/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        appear: "appear .5s ease-in",
        disappear: "disappear .5s"
      },
      keyframes: {
        appear: {
          "from": {
            transform: "scale(0)",
          },
          "to": {
            transform: "scale(1)",
          }
        },
        disappear: {
          "from": {
            transform: "translate(0px, 0px)",
          },
          "to": {
            transform: "translate(-500px, 0px)",
          }
        },
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
