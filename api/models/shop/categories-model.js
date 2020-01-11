const Sequelize = require('sequelize');
const DB = require('@api/db');

const categories = DB.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  basic_info_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  parent_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});


class CategoriesModel {
  static create (basic_info_id, parent_id) {
    return new Promise((resolve, reject) => {
      categories
        .create({
          basic_info_id,
          parent_id
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
  static updateById ({id, title, description, slug, image, parent_id}) {
    return new Promise((resolve, reject) => {
      categories.update({ title, description, slug, image, parent_id }, {
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
