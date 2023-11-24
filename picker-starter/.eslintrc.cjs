module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  overrides: [
    {
      files: '*.ts',
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {}, // Override rules as well for TS files. Basically any config option can be modified here
    },
    {
      files: '*.vue',
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
      extends: ['plugin:vue/vue3-recommended'],
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/html-self-closing': [
          'warn',
          {
            html: {
              void: 'always',
            },
          },
        ],
      }, // Override rules as well for TS files. Basically any config option can be modified here
    },
  ],

  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    curly: 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'none',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
}
