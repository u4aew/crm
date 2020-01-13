const Sequelize = require("sequelize");
const DB = require('@api/db');

const brands = DB.define('brands', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: true
  },
  image_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

class BrandsModel {
  static getAll () {
    return new Promise((resolve, reject) => {
      brands.findAll()
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
  }

  static create ({title, description, slug, image_id}) {
    return new Promise((resolve, reject) => {
      brands
        .create({
          slug,
          title,
          image_id,
          description
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  static getById (id) {
    return new Promise((resolve, reject) => {
      brands.findOne({where: {id}, raw:true})
        .then((data) => resolve(data))
        .catch((e)=> reject(e));
    });
  }

  static updateById ({id, title, description, slug, image}) {
    return new Promise((resolve, reject) => {
      brands.update({ title, description, slug, image }, {
        where: {
          id
        }
      })
        .then(() => resolve({id, title, description, slug, image}))
        .catch((e)=> {reject(e)})
    })
  }

  static deleteById (id) {
    return new Promise((resolve, reject) => {
      brands.destroy({
        where: {
          id
        }
      })
        .then((res) => resolve(res))
        .catch((e)=> reject(e));
    });
  }

  static getImageCategoryById (id) {
    return new Promise((resolve, reject) => {
      brands.findOne({where: {id}, raw:true})
        .then(({image}) => resolve(image))
        .catch((e)=> reject(e));
    });
  }
}

module.exports = BrandsModel;

