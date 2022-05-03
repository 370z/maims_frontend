'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class serial extends Model {
    static associate(models) {

    }
  };
  serial.init({
    name: DataTypes.STRING,
    serial: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tbl_userserial',
    scopes: {
      withoutPassword: {
          attributes: {
              exclude: ["createAt","updateAt"],
          },
      },
  },
  });
  return serial;
};

