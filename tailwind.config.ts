import type { Config } from "tailwindcss";

const config: Config = {
  // corePlugins: {
  //   preflight: false,
  // },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // important: "#__next",
  theme: {
    extend: {
      screens: {
        'max-ar-1': { 'raw': '(max-aspect-ratio: 1/1)' },
      },
    },
  },
  plugins: [],
};
export default config;
