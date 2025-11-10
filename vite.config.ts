/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig((config) => {
    const isDev = config.mode === 'development';
    let BASE_PATH = '/1841739-six-cities-6/';

    if (process.env.PR_NUMBER) {
        BASE_PATH = `${BASE_PATH}${process.env.PR_NUMBER}/`;
    }

    return {
        plugins: [react()],
        base: BASE_PATH,
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
        define: {
            __BASE__: JSON.stringify(BASE_PATH),
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
    };
});
