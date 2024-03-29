const DB = require('@api/db');
const Sequelize = require("sequelize");

const ImageHelper = require('@api/utils/image-helper');


const images = DB.define('images', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

class imagesModel {
  static create (image_base_64) {
    return new Promise((resolve, reject) => {
      // Сохранение на диск
      let title;
      try {
         title = ImageHelper.saveBase64(image_base_64);
      } catch (e) {
        reject(e);
        return
      }
      images
        .create({title}, {raw:true})
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        });
    });
  }
  static getById (id) {
    return new Promise((resolve, reject) => {
      images.findOne({where: {id}, raw:true})
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    });
  }

  static async deleteById (id) {
    console.log('test 1')
    const image = await this.getById(id);
    console.log('test 2')
    ImageHelper.removeImage(image.title);

    console.log('test 3')

    return new Promise((resolve, reject) => {
      images.destroy({
        where: {
          id
        }
      })
        .then((res) => {
          console.log(res);
          resolve(res)
        })
        .catch((e)=> {
          console.log(e);
          reject(e)
        });
    });
  }
}

module.exports = imagesModel;
