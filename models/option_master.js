'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option_Master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Option_Master.init({
    sid: DataTypes.INTEGER,
    o_name: DataTypes.STRING,
    o_value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Option_Master',
    paranoid:'true'
  });
  return Option_Master;
};