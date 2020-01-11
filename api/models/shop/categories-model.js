const Sequelize = require('sequelize');
const DB = require('@api/db');

const categories = DB.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  slug: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  title: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  image_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  description: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  parent_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});


class CategoriesModel {
  static create ({title, description, image_id, slug, parent_id}) {
    return new Promise((resolve, reject) => {
      categories
        .create({
          slug,
          title,
          image_id,
          parent_id,
          description
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  static getAll () {
    return new Promise((resolve, reject) => {
      categories.findAll()
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
  }
  static updateById ({id, title, description, slug, image_id, parent_id}) {
    return new Promise((resolve, reject) => {
      categories.update({ title, description, slug, image_id, parent_id }, {
        where: {
          id
        }
      })
        .then(() => resolve({id, title, description, slug, image, parent_id}))
        .catch((e)=> {reject(e)})
    })
  }

  static deleteById (id) {
    return new Promise((resolve, reject) => {
      categories.destroy({ where: {id}})
        .then((res) => resolve(res))
        .catch((e)=> reject(e));
    });
  }

  static getById (id) {
    return new Promise((resolve, reject) => {
      categories.findOne({where: {id}, raw:true})
        .then((data) => resolve(data))
        .catch((e)=> reject(e));
    });
  }
}

module.exports = CategoriesModel;
