/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("tailwind-glassmorphism")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "oklch(0% 0 0)",
        white: "oklch(100% 0 0)",
        sun: "oklch(79.52% 0.162 86.05)",
      },
    },
  },
};
