module.exports = (sequelize, DataTypes) => {
    const CustomerOrder = sequelize.define(
        "CustomerOrder",
        {
            totalQuantity: DataTypes.INTEGER,
            totalPrice: DataTypes.INTEGER,
            deliveryAddress:DataTypes.INTEGER
        },
        { sequelize, modelName: "CustomerOrder" }
    );
    CustomerOrder.associate = (models) => {
        CustomerOrder.hasMany(models.CustomerOrderItem, {
            onDelete: "cascade",
          });
          CustomerOrder.hasMany(models.CustomerDelivery, {
            onDelete: "cascade",
          });
          CustomerOrder.hasMany(models.CustomerTransaction, {
            onDelete: "cascade",
          });
    };
    return CustomerOrder;
};
