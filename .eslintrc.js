/**
 * Конфигурация ESLint для проекта
 * 
 * Расширяет стандартные правила WordPress
 * Добавляет кастомные правила для качества кода
 */

module.exports = {
  extends: ['plugin:@wordpress/eslint-plugin/recommended'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'eqeqeq': 'error',
  },
};