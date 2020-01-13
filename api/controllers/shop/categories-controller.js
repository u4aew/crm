const Helper = require('@api/utils/helper-node');
const Logger = require('@api/logger/logger');
// models
const ImagesModel = require('@api/models/content/images-model');
const CategoriesModel = require('@api/models/shop/categories-model');

const getCategoriesInfo = async (categories) => {
  let result = [];
  for (const category of categories) {
    let image = {
      title: null
    };
    if (Helper.isDefined(category.image_id)) {
      image = await ImagesModel.getById(category.image_id);
    }
    result.push({title:category.title, id: category.id})
  }
  return result
};

// Получить все категории
exports.getAll = async (req, res) => {
  Logger.info('Get all categories');
  try {
    const categoriesAll = await CategoriesModel.getAll();
    const result = await getCategoriesInfo(categoriesAll);
    Logger.info(`Success get categories: [result = '${result}']`);
    res.json({result})
  } catch (e) {
    Logger.error(`Error get categories: [error = '${JSON.stringify(e)}']`);
    res.status(400).send(e)
  }
};

// Получить категорию по id
exports.getById = async (req, res) => {
  Logger.info(`Get category by id: [query = '${JSON.stringify(req.query)}']`);
  const {id} = req.query;
  try {
    const category = await CategoriesModel.getById(id);
    Logger.info(`Success get category by id: [result = '${JSON.category(category)}']`);
    res.json({result:category})
  } catch (e) {
    Logger.error(`Error get category by id: [error = '${JSON.stringify(e)}']`);
    res.status(400).send(e)
  }
};

// Создать категорию
exports.create = async (req, res) => {
  Logger.info(`Create category: [data = '${JSON.stringify(req.body.data)}']`);
  const { image_base_64 = null } = req.body.data;
  let image = {
    id: null
  };
  try {
    if (Helper.isDefined(image_base_64) && Helper.isNotEmpty(image_base_64)) {
      image = await ImagesModel.create(image_base_64);
    }
    const result = await CategoriesModel.create({...req.body.data, ...{image_id:image.id}});
    Logger.info(`Success create category: [result = '${JSON.stringify(result)}']`);
    res.json({result});
  } catch (e) {
    Logger.error(`Error create category: [error = '${JSON.stringify(e)}']`);
    res.status(400).send(e)
  }
};

// Удалить категорию
exports.deleteById = async (req, res) => {
  try {
    Logger.info(`Delete category by id: [data = '${JSON.stringify(req.body.data)}']`);
    const {id} = req.body.data;
    const {image_id} = await CategoriesModel.getById(id);
    await CategoriesModel.deleteById(id);
    if (Helper.isDefined(image_id)) {
      await ImagesModel.deleteById(image_id);
    }
    Logger.info(`Success delete category by id`);
    res.json({result: 'success'})
  } catch (e) {
    res.status(400).send(e);
  }
};

// Обновить категорию
exports.updateById = async (req, res) => {
  Logger.info(`Update category by id: [data = '${JSON.stringify(req.body.data)}']`);
  const { image_base_64 = null, remove_old_image = false, id } = req.body.data;

  if (remove_old_image) {
    req.body.data.image_id = null
  }

  if (Helper.isDefined(image_base_64) && Helper.isNotEmpty(image_base_64)) {
   const image = await ImagesModel.create(image_base_64);
   req.body.data.image_id = image.id
  }

  const {image_id} = await CategoriesModel.getById(id);
  CategoriesModel.updateById(req.body.data)
    .then(async data => {
      if (remove_old_image) {
        if (Helper.isDefined(image_id)) {
          await ImagesModel.deleteById(image_id);
        }
      }
      Logger.info(`Success update category by id: [result = ${data}]`);
      res.json({result: data})
    })
    .catch(e => {
      Logger.info(`Error update category by id: [result = ${JSON.stringify(e)}]`);
      res.status(400).send(e)
    })
};
