/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fdf4ee",
          100: "#fbe5d0",
          200: "#f6c9a0",
          300: "#f0a468",
          400: "#e97e38",
          500: "#e0601a",
          600: "#c44b12",
          700: "#a33810",
          800: "#832d10",
          900: "#6b2610",
        },
        ink: {
          DEFAULT: "#1a1714",
          muted: "#5c5752",
          subtle: "#9c9690",
        },
        surface: {
          DEFAULT: "#faf9f7",
          card: "#ffffff",
          border: "#e8e3dd",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
