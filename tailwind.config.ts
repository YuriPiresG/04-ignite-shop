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
        green500: "#00875F",
        green300: "#00B37E",

        gray900: "#121214",
        gray800: "#202024",
        gray300: "#C4C4CC",
        gray100: "#E1E1E6",

        white: "#FFFFFF",
      },
      maxWidth: {
        mainMaxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
      },
      minHeight: {
        mainMinHeight: "656",
      },
      gradientColorStops: {
        custom: {
          start: "#1ea483",
          end: "#7465d4",
        },
      },
      linearGradientDirections: {
        "180": "180deg",
      },
      backgroundColor: {
        footerRgba: "rgba(0, 0, 0, 0.6)",
      },
      fontSize: {
        md: "1.125rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      translate: {
        hoverFooter: "110%",
      },
      gridTemplateColumns: {
        productGrid: "1fr 1fr",
      },
      height: {
        productHeight: "calc(656px - 0.5rem)",
      },
    },
  },

  plugins: [],
};
export default config;
