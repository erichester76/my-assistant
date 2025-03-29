// eslint.config.mjs
import nextPlugin from '@next/eslint-plugin-next';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'], // Target TypeScript files
    languageOptions: {
      parser: parser, // Use TypeScript parser
      parserOptions: {
        project: './tsconfig.json', // Point to your TypeScript config
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint, // TypeScript plugin
      '@next/next': nextPlugin, // Next.js plugin
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
    extends: [
      'next/core-web-vitals', // Next.js Core Web Vitals rules
      'next/typescript',      // Next.js TypeScript rules
    ],
  },
];