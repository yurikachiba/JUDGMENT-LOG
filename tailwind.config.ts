import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kimi: {
          50: "#FFF9EB",
          100: "#FFF0CC",
          200: "#FFE099",
          300: "#FFD166",
          400: "#F5B833",
          500: "#E8A317",
          600: "#C48A12",
          700: "#9F700E",
          800: "#7A560A",
          900: "#553C07",
        },
        ruri: {
          50: "#EBF0F8",
          100: "#C9D6EC",
          200: "#93ACD9",
          300: "#5D83C6",
          400: "#3869B3",
          500: "#1E50A2",
          600: "#184082",
          700: "#123061",
          800: "#0C2041",
          900: "#061020",
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans JP"',
          '"Hiragino Kaku Gothic ProN"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
