import eslintPlugin from '@eslint/js';
export default [
  eslintPlugin.configs.recommended,
  {
    ignores: ['.next'],
  },
];