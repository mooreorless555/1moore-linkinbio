import { sveltekit } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	resolve: {
		alias: {
			src: path.resolve('./src')
		}
	},
	plugins: [sveltekit()]
};

export default config;
