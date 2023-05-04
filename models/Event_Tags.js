'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event_tags.init({
    eventId: DataTypes.STRING,
    tagId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event_tags',
    paranoid:true
  });
  return Event_tags;
};