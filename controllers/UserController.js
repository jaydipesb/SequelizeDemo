const db = require("../models/Index");
const { Sequelize, Op, QueryTypes, Model, DataTypes } = require("sequelize");

const Users = db.Users;
const Posts = db.Posts;
const Event = db.event;
const Tags = db.tags;
const Employee = db.employee;
const Image = db.image;
const Video = db.video;
const Comment = db.comment;
const sequelize = db.sequelize;

//1.create user
const addUser = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        // add user
        let info = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
        };
        const user = await Users.create(info, { transaction: t })
            .then(() => {
                console.log("user created  succesfully");
            })
            .catch((error) => {
                console.log("error while createting user", error);
            });
        res.status(200).send(user);

        // console.log(user);

        //add one to one relationship data
        // const user = await Users.create(
        //   {
        //     name: req.body.name,
        //     email: req.body.email,
        //     status: req.body.status,
        //     gender: req.body.gender,
        //     posdetails: [
        //       {
        //         title: req.body.title,
        //         description: req.body.description,
        //       },
        //     ],
        //   },
        //   {
        //     include: [{ model: Posts, as: "postdetails" }],
        //   }
        // );
        // .then(() => {
        //   console.log("user created  succesfully");
        // })
        // .catch((error) => {
        //   console.log("error while createting user", error);
        // });

        // Add one to many realtionship data
        // let postDetail = req.body.post;
        // const user = await Users.create(
        //   {
        //     name: req.body.name,
        //     email: req.body.email,
        //     gender: req.body.gender,
        //     posdetails: [...postDetail],
        //   },
        //   { include: [{ model: Posts, as: "posdetails" }] }
        // ) .then(() => {
        //   console.log("user created  succesfully");
        // })
        // .catch((error) => {
        //   console.log("error while createting user", error);
        // });

        // add many to many relationship data
        // let postDetail = req.body.tags;
        // const user = await Event.create(
        //   {
        //     eventName: req.body.eventName,
        //     eventTitle: req.body.eventTitle,
        //     tagsDetail: [...postDetail],
        //   },
        //   { include: [{ model: Tags, as: "tagsDetail" }] }
        // );

        //Add polymorphic one to many
        // const user = await Image.create(
        //   {
        //     title: req.body.title,
        //     url: req.body.url,
        //     commentDetails: {
        //       title: req.body.tit,
        //     },
        //   },
        //   { include: [{ model: Comment, as: "commentDetails" }] }
        // );

        //Hooks example
        // let user = await Users.create({
        //     name: req.body.name,
        //     email: req.body.email,
        //     gender: req.body.gender,
        // });
        // res.status(200).send(user);
        await t.commit();
        // });
    } catch (error) {
        console.log(error);
        await t.rollback();
    }
};

