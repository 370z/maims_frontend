'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "User",
        scopes: {
            withoutPassword: {
                attributes: {
                    exclude: ["password"],
                },
            },
        },
    });

    User.associate = function(models) {
        User.hasOne(models.tbl_userdetail, {
            onDelete: 'cascade',
        });
        models.tbl_userdetail.belongsTo(User, {});

        User.hasMany(models.tbl_userserial, {
            onDelete: 'cascade',
        });
        models.tbl_userserial.belongsTo(User, {});

        User.hasMany(models.tbl_useraccountbank, {
            onDelete: 'cascade',
        });
        models.tbl_useraccountbank.belongsTo(User, {});
    };
    return User;
};