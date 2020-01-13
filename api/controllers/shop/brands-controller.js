const Helper = require('@api/utils/helper-node');
const Logger = require('@api/logger/logger');

// models
const ImagesModel = require('@api/models/content/images-model');
const BrandsModel = require('@api/models/shop/brands-model');

// Получить все бренды
exports.getAll = (req, res) => {
  Logger.info(`Get brands`);
  BrandsModel.getAll()
    .then(data => {
      Logger.info(`Success get brands: [data = '${JSON.stringify(data)}']`);
      res.json({result:data})
    })
    .catch(error => {
      Logger.info(`Error get brands: [error = '${error}']`);
      res.status(400).send(error)
    })
};

// Создать бренд
exports.create = async (req, res) => {
  Logger.info(`Create brand: [data = '${JSON.stringify(req.body.data)}']`);
  const { image_base_64 = null } = req.body.data;
  let image = {
    id: null
  };
  try {
    if (Helper.isDefined(image_base_64) && Helper.isNotEmpty(image_base_64)) {
      image = await ImagesModel.create(image_base_64);
    }
    const result = await BrandsModel.create({...req.body.data, ...{image_id:image.id}});
    Logger.info(`Success create brand: [result = '${JSON.stringify(result)}']`);
    res.json({result});
  } catch (e) {
    Logger.error(`Error create brand: [error = '${JSON.stringify(e)}']`);
    res.status(400).send(e)
  }
};


// Удалить бренд
exports.deleteById = async (req, res) => {
  try {
    Logger.info(`Delete brand by id: [data = '${JSON.stringify(req.body.data)}']`);
    const {id} = req.body.data;
    const {image_id} = await BrandsModel.getById(id);
    await BrandsModel.deleteById(id);
    if (Helper.isDefined(image_id)) {
      await ImagesModel.deleteById(image_id);
    }
    Logger.info(`Success delete brand by id`);
    res.json({result: 'success'})
  } catch (e) {
    Logger.error(`Error create category: [error = '${JSON.stringify(e)}']`);
    res.status(400).send(e);
  }
};


// Обновить информацию о бренде
exports.updateById = async (req, res) => {
  Logger.info(`   Update brand: [data = ${JSON.stringify(req.body.data)}]`);

  const {id, image_base_64 = null, image = null} = req.body.data;
  const currentImageCategory = await BrandsModel.getImageCategoryById(id);

  if (Helper.isDefined(image_base_64) && Helper.isNotEmpty(image_base_64)) {
    try {
      ImageHelper.removeImage(currentImageCategory);
      req.body.data.image = ImageHelper.saveBase64(image_base_64);
    } catch (e) {
      res.status(400).send(e);
      Logger.error(`Error update image: [error = ${e}]`);
      return
    }
  }

  if (!Helper.isDefined(image_base_64) && !Helper.isDefined(image)) {
    try {
      ImageHelper.removeImage(currentImageCategory);
      req.body.data.image = null
    } catch (e) {
      res.status(400).send(e);
      Logger.error(`Error update image: [error = ${e}]`);
      return
    }
  }

  BrandsModel.updateById(req.body.data)
    .then(data => {
      Logger.info(`Success update brand: [result = '${data}']`);
      res.json({result: data})
    })
    .catch(e => {
      Logger.error(`Error update brand: [error = '${JSON.stringify(e)}']`);
      res.status(400).send(e)
    })
};
