module.exports = (sequelize, DataTypes) => {
  const CustomerProfile = sequelize.define(
    "CustomerProfile",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      displayName: DataTypes.STRING,
      fullName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      sex: DataTypes.INTEGER,
      // CustomerId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   unique: true,
      // },
    },
    { sequelize, modelName: "CustomerProfile" }
  );
  CustomerProfile.associate = (models) => {
    CustomerProfile.belongsTo(models.Customer, {
      foreighKey: {
        allowNull: false,
      },
    });
  };
  return CustomerProfile;
};
