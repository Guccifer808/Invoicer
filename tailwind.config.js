/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      dark: "#111827",
      darkSecondary: "#1f2937",
      light: "#fafafa",
      accentColor: "#1d4ed8",
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};