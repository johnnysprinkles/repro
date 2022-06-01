import adapter from '@sveltejs/adapter-auto';
import star from './vite-plugin-example.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},

		vite: {
			plugins: [star()]
		}
	}
};

export default config;
