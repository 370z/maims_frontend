'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dbrealtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.tbl_dbRealtime.belongsTo(models.tbl_userserial, {
        foreignKey: {
          name: "serial_id",
          allowNull: false,
        },
      });
      models.tbl_dbRealtime.belongsTo(models.User, {
        foreignKey: {
          name: "user_id",
          allowNull: false,
        },
      });
    }
  };
  dbrealtime.init({
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
    modelName: 'tbl_dbRealtime',
  });
  return dbrealtime;
};