// 2. get all records
const getAllUsers = async (req, res) => {
    try {
        // let users = await Users.findAll({
        //     attributes: [
        //         'name', ['email', 'emailID'],
        //         'gender',
        //         //  [Sequelize.fn('count', Sequelize.col('email')), 'emailCount']
        //         [Sequelize.fn('CONCAT', Sequelize.col('email'), 'test'), 'emailCount']
        //     ]
        // })
        // .then(() => {
        //   console.log("user fetch succesfully");
        // })
        // .catch((error) => {
        //   console.log("error while fetching user", error);
        // });

        //include-exclude in query
        // let users = await Users.findAll({
        //     attributes: {
        //         exclude: ["createdAt", "updatedAt"],
        //         include: [
        //             [
        //                 Sequelize.fn("CONCAT", Sequelize.col("name"), " Bhetariya"),
        //                 "fullname",
        //             ],
        //         ],
        //     },
        // });

        //condition query
        // let users = await Users.findAll({
        //     where: {
        //         //id: 2
        //         id: {
        //             [Op.gt]: 2,
        //         },
        //         // email: {
        //         //     [Op.like]: '%@gmail.com%'
        //         // }
        //     },
        //     order: [
        //         ["name", "DESC"],
        //         // ['email', 'DESC']
        //     ],
        //     group: ['name'],
        //     limit: 2,
        //     offset: 1
        // });

        // let users = await Users.findAll({});
        // let users = await Users.findOne({});
        // let users = await Users.findByPk(5);
        // let users = await Users.findAndCountAll({
        //     where: {
        //         email: 'jaydip@gmail.com'
        //     }
        // })
        // let [users, created] = await Users.findOrCreate({
        //     where: { name: 'mahesh' },
        //     defaults: {
        //         email: 'dummy@gmail.com',
        //         gender: 'Male'
        //     }
        // })
        // let response = {
        //     data: users,
        //     add: created
        // }

        //one-to-one relationship data

        // hasone relationship example
        // let users = await Users.findAll({
        //   attributes: ["name", "email"],
        //   include: [
        //     {
        //       model: Posts,
        //       as: "postdetails",
        //       attributes: ["title", ["description", "desc"]],
        //     },
        //   ],
        //   where: { id: 5 },
        // });

        //belongs to one relationship example
        // let users = await Posts.findAll({
        //     attributes: ['title', 'description'],
        //     include: [{
        //         model: Users,
        //         as: 'userdetails',
        //         attributes: ['name', 'email', 'gender']
        //     }]
        // });

        //one to many relationship example
        // let users = await Users.findAll({
        //     attributes: ['name', 'email'],
        //     include: [{
        //         model: Posts,
        //         as: 'posdetails',
        //         attributes: ['title', ['description', 'desc']]
        //     }],
        //     where: { id: 30 }
        // });

        //many to many relationship example
        // let users = await Event.findAll({
        //   include: [
        //     {
        //       model: Tags,
        //       as: "tagsDetail",
        //     },
        //   ],
        // });

        //scope in relationship
        // let users = await Users.scope(['chechStatus']).findAll({})
        // let users = await Posts.findAll({
        //     include:[{
        //         model:Users,
        //         as:'UserInfo'
        //     }]
        // })

        //include scope
        // let users = await Users.scope([
        //   "includePost",
        //   "selectUsers",
        //   "limitCheck",
        // ]).findAll({});

        //polymorohic one to many association
        //image to comment
        // let users = await Image.findAll({
        //     include: [{
        //         model: Comment
        //     }]
        // });

        //video to comment
        // let users = await Video.findAll({
        //     include: [{
        //         model: Comment
        //     }]
        // });

        //comment to video/image
        // let users = await Comment.findAll({
        //     include: [Image, Video]
        // });

        //polymorphic many to many relationship

        //image to tag
        // let users = await Image.findAll({
        //     include: [Tags]
        // });

        //video to tag
        // let users = await Video.findAll({
        //     include: [Tags]
        // });

        //tag to image ot video
        let users = await Tags.findAll({
            include: [Video, Image],
        });

        res.status(200).send(users);
    } catch (error) {
        console.log(error);
    }
};

//3. get single user
const getOneUser = async (req, res) => {
    try {
        let id = req.params.id;
        let user = await Users.findOne({ where: { id: id } });
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
};

//4. update user
const updateUser = async (req, res) => {
    //one user update
    let id = req.params.id;
    // const user = await Users.update(req.body, { where: { id: id } });
    // res.status(200).send(user);

    //one to one relationship data update
    // try {

    //   let id = req.params.id;
    //   const user = await Users.update(
    //     {
    //       name: req.body.name,
    //       email: req.body.email,
    //       gender: req.body.gender
    //     },
    //     {
    //       where: { id: id },
    //     }
    //   );
    //   if (user) {
    //     await Posts.update(
    //       {
    //         title: req.body.title,
    //         description: req.body.description,
    //       },
    //       {
    //         where: { id: id },
    //       }
    //     );
    //   }
    // res.status(200).send(user);
    // } catch (error) {
    //   console.log(error);
    // }

    try {
        // one to many relationship data update
        let id = req.params.id;
        const user = await Users.update(
            {
                name: req.body.name,
            },
            {
                where: { id: id },
            }
        );
        let postDetail = req.body.post;
        let postId = [...postDetail];
        console.log(postId[0].id);
        if (user) {
            for (i = 0; i < postId.length; i++) {
                await Posts.update(
                    {
                        title: postId[i].title,
                        description: postId[i].description,
                    },
                    {
                        where: { user_id: id, id: postId[i].id },
                    }
                );
            }
        }

        res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
};

//5.delete user by id
const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        const userData = await Users.findOne({
            where: {
                id,
                id,
            },
        });

        if (userData) {
            const user = await Users.destroy({
                where: {
                    id: id,
                },
            })
                .then(() => {
                    console.log("user deleted succesfully");
                })
                .catch((error) => {
                    console.log("error while deleting user", error);
                });

            await Posts.destroy({
                where: {
                    id: id,
                },
            });
        }

        res.status(200).send("user deleted succesfully");
    } catch (error) {
        console.log(error);
    }
};

//row query
const rawQuery = async (req, res) => {
    let users = await db.sequelize.query("select * from users", {
        type: QueryTypes.SELECT,
    });
    let response = {
        data: "row query",
        record: users,
    };
    res.status(200).send(response);
};

//pagination query
const pagination = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        let id = req.params.id;
        console.log(id);

        let limit = 10;
        let offset = (id - 1) * limit;
        let user = await Users.findAll(
            {
                limit: limit,
                offset: offset,
                order: [["name", "ASC"]],
            },
            { transaction: t }
        );
        console.log(user);
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        await t.rollback();
    }
};

module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    rawQuery,
    pagination,
};
