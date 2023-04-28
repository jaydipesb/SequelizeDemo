const employee = require("../models/employee");
const event = require("../models/event");
const db = require("../models/index");
const { Sequelize, Op, QueryTypes, Model } = require("sequelize");
// const { sequelize } = require("sequelize");
const Users = db.Users;
const Posts = db.Posts;

const Event = db.event;
const Tags = db.tags;
const Employee = db.employee;


//1.create user
const addUser = async (req, res) => {
  try {
    //add user
    // let info = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     gender: req.body.gender,
    // };
    // const user = await Users.create(info);
    // res.status(200).send(user);

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
    //     include: [{ model: Posts, as: "posdetails" }],
    //   }
    // );

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
    // );

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


  //   searching query
  //   let name = req.body.name;
  //  let user = await Users.findAll({
  //   where: {
  //     name: {
  //       [Op.like]: `${name}`
  //     }
  //   }
  //  });




    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

//2. get all userrs

// const getAllUsers = async(req, res) => {
//     //get All recoerds
//     let users = await Users.findAll({});
//     console.log("..........", users);
//     res.status(200).send(users);

//     //get specific  record
//     // let users = await Users.findAll({
//     //     attributes:[
//     //         'id',
//     //         'name',
//     //         'email'
//     //     ]
//     // })
// };

//GET SPECIFIC QUERY RECORD
const getAllUsers = async (req, res) => {
  try {
    // let users = await Users.findAll({
    //     attributes: [
    //         'name', ['email', 'emailID'],
    //         'gender',
    //         //  [Sequelize.fn('count', Sequelize.col('email')), 'emailCount']
    //         [Sequelize.fn('CONCAT', Sequelize.col('email'), 'test'), 'emailCount']
    //     ]
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
    //         //     [Op.eq]: 'jaydip@gmail.com'
    //         //         // [Op.like]: '%@gmail.com%'
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
    let users = await Users.findAll({
      attributes: ["name", "email"],
      include: [
        {
          model: Posts,
          as: "postdetails",
          attributes: ["title", ["description", "desc"]],
        },
      ],
      where: { id: 5 },
    });

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
    //one to many relationship data update
    // let id = req.params.id;
    // const user = await Users.update(
    //   {
    //     name: req.body.name,
    //   },
    //   {
    //     where: { id: id },
    //   }
    // );
    // let postDetail = req.body.post;
    // let postId = [...postDetail];
    // console.log(postId[0].id);
    // if (user) {
    //   for (i = 0; i < postId.length; i++) {
    //     await Posts.update(
    //       {
    //        title: postId[i].title,
    //        description:postId[i].description
    //       },
    //       {
    //         where: { user_id: id, id: postId[i].id },
    //       }
    //     );
    //   }
    // }

    //emplyee update
    // let id = req.params.id;
    // let user = await Employee.update(
    //   {
    //     name: req.body.name,
    //     email: req.body.email,
    //   },
    //   {
    //     where: { id: id },
    //   }
    // );

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

//5.delete user by id
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    const user = await Users.destroy({ where: { id: id } });
    res.status(200).send("user deleted succesfully");
  } catch (error) {
    console.log(error);
  }
};

//searching query
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

//one to one relationship
const onetoone = async (req, res) => {
  try {
    let data = await Users.findAll({});
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};



//pagination query
const pagination = async (req, res) => {
  // const t = await sequelize.transaction();
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
      // { transaction: t }
    );
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    // await t.rollback();
  }
};

//delete employee
const deleteEmployee = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    //soft deleted
    let user = await Employee.destroy({
      where: {
        id: id,
      },
    });
    // console.log(user);

    //restore soft deleted item
    await Employee.restore({ where: { id: id } });

    //find all record
    let findEmplyee = await Employee.findAll({});
    res.status(200).send(findEmplyee);
  } catch (error) {
    console.log(error);
  }
};


//scope user
const Searching = async (req,res) =>{
  let user = await Users.findAll({});
  res.status(200).send(user);
}


module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  rawQuery,
  onetoone,
  pagination,
  deleteEmployee,
  Searching
};