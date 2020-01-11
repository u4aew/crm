const Helper = require('@api/utils/helper-node');
const Logger = require('@api/logger/logger');


const BrandsModel = require('@api/models/shop/brands-model');

// Получить все бренды
exports.getAll = (req, res) => {
  Logger.info(`   Get brands`);
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
exports.create = (req, res) => {
  Logger.info(`   Create brand: [data = ${JSON.stringify(req.body.data)}]`);
  let bodyData = req.body.data;
  let {title, slug, image_base_64 = null, description = null, image = null} = bodyData;

  // Сохраняем изображение, если передали
  if (Helper.isDefined(image_base_64)) {
    image = ImageHelper.saveBase64(image_base_64)
  }

  BrandsModel.create({
    slug,
    title,
    image,
    description,
  })
    .then(data => {
      Logger.info(`Success create brand`);
      res.json({result:data})
    })
    .catch(e => {
      Logger.info(`Error create brand: [error = ${e}]`);
      res.status(400).send(e)
    })
};


// Удалить бренд
exports.deleteById = (req, res) => {
  Logger.info(`    Remove brand: [id = ${req.body.data.id}]`);
  BrandsModel.deleteById(req.body.data.id)
    .then(() => {
      Logger.info(`Success remove brand`);
      res.json({result: 'success'})
    })
    .catch((e)=> {
      Logger.error(`Error remove brand: [e = '${e}']`);
      res.status(400).send(e)
    })
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
      Logger.info('Success update brand');
      res.json({result: data})
    })
    .catch(e => {
      Logger.error(`Error update brand: [error = '${e}']`);
      res.status(400).send(e)
    })
};
