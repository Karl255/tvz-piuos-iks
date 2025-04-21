import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import pluginCypress from 'eslint-plugin-cypress/flat'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginCypress.configs.recommended,
    configPrettier,
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: { globals: globals.browser },
        plugins: {
            prettier: pluginPrettier,
            cypress: pluginCypress,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            quotes: 'off',
            'prettier/prettier': 'warn',
        },
    },
];
