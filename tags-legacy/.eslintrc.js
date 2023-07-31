module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // 'parser': '@typescript-eslint/parser',
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
      extends: [],
      rules: {}, // Override rules as well for TS files. Basically any config option can be modified here
    },
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier-vue/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier'],

  rules: {
    'prettier-vue/prettier': [
      'warn',
      {
        bracketSpacing: true,
        printWidth: 80,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        singleAttributePerLine: true,
      },
    ],
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
