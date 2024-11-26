/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E052A0",
          hover: "#C0447F",
        },
        secondary: {
          DEFAULT: "#4F46E5",
          hover: "#4338CA",
        },
        dark: {
          DEFAULT: "#0A1119",
          lighter: "#1E293B",
          light: "#2D3B4E",
        },
      },
    },
  },
  plugins: [],
};
