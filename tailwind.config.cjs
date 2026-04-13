/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "0.75rem",
      screens: {
        "2xl": "90rem"
      }
    },
    extend: {
      colors: {
        "primary-fixed": "#e8ddff",
        "surface-container-lowest": "#ffffff",
        secondary: "#4d5f7d",
        primary: "#000000",
        "secondary-fixed": "#d6e3ff",
        "on-primary-fixed-variant": "#4b3f6f",
        "primary-fixed-dim": "#cdbef7",
        "surface-bright": "#fdf8fd",
        "on-primary": "#ffffff",
        "on-surface": "#1c1b1e",
        "tertiary-fixed": "#ffe08f",
        "on-tertiary-fixed-variant": "#584400",
        "inverse-primary": "#cdbef7",
        "on-tertiary-fixed": "#241a00",
        "inverse-surface": "#313033",
        "on-error": "#ffffff",
        "primary-container": "#1f1341",
        "on-error-container": "#93000a",
        error: "#ba1a1a",
        "surface-container-highest": "#e6e1e6",
        background: "#fdf8fd",
        "surface-dim": "#ddd8dd",
        "surface-container-low": "#f7f2f7",
        "surface-container": "#f1ecf1",
        "on-secondary-container": "#4e607e",
        "secondary-container": "#c8dbfe",
        "outline-variant": "#cac4cf",
        "on-surface-variant": "#48454e",
        "error-container": "#ffdad6",
        outline: "#79757f",
        surface: "#fdf8fd",
        "on-tertiary": "#ffffff",
        "on-primary-fixed": "#1f1341",
        "secondary-fixed-dim": "#b5c7ea",
        "on-tertiary-container": "#503d00",
        "surface-variant": "#e6e1e6",
        "on-primary-container": "#8a7cb1",
        "inverse-on-surface": "#f4eff4",
        "tertiary-container": "#c9a84c",
        tertiary: "#755b00",
        "tertiary-fixed-dim": "#e6c364",
        "on-secondary-fixed": "#071c36",
        "on-secondary-fixed-variant": "#364764",
        "on-secondary": "#ffffff",
        "on-background": "#1c1b1e",
        "surface-tint": "#635789",
        "surface-container-high": "#ece7eb",
        "brand-deep": "#1B0E3D",
        "brand-gold": "#C9A84C",
        "brand-white": "#FFFFFF",
        "brand-blue": "#0B1F3A"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Manrope", "sans-serif"],
        label: ["Manrope", "sans-serif"],
        manrope: ["Manrope", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")]
};
