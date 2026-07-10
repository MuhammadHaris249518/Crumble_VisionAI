/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        brand: {
          50:  "#FFF8ED",
          100: "#FFE9C5",
          200: "#FFCC80",
          300: "#FFA726",
          400: "#F57C00",
          500: "#E65100",
        },
        // Primary — deep navy
        primary: {
          DEFAULT: "#0F172A",
          50:  "#F1F5F9",
          100: "#E2E8F0",
          200: "#CBD5E1",
          800: "#1E293B",
          900: "#0F172A",
        },
        // Accent — vivid indigo-blue
        accent: {
          DEFAULT: "#6366F1",
          soft:    "rgba(99,102,241,0.10)",
          hover:   "#4F46E5",
          glow:    "rgba(99,102,241,0.25)",
        },
        // Surfaces
        surface: {
          DEFAULT: "#F8FAFC",
          card:    "#FFFFFF",
          sunken:  "#F1F5F9",
          dark:    "#0F172A",
          panel:   "#1E293B",
        },
        // Borders
        line: {
          DEFAULT: "#E2E8F0",
          strong:  "#CBD5E1",
          dark:    "rgba(255,255,255,0.08)",
        },
        // Text
        "text-primary":   "#0F172A",
        "text-secondary": "#64748B",
        "text-muted":     "#94A3B8",
        "text-invert":    "#F8FAFC",
        // State colours
        success: { DEFAULT: "#10B981", soft: "rgba(16,185,129,0.10)" },
        alert:   { DEFAULT: "#EF4444", soft: "rgba(239,68,68,0.10)" },
        warning: { DEFAULT: "#F59E0B", soft: "rgba(245,158,11,0.10)" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "Consolas", "monospace"],
      },
      borderRadius: {
        card:  "10px",
        panel: "14px",
        pill:  "999px",
      },
      boxShadow: {
        card:   "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)",
        panel:  "0 4px 16px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)",
        accent: "0 0 0 3px rgba(99,102,241,0.20)",
        glow:   "0 0 24px rgba(99,102,241,0.18)",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
        "fade-in": "fadeIn 0.25s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};