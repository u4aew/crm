const Helper = require('@api/utils/helper-node');
const ImageHelper = require('@api/utils/image-helper');

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
  try {
    const categoriesAll = await CategoriesModel.getAll();
    const result = await getCategoriesInfo(categoriesAll);
    res.json({result})
  } catch (e) {
    res.status(400).send(e)
  }
};

// Создать категорию
exports.create = async (req, res) => {
  const { image_base_64 = null } = req.body.data;
  let image = {
    id: null
  };
  try {
    if (Helper.isDefined(image_base_64) && Helper.isNotEmpty(image_base_64)) {
      image = await ImagesModel.create(image_base_64);
    }
    const result = await CategoriesModel.create({...req.body.data, ...{image_id:image.id}});
    res.json({result});
  } catch (e) {
    res.status(400).send(e)
  }
};

// Удалить категорию
exports.deleteById = async (req, res) => {
  try {
    const {id} = req.body.data;
    const {basic_info_id} = await CategoriesModel.getById(id);

    await CategoriesModel.deleteById(id);

    res.json({result: 'success'})
  } catch (e) {
    res.status(400).send(e);
  }
};

// Обновить категорию
exports.updateById = async (req, res) => {
  const {id, image_base_64 = null, image = null} = req.body.data;
  const currentImageCategory = await CategoriesModel.getImageCategoryById(id);

  if (Helper.isDefined(image_base_64) && Helper.isNotEmpty(image_base_64)) {
    try {
      req.body.data.image = ImageHelper.saveBase64(image_base_64);
      ImageHelper.removeImage(currentImageCategory);
    } catch (e) {
      res.status(400).send(e);
      return
    }
  }

  if (!Helper.isDefined(image_base_64) && !Helper.isDefined(image)) {
    try {
      ImageHelper.removeImage(currentImageCategory);
      req.body.data.image = null
    } catch (e) {
      res.status(400).send(e);
      return
    }
  }

  CategoriesModel.updateById(req.body.data)
    .then(data => res.json({result: data}))
    .catch(e => res.status(400).send(e))
};
