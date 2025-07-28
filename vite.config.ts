/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react(),
        tailwindcss(),
    ],

    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/__test__/setupTests.ts',
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@context': path.resolve(__dirname, './src/context'),
            '@components': path.resolve(__dirname, './src/components'),
            '@data': path.resolve(__dirname, './src/data'),
            '@helpers': path.resolve(__dirname, './src/helpers'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@tests': path.resolve(__dirname, './src/__tests__'),
            '@types': path.resolve(__dirname, './src/types'),
            '@services': path.resolve(__dirname, './src/services'),
        },
    },
})
