'use strict';
module.exports = (sequelize, DataTypes) => {
    const tbl_userdetail = sequelize.define('tbl_userdetail', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        detail: DataTypes.STRING,
        img: DataTypes.STRING,
        status_level: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "tbl_userdetail",
        scopes: {
            withoutPassword: {
                attributes: {
                    exclude: ["createAt","updateAt"],
                },
            },
        },
    });
    return tbl_userdetail;
};