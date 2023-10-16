import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        principal: "#00875F",
        secondary: "#00B37E",
        background: "#121214",
        elements: "#202024",
        text: "#C4C4CC",
        title: "#E1E1E6",
        white: "#FFFFFF",
      },
    },
  },

  plugins: [],
};
export default config;
