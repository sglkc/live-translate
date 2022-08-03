/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    screens: {
      "md": "768px",
      "sm": "640px",
      "sm-only": { "max": "639px" },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night", "light"],
  },
}
