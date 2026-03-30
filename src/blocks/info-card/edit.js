/**
 * Компонент редактора для блока "Инфо-карточка"
 * 
 * Отвечает за отображение и редактирование блока в Gutenberg
 * 
 * @package WP_Gutenberg_Demo
 * @since 1.0.0
 */

import { __ } from '@wordpress/i18n';
import { 
  useBlockProps, 
  RichText, 
  InspectorControls,
  BlockControls,
  AlignmentToolbar 
} from '@wordpress/block-editor';
import { SelectControl, PanelBody } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Компонент редактирования блока
 * 
 * @param {Object} props          - Пропсы компонента
 * @param {Object} props.attributes - Атрибуты блока
 * @param {Function} props.setAttributes - Функция обновления атрибутов
 */
export default function Edit({ attributes, setAttributes }) {
  const { iconName, title, content, align } = attributes;

  /**
   * Инициализация дефолтной иконки при первом рендере
   * Предотвращает пустое значение iconName
   */
  useEffect(() => {
    if (!iconName) {
      setAttributes({ iconName: 'info-outline' });
    }
  }, [iconName, setAttributes]);

  const blockProps = useBlockProps({
    className: 'custom-info-card',
  });

  /**
   * Список доступных иконок для выбора
   * Whitelist предотвращает XSS и обеспечивает консистентность
   */
  const iconOptions = [
    { value: 'info-outline', label: 'ℹ️ Информация' },
    { value: 'warning', label: '⚠️ Предупреждение' },
    { value: 'star-filled', label: '⭐ Звезда' },
    { value: 'yes-alt', label: '✅ Галочка' },
    { value: 'dismiss', label: '❌ Крестик' },
  ];

  return (
    <>
      {/* Панель инструментов над блоком (выравнивание) */}
      <BlockControls>
        <AlignmentToolbar
          value={align}
          onChange={(newAlign) => setAttributes({ align: newAlign })}
        />
      </BlockControls>

      {/* Боковая панель настроек (иконка) */}
      <InspectorControls>
        <PanelBody title={__('Настройки иконки', 'wp-gutenberg-demo')}>
          <SelectControl
            label={__('Выберите иконку', 'wp-gutenberg-demo')}
            value={iconName || 'info-outline'}
            options={iconOptions}
            onChange={(newIcon) => setAttributes({ iconName: newIcon })}
          />
        </PanelBody>
      </InspectorControls>

      {/* Визуальное представление блока в редакторе */}
      <div {...blockProps}>
        <div className="custom-info-card__inner">
          <div className="custom-info-card__icon">
            <span 
              className={`dashicons dashicons-${iconName || 'info-outline'}`}
              aria-hidden="true"
            ></span>
          </div>

          <RichText
            tagName="h3"
            className="custom-info-card__title"
            value={title}
            onChange={(newTitle) => setAttributes({ title: newTitle })}
            placeholder={__('Введите заголовок', 'wp-gutenberg-demo')}
            allowedFormats={['core/bold', 'core/italic']}
          />

          <RichText
            tagName="p"
            className="custom-info-card__content"
            value={content}
            onChange={(newContent) => setAttributes({ content: newContent })}
            placeholder={__('Введите текст', 'wp-gutenberg-demo')}
          />
        </div>
      </div>
    </>
  );
}