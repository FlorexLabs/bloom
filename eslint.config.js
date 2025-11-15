import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import css from '@eslint/css'
import {defineConfig, globalIgnores} from 'eslint/config'

export default defineConfig([
    // Ignore common generated stuff
    globalIgnores([
        '.config/**',
        'node_modules/**',
        'dist/**',
        'yarn.lock',
        'package*.json',
        '.vscode/**'
    ]),

    // JavaScript + Vue files
    {
        files: ['**/*.{js,mjs,cjs,vue}'],
        languageOptions: {
            globals: {...globals.browser, ...globals.node}
        },
        plugins: {vue: pluginVue},
        extends: [js.configs.recommended, pluginVue.configs['flat/essential']],
        rules: {
            'vue/multi-word-component-names': 'error'
        }
    },

    // JSON
    {
        files: ['**/*.json'],
        plugins: {json},
        extends: [json.configs.recommended]
    },

    // Markdown
    {
        files: ['**/*.md'],
        plugins: {markdown},
        extends: [markdown.configs.recommended]
    },

    // CSS
    {
        files: ['**/*.css'],
        language: 'css/css',
        plugins: {
            css
        },
        extends: [css.configs.recommended]
    }
])
