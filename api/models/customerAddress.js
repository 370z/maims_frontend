module.exports = (sequelize, DataTypes) => {
  const CustomerAddress = sequelize.define(
    "CustomerAddress",
    {
      fullName: DataTypes.STRING,
      streetAddress: DataTypes.STRING,
      district: DataTypes.STRING,
      province: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    { sequelize, modelName: "CustomerAddress" }
  );
  CustomerAddress.associate = (models) => {
    CustomerAddress.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return CustomerAddress;
};
