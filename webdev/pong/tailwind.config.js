/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html",
	        "./src/**/*.{ts,js}"],
  safelist: [
    'w-[6%]',
    'w-[20%]',
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        dseg: ["DSEG7ClassicMini", "monospace"],
		seven: ["SevenSegment", "monospace"],
      },
    },
  },
  plugins: [],
}