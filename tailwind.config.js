/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      dark: "#111827",
      darkSecondary: "#1f2937",
      light: "#fafafa",
      lightSecondary: "#f5f5f4",
      accentColor: "#1d4ed8",
      red: "#ef4444",
      slate: "#f1f5f9",
      gray: "#4b5563",
    },

    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
