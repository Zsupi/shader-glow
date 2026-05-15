import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import vitest from '@vitest/eslint-plugin'
import testingLibrary from 'eslint-plugin-testing-library'

export default tseslint.config(
  { ignores: ['dist', 'tailwind.config.ts', 'vitest.config.ts', 'src/components/ui/**'] },

  // Base TS/TSX config
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // React rules
      'react/prop-types': 'off',
      'react/no-array-index-key': 'error',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description' },
      ],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/restrict-template-expressions': 'off',

      // Base rules
      'no-shadow': 'off',
      'no-param-reassign': 'error',

      // Import rules
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportDeclaration[source.value=/\\.tsx?$/]',
          message: 'Do not include .ts/.tsx extensions in imports.',
        },
      ],
    },
  },

  // Test file overrides
  {
    files: ['test/**/*.{test,spec}.{ts,tsx}'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    files: ['test/**/*.{test,spec}.{ts,tsx}'],
    ...testingLibrary.configs['flat/react'],
  },

  // Prettier must be last — disables conflicting formatting rules
  eslintConfigPrettier,
)
