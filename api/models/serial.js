'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class serial extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    serial.init({
        serial: DataTypes.STRING,
        status: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'tbl_Serial',
    });
    return serial;
};