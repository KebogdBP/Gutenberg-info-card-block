# WP Gutenberg Demo — Инфо-карточка

Демонстрационный блок Гутенберг, созданный с соблюдением стандартов качества, безопасности и доступности.

## 📋 Требования

| Компонент | Минимальная версия | Рекомендованная |
|-----------|-------------------|-----------------|
| WordPress | 6.3 | 6.5+ |
| PHP | 8.0 | 8.2+ |
| Node | 18 | 20+ |
| npm | 9 | 10+ |

## 🎯 Цель

Показать понимание современной архитектуры WordPress-блоков и внимание к деталям:
- Чистая структура кода
- Безопасность вывода данных
- Доступность (ARIA, keyboard navigation)
- Адаптивная вёрстка
- Документация и чек-листы

## 📦 Структура проекта

wp-gutenberg-demo/
├── src/blocks/info-card/ # Исходный код блока
│ ├── block.json # Конфигурация (apiVersion: 3)
│ ├── index.js # Регистрация блока
│ ├── edit.js # Компонент редактора
│ ├── save.js # Компонент сохранения
│ ├── style.scss # Фронтенд-стили
│ └── editor.scss # Стили редактора
├── includes/
│ └── class-sanitization.php # Класс безопасного вывода
├── build/ # Скомпилированные файлы (генерируется)
├── package.json # Зависимости и скрипты
├── webpack.config.js # Конфигурация сборки
└── README.md # Документация

## 🚀 Установка и использование

### 1. Установка зависимостей

```bash
npm install

2. Сборка проекта
npm run build

3. Интеграция в тему WordPress
Скопируйте папку build/blocks/info-card в вашу тему:
wp-content/themes/your-theme/blocks/info-card/

Добавьте в functions.php:

function register_custom_blocks() {
  $block_json_path = get_theme_file_path('/blocks/info-card/block.json');
  
  if (file_exists($block_json_path)) {
    register_block_type($block_json_path);
  }
}
add_action('init', 'register_custom_blocks');

4. Режим разработки (watch)

✅ Стандарты качества
БЭМ-нейминг классов для изоляции стилей
Семантическая вёрстка (правильные теги h1-h6, section)
Доступность (ARIA-атрибуты, keyboard navigation)
Адаптив (320px, 768px, 1200px, 1920px)
Безопасность (экранирование всех выходных данных)
Whitelist для динамических значений


# 1. Создать структуру папок
mkdir -p src/blocks/info-card includes build

# 2. Сохранить все файлы выше в соответствующие папки

# 3. Установить зависимости
npm install

# 4. Собрать проект
npm run build

# 5. Проверить линтинг
npm run lint:js && npm run lint:css

# 6. GitHub
git remote add origin https://github.com/KebogdBP/Gutenberg-info-card-block.git
git branch -M main
git push -u origin main

# 6. Проверить PHP
php -l includes/class-sanitization.php
