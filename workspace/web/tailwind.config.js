const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [nextui()],
  theme: {
    extend: {
      colors: {
        'leaf': {
          DEFAULT: '#4d9375', // 主色调
          light: '#5da787',   // 亮一点的变体
          dark: '#3d7560',    // 暗一点的变体
        }
      }
    }
  }
}
