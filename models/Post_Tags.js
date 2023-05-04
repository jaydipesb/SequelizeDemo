'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post_tags extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Post_tags.init({
        postId: DataTypes.INTEGER,
        tagId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Post_tags',
        paranoid:true
    });
    return Post_tags;
};