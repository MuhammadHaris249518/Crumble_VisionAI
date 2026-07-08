/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        ink: "#241E1A",           // near-black warm charcoal — header, high-contrast text
        parchment: "#FBF7EF",     // page background — warm paper, not stark white
        paper: "#FFFFFF",         // card surfaces
        line: "#E4DBCB",          // hairline borders on paper
        "line-dark": "#3A322B",   // hairlines on ink surfaces

        // Brand + signal colors (bakery-lab identity: teal instrument accent,
        // burnt-sienna reserved for the "defect" language of the product)
        primary: "#241E1A",
        accent: "#3E7C74",        // primary interactive accent (teal)
        "accent-dark": "#2F615A",
        clay: "#B5482A",          // defect / destructive / alert
        success: "#4C8F68",
        warning: "#C08A2E",

        "text-primary": "#241E1A",
        "text-secondary": "#736657",
        "text-onink": "#F3ECDF",
        "text-onink-muted": "#B8AA97",

        muted: "#F2ECDD",         // chip / subtle fill background

        // Back-compat aliases (older components reference these directly)
        surface: "#FBF7EF",
        alert: "#B5482A",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["\"IBM Plex Mono\"", "ui-monospace", "Menlo", "monospace"],
      },
      borderRadius: {
        card: "10px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(36,30,26,0.04), 0 8px 24px -12px rgba(36,30,26,0.12)",
        lift: "0 12px 32px -16px rgba(36,30,26,0.28)",
      },
      letterSpacing: {
        wideish: "0.04em",
      },
    },
  },
  plugins: [],
};