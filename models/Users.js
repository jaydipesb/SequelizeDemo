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
  Users.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      gender: DataTypes.STRING,
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Users",
      paranoid: true,
      // hooks:{
      //     beforeValidate:(user,options)=>{
      //        user.name= 'dummy test data';
      //     },
      //     afterValidate:(user,options)=>{
      //         user.name='Prince';
      //     }
      // }
    }
  );

//   Users.addHook('beforeValidate', 'customName', (users, options) => {
//     users.name = "new hook";
//   });

//   Users.afterValidate("myHookLast", (users, options) => {
//     // users.name = "new hook after";
//     //remove hook
//     users.removeHook('beforeValidate','customName')
//   });
  return Users;
};
