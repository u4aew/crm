'user strict';

const Sequelize = require("sequelize");

const sequelize = new Sequelize('shop', 'root', '', {
  dialect: "mysql",
  host: "192.168.0.197",
  define: {
    timestamps: false
  }
});
sequelize.sync();
module.exports = sequelize;
