import type { Config } from "tailwindcss";

// In Tailwind CSS v4, most configuration has moved to CSS via @theme.
// This file is kept for content scanning configuration only.
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
