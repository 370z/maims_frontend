'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbl_sellproducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sell_id: {
        type: Sequelize.STRING
      },
      productimg: {
        type: Sequelize.BLOB
      },
      productname: {
        type: Sequelize.STRING
      },
      productdetail: {
        type: Sequelize.TEXT
      },
      productprice: {
        type: Sequelize.INTEGER
      },
      productnumber: {
        type: Sequelize.INTEGER
      },
      producttab: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sellproducts');
  }
};