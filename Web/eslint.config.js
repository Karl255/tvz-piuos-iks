import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    configPrettier,
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        languageOptions: { globals: globals.browser },
        plugins: { prettier: pluginPrettier },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            quotes: 'off',
            // 'prettier/prettier': 'warn',
        },
    },
];
