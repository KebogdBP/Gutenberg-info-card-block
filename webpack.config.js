/**
 * Конфигурация Webpack для сборки Gutenberg-блока
 * 
 * Копирует block.json и SCSS-файлы в директорию build
 * 
 * @package WP_Gutenberg_Demo
 * @since 1.0.0
 */

const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    'blocks/info-card/index': './src/blocks/info-card/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  plugins: [
    ...defaultConfig.plugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/blocks/info-card/block.json'),
          to: path.resolve(__dirname, 'build/blocks/info-card/block.json'),
        },
        {
          from: path.resolve(__dirname, 'src/blocks/info-card/*.scss'),
          to: path.resolve(__dirname, 'build/blocks/info-card/[name][ext]'),
        },
      ],
    }),
  ],
};