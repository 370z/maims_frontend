'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  order.init({
    nameuser: DataTypes.STRING,
    addressuser: DataTypes.STRING,
    teluser: DataTypes.STRING,
    lists_order: DataTypes.STRING,
    totalpice_order: DataTypes.INTEGER,
    status_order: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'tbl_order',
  });
  return order;
};