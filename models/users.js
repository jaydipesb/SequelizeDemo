"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Users.init({
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            // defaultValue: 'test@gmail.com',
            allowNull: false,
            unique: true
        },
        gender: DataTypes.STRING,
        status: {
           type: DataTypes.INTEGER,
           defaultValue:0,
        },
    }, {
        sequelize,
        modelName: "Users",
        paranoid:true
    });
    return Users;
};