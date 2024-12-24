import { Height, Opacity } from "@mui/icons-material";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode:"class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes:{
        fadeIn:{
          '0%':{
            transform:"translateX(5%)",
          },
          '100%':{
            transform:"translateX(0%)",
          }
        },
      },
      animation:{
        fadeIn:"fadeIn 1s ease-in-out",
      },
      colors:{
        white:"#ffffff",
        gray:{
          100:  "#f3f4f6",
          200:  "#e5e7eb",
          300:  "#d1d5db",
          500:  "#6b7280",
          700:  "#374115",
          800:  "#1f2937"
        },
        blue:{
          200: "#93c5fd",
          400: "#60a5fa",
          500: "3b82f6",
        },
        black:{
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#434957",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509" 
        },
        red:{
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f" 
        },
        "dark-bg": "#101214",
        "dark-secondary": "#1d1f21",
        "dark-tertiary":  "#3b3d40",
        "blue-primary": "#0275ff",
        "stroke-dark": "#2d3135"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
  ],
};
export default config;
