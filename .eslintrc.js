module.exports = {
    root: true,
    extends: [
        'get-off-my-lawn'
    ],
    rules: {
        'semi': 0,
        'quotes': 0,
        'sort-keys': 0,
        'object-curly-spacing': 0, // https://www.jianshu.com/p/39e8aad781ed
        'objects/no-object-properties-one-line': 0,
        'objects/no-object-properties-first-line': 0,
        'objects/no-object-properties-last-line': 0,
        "no-useless-constructor": "error",
        "comma-dangle": ["error", "never"],
        "consistent-return": 0,
        "no-multiple-empty-lines": [1, { "max": 2 }],
        'require-unicode-regexp': 0,
        "max-classes-per-file": 0,
        'node/no-unpublished-import': 0,
        'node/no-extraneous-import': 0,
        'import/no-extraneous-dependencies': 0,
        'eslint-comments/disable-enable-pair': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-max-props-per-line': 0
    },
    overrides: [{
        extends: [
            'get-off-my-lawn',
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended',
        ],
        parser: '@typescript-eslint/parser',
        plugins: [
            '@typescript-eslint',
        ],
        parserOptions: {
            "ecmaFeatures": {
                "jsx": true
            },
            // "project": "./tsconfig.json"
        },
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            "no-useless-constructor": "off",
            "@typescript-eslint/no-useless-constructor": "error"
        }
    }],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".sass", ".less"]
            }
        }
    }
};
