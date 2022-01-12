module.exports = {
    env: {
        browser: true,
        webextensions: true,
        es2021: true,
    },
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        indent: ['error', 4],
        'import/extensions': 'off',
        'max-len': 'off',
    },
};
