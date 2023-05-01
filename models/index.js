"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js" &&
            file.indexOf(".test.js") === -1
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Users = require("./users")(sequelize, Sequelize.DataTypes);
db.Posts = require("./post")(sequelize, Sequelize.DataTypes);
db.tags = require("./tags")(sequelize, Sequelize.DataTypes);
db.event = require("./event")(sequelize, Sequelize.DataTypes);
db.employee = require("./employee")(sequelize, Sequelize.DataTypes);
db.Event_tags = require("./event_tags")(sequelize, Sequelize.DataTypes);

db.Users.addScope("chechStatus", {
    where: {
        status: 1,
    },
});

//one to one relationship example
db.Users.hasOne(db.Posts, { foreignKey: "user_id", as: "postdetails" });
db.Posts.belongsTo(db.Users, { foreignKey: "user_id", as: "userdetails" });

// one to many relationship example
// db.Users.hasMany(db.Posts, { foreignKey: "user_id", as: "posdetails" }); //default userid
// db.Posts.belongsTo(db.Users, { foreignKey: "user_id", as: "UserInfo" });

// db.Users.hasMany(db.Posts, { foreignKey: "user_id" }); //default userid
// db.Posts.belongsTo(db.Users, { foreignKey: "user_id"});

//add scope in relationshio
// db.Posts.belongsTo(db.Users.scope('chechStatus'), { foreignKey: "user_id", as: "UserInfo" });

// many to many relationship example
// db.event.belongsToMany(db.tags, { through: "Event_tags" , as:"tagsDetail"});
// db.tags.belongsToMany(db.event, { through: "Event_tags" ,as: 'eventDetail'});

//polymorphic one to many associations

db.image = require("./image")(sequelize, Sequelize.DataTypes);
db.video = require("./video")(sequelize, Sequelize.DataTypes);
db.comment = require("./comments")(sequelize, Sequelize.DataTypes);

db.image.hasMany(db.comment, {
    foreignKey: "commenttableId",
    constraints: false,
    scope: {
        commenttableType: "image",
    },
});

db.video.hasMany(db.comment, {
    foreignKey: "commenttableId",
    constraints: false,
    scope: {
        commenttableType: "video",
    },
});

db.comment.belongsTo(db.image, {
    foreignKey: "commenttableId",
    constraints: false,
});
db.comment.belongsTo(db.video, {
    foreignKey: "commenttableId",
    constraints: false,
});

//polymorphic many to many relationship
// db.tag_taggable = require("./tag_taggables")(sequelize, Sequelize.DataTypes);

// //image to tag relation polymorphic many to many
// db.image.belongsToMany(db.tags, {
//     through: {
//         model: db.tag_taggable,
//         unique: false,
//         scope: {
//             taggableType: "image",
//         },
//     },
//     foreignKey: "taggableId",
//     constraints: false,
// });

// //tag to image many to many polymorphic relationship

// db.tags.belongsToMany(db.image, {
//     through: {
//         model: db.tag_taggable,
//         unique: false,
//         scope: {
//             taggableType: "image",
//         },
//     },
//     foreignKey: "tagId",
//     constraints: false,
// });



// //video to tag
// db.video.belongsToMany(db.tags, {
//     through: {
//         model: db.tag_taggable,
//         unique: false,
//         scope: {
//             taggableType: "video",
//         },
//     },
//     foreignKey: "taggableId",
//     constraints: false,
// });


// //tag to video

// db.tags.belongsToMany(db.video, {
//     through: {
//         model: db.tag_taggable,
//         unique: false,
//         scope: {
//             taggableType: "video",
//         },
//     },
//     foreignKey: "tagId",
//     constraints: false,
// });







db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;