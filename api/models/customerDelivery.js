module.exports = (sequelize, DataTypes) => {
    const CustomerDelivery = sequelize.define(
      "CustomerDelivery",
      {
        deliveryProvider: DataTypes.STRING,
        orderStatus: DataTypes.STRING,
        estimatedDelivery: DataTypes.STRING,
      },
      { sequelize, modelName: "CustomerDelivery" }
    );
    CustomerDelivery.associate = (models) => {
        CustomerDelivery.belongsTo(models.CustomerOrder, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
    return CustomerDelivery;
  };
  

