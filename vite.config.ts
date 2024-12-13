import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), legacy()],
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 5011,
	},
});
