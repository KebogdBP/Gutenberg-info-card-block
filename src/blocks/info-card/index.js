/**
 * Регистрация блока Гутенберг "Инфо-карточка"
 * 
 * @package WP_Gutenberg_Demo
 * @since 1.0.0
 */

import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import metadata from './block.json';

// Импорт стилей для редактора и фронтенда
import './style.scss';
import './editor.scss';

/**
 * Регистрация блока в редакторе WordPress
 * Проверка registerBlockType предотвращает ошибки при повторной загрузке
 */
if (typeof registerBlockType === 'function') {
  registerBlockType(metadata.name, {
    ...metadata,
    edit,
    save,
  });
}