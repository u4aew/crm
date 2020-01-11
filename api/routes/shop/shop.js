const express = require('express');
const router = express.Router();

const CategoriesController = require('@api/controllers/shop/categories-controller');
const BrandsController = require('@api/controllers/shop/brands-controller');

// categories
router.get('/categories/', CategoriesController.getAll);
router.post('/categories/create', CategoriesController.create);
router.post('/categories/delete', CategoriesController.deleteById);
router.post('/categories/update', CategoriesController.updateById);


// brands
router.get('/brands/', BrandsController.getAll);
router.post('/brands/create', BrandsController.create);
router.post('/brands/delete', BrandsController.deleteById);
router.post('/brands/update', BrandsController.updateById);

module.exports = router;
