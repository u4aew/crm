const Helper = require('../utils/helper-node');
const csv = require('csv-parser');
const fs = require('fs');
const results = [];
const ShopBrands = require('../models/shop/shop-brands');
const cyrillicToTranslit = require('cyrillic-to-translit-js');

fs.createReadStream('catalog.csv')
  .pipe(csv(
    {
      separator: ';',
      headers:[
        'Код товара"',
        'Артикул',
        'Название',
        'Отпускная цена',
        'Валюта',
        'Бренд',
        'Категории (через запятую)',
        'Ссылка на товар',
        'Ссылка на фото',
        'Краткое описание',
        'Доступен для заказа (1/0)',
        'Категории (расш.)']}
    ))
  .on('data', (data) => results.push(data))
  .on('end', () => {

    let brands = {};
    results.forEach((item) => {
      if (Helper.isEmpty(item['Бренд'])) {
        brands.NO_NAME = true
      } else {
        let brand = item['Бренд'];
        brands[`${brand}`] = true
      }
    });

    Object.keys(brands).forEach((name) => {
      ShopBrands.create({title:name, slug: cyrillicToTranslit().transform(name.trim().replace(' /', ''), '-').toLowerCase()});
    })
  });
