/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
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
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@config': path.resolve(__dirname, './src/config'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@resources': path.resolve(__dirname, './src/resources'),
            '@shared': path.resolve(__dirname, './src/shared'),
        },
    },
})
