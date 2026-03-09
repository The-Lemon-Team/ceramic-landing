import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui-lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@premieroctet/next-admin/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  presets: [require("@premieroctet/next-admin/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#E38A3A",
        "background-light": "#F9F8F6",
        "background-dark": "#1A1918",
        "accent-earth": "#EADED2",
        "accent-earth-dark": "#2D2A27",
      },
      fontFamily: {
        serif: ["var(--font-cormorant-garamond)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        script: ["var(--font-mrs-saint-delafield)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
