module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        mocha: true,
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react/display-name': 0,
        '@typescript-eslint/explicit-function-return-type': [ 'error', {
            'allowExpressions': true,
        }],
        'array-bracket-spacing': [ 'error', 'always', {
            objectsInArrays: false,
        }],
        'comma-dangle': [ 'warn', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
        }],
        'eol-last': [ 'error', 'always' ],
        'indent': [ 'error', 4 ],
        'no-multiple-empty-lines': [ 'error', {
            max: 2,
        }],
        'no-prototype-builtins': 0,
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [ 'error', 'always' ],
        'quotes': [ 'error', 'single' ],
        'react/prop-types': 'off',
    },
};
