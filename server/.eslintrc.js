module.exports = {
    env: {
        browser: false,
        commonjs: true,
        es6: true,
        node: true,
        mocha: true,
    },
    extends: [
        'eslint:recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
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
    },
};
