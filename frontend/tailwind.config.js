/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B2118",
        accent: "#A6432B",
        "accent-soft": "#F3E0D6",
        success: "#3F7D52",
        alert: "#B23B3B",
        warning: "#B8792E",
        surface: "#FBF8F3",
        "surface-sunken": "#F2ECDF",
        "text-primary": "#2B2118",
        "text-secondary": "#6B5F4F",
        "text-muted": "#9C8F79",
        line: "#E6DECE",
        "line-strong": "#CFC0A0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "Consolas", "monospace"],
      },
      borderRadius: {
        card: "8px",
        panel: "12px",
      },
    },
  },
  plugins: [],
};