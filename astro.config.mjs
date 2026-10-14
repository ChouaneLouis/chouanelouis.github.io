// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml'

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://chouanelouis.github.com',
    vite: {
        plugins: [yaml(), tailwindcss()],
    }
});
