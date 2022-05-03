'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dblist extends Model {
    static associate(models) {
      models.tbl_dbList.belongsTo(models.tbl_userserial, {
        foreignKey: {
          name: "serial_id",
          allowNull: false,
        },
      });
      models.tbl_dbList.belongsTo(models.User, {
        foreignKey: {
          name: "user_id",
          allowNull: false,
        },
      });
    }
  };
  dblist.init({
    temp: DataTypes.DOUBLE,
    humi: DataTypes.INTEGER,
    light_int: DataTypes.INTEGER,
    ec: DataTypes.DOUBLE,
    ph: DataTypes.DOUBLE,
    water_level: DataTypes.DOUBLE,
    pump_a: DataTypes.TINYINT(1),
    pump_b: DataTypes.TINYINT(1),
    pump_c: DataTypes.TINYINT(1),
    pump_d: DataTypes.TINYINT(1),

  }, {
    sequelize,
    modelName: 'tbl_dbList',
  });
  return dblist;
};