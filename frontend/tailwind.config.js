/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minWidth: {
      "1/2": "50%",
    },
    extend: {
      maxWidth: {
        "1/2": "50%",
      },
      colors: {
        "cv-primary": "#16232B",
        "cv-secondary": "#283C4C",
        "cv-cyan": "#57F3FF",
        "cv-tbody": "#8D8D8D",
        "cv-dark": "#000000", // Nuevo color oscuro
        "cv-light": "#445666", // Nuevo color más claro
      },
      scale: {
        "80": "0.8", // 90% de la escala original
      },
    },
  },
  plugins: [],
};
