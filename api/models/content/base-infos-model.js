const Sequelize = require("sequelize");
const DB = require('@api/db');

const basicInfos = DB.define('basic_infos', {
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
  description_short: {
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

class BasicInfoModel {
  static create (data) {
    return new Promise((resolve, reject) => {
      basicInfos
        .create(data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
  static getById (id) {
    return new Promise((resolve, reject) => {
      basicInfos.findOne({where: {id}, raw:true})
        .then((data) => resolve(data))
        .catch((e)=> reject(e));
    });
  }

  static deleteById (id) {
    return new Promise((resolve, reject) => {
      basicInfos.findOne({where: {id}, raw:true})
        .then((data) => resolve(data))
        .catch((e)=> reject(e));
    });
  }
}

module.exports = BasicInfoModel;

