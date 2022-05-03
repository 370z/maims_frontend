'use strict';
module.exports = (sequelize, DataTypes) => {
    const tbl_useraccountbank = sequelize.define('tbl_useraccountbank', {
        namebank: DataTypes.STRING,
        nameaccountTH: DataTypes.STRING,
        nameaccountEN: DataTypes.STRING,
        numberaccount: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "tbl_useraccountbank",
        scopes: {
            withoutPassword: {
                attributes: {
                    exclude: ["createAt","updateAt"],
                },
            },
        },
    });
    return tbl_useraccountbank;
};