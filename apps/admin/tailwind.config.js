/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require("@repo/config/tailwind"),
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
}
