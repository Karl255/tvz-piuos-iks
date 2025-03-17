import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier'; // ✅ Import Prettier plugin
import configPrettier from 'eslint-config-prettier'; // ✅ Import Prettier config

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,jsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    configPrettier, // ✅ Add Prettier config to override conflicting rules
    {
        plugins: { prettier: pluginPrettier }, // ✅ Register Prettier plugin
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            quotes: 'off',
            'prettier/prettier': 'warn', // ✅ Prettier rule now works correctly
        },
    },
];
