module.exports = (sequelize, DataTypes) => {
    const CustomerTransaction = sequelize.define(
      "CustomerTransaction",
      {
        paymentToken: DataTypes.TEXT('long'),
        orderNo: DataTypes.TEXT('long'),
      },
      { sequelize, modelName: "CustomerTransaction" }
    );
    CustomerTransaction.associate = (models) => {
        CustomerTransaction.belongsTo(models.CustomerOrder, {
        foreighKey: {
            allowNull: false,
        },
    });
    };
    return CustomerTransaction;
  };
  