import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        eslintPlugin({
            // setup the plugin
            cache: false,
            include: ['./src/**/*.js', './src/**/*.jsx'],
            exclude: [],
        }),
    ],
    server: {
        proxy: {
            '/api': 'https://synthwave-app.onrender.com',
            '/uploads': 'https://synthwave-app.onrender.com',
        },
    },
});
