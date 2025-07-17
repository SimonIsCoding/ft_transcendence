/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html",
	        "./src/**/*.{ts,js}"],
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