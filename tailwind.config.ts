import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ubuntu-orange': '#E95420',
        'ubuntu-purple': '#772953',
        'ubuntu-gray': '#333333',
        'ubuntu-light-gray': '#AEA79F',
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      boxShadow: {
        'ubuntu': '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
