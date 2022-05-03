"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sellproducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.tbl_sellproducts.belongsTo(models.tbl_userdetail, {
        foreignKey: {
          name: "SellerId",
          allowNull: false,
        },
      });
    }
  }

  sellproducts.init(
    {
      productname: DataTypes.STRING,
      productdetail: DataTypes.TEXT,
      productprice: DataTypes.INTEGER,
      productnumber: DataTypes.INTEGER,
      producttab: DataTypes.STRING,
      productimg: DataTypes.STRING,
      productstatus: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "tbl_sellproducts",
    }
  );
  return sellproducts;
};
