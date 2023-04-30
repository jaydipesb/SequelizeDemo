'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag_taggables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tag_taggables.init({
    tagId: DataTypes.INTEGER,
    taggableId: DataTypes.INTEGER,
    taggableType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tag_taggables',
  });
  return tag_taggables;
};