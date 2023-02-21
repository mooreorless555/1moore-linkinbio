/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				spotify: {
					100: '#1DB954'
				}
			}
		}
	},
	plugins: []
};
