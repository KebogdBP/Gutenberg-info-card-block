/**
 * Компонент сохранения для блока "Инфо-карточка"
 * 
 * Отвечает за HTML-вывод блока на фронтенде
 * 
 * @package WP_Gutenberg_Demo
 * @since 1.0.0
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Whitelist разрешённых иконок
 * 
 * Безопасность: предотвращает XSS через динамические классы
 * Только проверенные значения dashicons допускаются к выводу
 */
const ALLOWED_ICONS = [
  'info-outline',
  'warning',
  'star-filled',
  'yes-alt',
  'dismiss',
];

/**
 * Компонент сохранения блока
 * 
 * @param {Object} props          - Пропсы компонента
 * @param {Object} props.attributes - Атрибуты блока
 */
export default function Save({ attributes }) {
  const { iconName, title, content, align } = attributes;

  /**
   * Валидация иконки перед выводом
   * Если значение не в whitelist — используется дефолтная иконка
   */
  const safeIconName = ALLOWED_ICONS.includes(iconName) 
    ? iconName 
    : 'info-outline';

  const blockProps = useBlockProps.save({
    className: `custom-info-card align${align ? '-' + align : ''}`,
  });

  return (
    <div {...blockProps}>
      <div className="custom-info-card__inner">
        <div className="custom-info-card__icon">
          <span 
            className={`dashicons dashicons-${safeIconName}`}
            aria-hidden="true"
          ></span>
        </div>

        <RichText.Content
          tagName="h3"
          className="custom-info-card__title"
          value={title}
        />

        <RichText.Content
          tagName="p"
          className="custom-info-card__content"
          value={content}
        />
      </div>
    </div>
  );
}