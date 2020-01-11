'use strict';

const pathUrl = require('path');

// Глобальный API
const ROOT = pathUrl.resolve(__dirname, '..');

// Ресурсы
const IMG_PATH = pathUrl.resolve(ROOT, 'images');

module.exports = {
  ROOT,
  IMG_PATH
};
