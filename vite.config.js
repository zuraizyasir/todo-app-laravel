import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        tailwindcss(),
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./tests/Vitest/setup.js'],
        include: ['tests/Vitest/**/*.{test,spec}.js'],
        hookTimeout: 30000,
    },
});