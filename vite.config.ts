/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig((config) => {
    const isDev = config.mode === 'development';

    return {
        plugins: [react()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./src/setupTests.ts'],
        },
        css: {
            modules: {
                localsConvention: 'camelCase',
                generateScopedName: isDev
                    ? '[path][name]__[local]--[hash:base64:5]'
                    : '[hash:base64:8]',
                exportGlobals: false,
            },
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
    };
});
