/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ← فعال کردن حالت Dark Mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}", // ← اضافه شد
  ],
  theme: {
    extend: {
      colors: {
        brand: "#bfd62e", // رنگ اصلی برند
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      backgroundColor: {
        DEFAULT: "hsl(var(--background))",
      },
      textColor: {
        DEFAULT: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
