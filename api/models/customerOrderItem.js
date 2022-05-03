module.exports = (sequelize, DataTypes) => {
  const CustomerOrderItem = sequelize.define(
    "CustomerOrderItem",
    {
      cartItem: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    { sequelize, modelName: "CustomerOrderItem" }
  );
  CustomerOrderItem.associate = (models) => {
    CustomerOrderItem.belongsTo(models.CustomerOrder, {
      foreighKey: {
          allowNull: false,
      },
  });
  CustomerOrderItem.belongsTo(models.tbl_userdetail, {
    foreignKey: {
      name: "SellerId",
      allowNull: false,
    },
  });
  CustomerOrderItem.belongsTo(models.tbl_sellproducts, {
    foreignKey: {
      name: "ProductId",
      allowNull: false,
    },
  });
  CustomerOrderItem.belongsTo(models.CustomerDelivery, {
    foreignKey: {
      name: "DeliveryId",
      allowNull: false,
    },
  });
  CustomerOrderItem.belongsTo(models.CustomerAddress, {
    foreignKey: {
      name: "AddressId",
      allowNull: false,
    },
  });
  };
  return CustomerOrderItem;
};
