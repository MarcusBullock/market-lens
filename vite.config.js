import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [react(), eslint()],
    css: {
        modules: {
            scopeBehaviour: 'local',
            globalModulePaths: [],
            generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
    },
});
