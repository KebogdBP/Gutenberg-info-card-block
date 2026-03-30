<?php
/**
 * Класс для безопасного вывода данных
 * 
 * Демонстрация следования регламенту безопасности WordPress
 * 
 * Принципы:
 * - Никаких the_field() без экранирования
 * - Все выходные данные проходят санитизацию
 * - Валидация входных данных перед обработкой
 * 
 * @package WP_Gutenberg_Demo
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
  exit; // Защита от прямого доступа
}

/**
 * Класс Custom_Sanitization
 * 
 * Предоставляет методы для безопасной обработки и вывода данных
 * Все методы статические для удобства вызова
 */
class Custom_Sanitization {

  /**
   * Безопасный вывод HTML
   * 
   * Экранирует специальные символы для предотвращения XSS
   * 
   * @param string $data Входные данные
   * @return string Экранированные данные
   */
  public static function escape_html($data) {
    if (empty($data)) {
      return '';
    }
    return esc_html($data);
  }

  /**
   * Безопасный вывод атрибута HTML
   * 
   * Экранирует данные для использования в атрибутах тегов
   * 
   * @param string $data Входные данные
   * @return string Экранированные данные
   */
  public static function escape_attr($data) {
    if (empty($data)) {
      return '';
    }
    return esc_attr($data);
  }

  /**
   * Безопасный вывод URL
   * 
   * Валидирует и экранирует URL для безопасного использования
   * 
   * @param string $data Входные данные
   * @return string Экранированный URL
   */
  public static function escape_url($data) {
    if (empty($data)) {
      return '';
    }
    return esc_url($data);
  }

  /**
   * Очистка контента с разрешёнными тегами
   * 
   * Использует wp_kses для фильтрации HTML с белым списком тегов
   * 
   * @param string $content Входной контент
   * @return string Очищенный контент
   */
  public static function wp_kses_content($content) {
    if (empty($content)) {
      return '';
    }
    $allowed = array(
      'strong' => array(),
      'em' => array(),
      'a' => array(
        'href' => array(),
        'title' => array(),
        'target' => array(),
        'rel' => array(),
      ),
      'br' => array(),
      'p' => array(),
    );
    return wp_kses($content, $allowed);
  }

  /**
   * Безопасное получение поля ACF
   * 
   * Требования регламента:
   * - Имя поля только латиница (a-z, 0-9, _)
   * - Проверка существования функции get_field()
   * - Обязательное экранирование вывода
   * 
   * @param string $field_name Имя поля ACF
   * @return string Экранированное значение поля
   */
  public static function get_acf_field($field_name) {
    // Валидация: только латиница в имени поля
    if (!preg_match('/^[a-z0-9_]+$/', $field_name)) {
      error_log('Custom_Sanitization: Invalid ACF field name: ' . $field_name);
      return '';
    }
    
    // Проверка: плагин ACF активен
    if (!function_exists('get_field')) {
      error_log('Custom_Sanitization: ACF plugin not active');
      return '';
    }
    
    $value = get_field($field_name);
    return self::escape_html($value);
  }
}