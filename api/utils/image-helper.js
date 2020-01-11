const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');
const base64Img = require('base64-img');
const Helper = require('../utils/helper-node');
const PATH_URL = require('../constants/path-url');
const Logger = require('../logger/logger');

class ImageHelper {
  static saveBase64(base64) {
      try {
        const pathToImage = base64Img.imgSync(base64, PATH_URL.IMG_PATH, uuidv1());
        Logger.info(`Save image to disk: [path = ${pathToImage}]`);
        return path.basename(pathToImage)
      } catch (e) {
        Logger.info(`Error save image to disk: [error = ${e}]`);
        throw new Error(e)
      }
  }
  static removeImage (image) {
    if (Helper.isDefined(image) && Helper.isNotEmpty(image)) {
      Logger.info(`Remove image to disk: [image = ${image}]`);
      fs.unlinkSync(path.resolve(PATH_URL.IMG_PATH, image));
    }
  }
}

module.exports = ImageHelper;
