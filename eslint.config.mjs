import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginJest from 'eslint-plugin-jest'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  pluginJs.configs.recommended,
  {
    ignores: ['node_modules', 'dist']
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  }
]
