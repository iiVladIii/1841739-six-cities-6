/* eslint-env node */

module.exports = {
    ignorePatterns: ['.eslintrc.cjs'],
    env: { browser: true, es2022: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'htmlacademy/react-typescript',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
    },
    settings: { react: { version: 'detect' } },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        'react/display-name': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react/no-array-index-key': 'warn',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
    },
    globals: {
        __BASE__: true,
    },
    overrides: [
        {
            files: ['*test*'],
            rules: {
                '@typescript-eslint/unbound-method': 'off',
            },
        },
    ],
};
