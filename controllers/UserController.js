const db = require("../models/Index");
const { Sequelize, Op, QueryTypes, Model, DataTypes } = require("sequelize");

const Select = db.Select;
const Option = db.Option;
const sequelize = db.sequelize;

//1.create user
const addUser = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    // add many to many relationship data
    let postDetail = req.body.option;
    const user = await Select.create(
      {
        s_name: req.body.s_name,
        s_key: `${req.body.s_name}_combo`,
        optionDetails: [...postDetail],
      },
      { include: [{ model: Option, as: "optionDetails" }] }
    );

    await t.commit();
    res.status(200).send(user);
    // });
  } catch (error) {
    console.log(error);
    await t.rollback();
  }
};

// 2. get all records
const getAllUsers = async (req, res) => {
  try {
    let id = req.params.id;
    let selectValue = await Select.findAll({
      include: [
        {
          model: Option,
          as: "optionDetails",
        },
      ],
      where: {
        id: id,
      },
    });

    let data;
    if (selectValue[0].s_name == "checkbox") {
      for (let i = 0; i < selectValue[0].optionDetails.length; i++) {
        data += `<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
      <label for="vehicle1"> ${selectValue[0].optionDetails[i].o_name}</label><br>`;
      }
    } else if (selectValue[0].s_name == "radio") {
      for (let i = 0; i < selectValue[0].optionDetails.length; i++) {
        data += `<input type="radio" id="html" name='${selectValue[0].optionDetails[i].o_name}' value="HTML">
        <label for="html">${selectValue[0].optionDetails[i].o_name}</label><br>`;
      }
    }
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};

//3. get single user
const getOneUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await Option.findOne({ where: { id: id } });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

//4. update user
const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let postDetail = req.body.option;
    let postId = [...postDetail];
    console.log(postId[0].id);
    let user;
    let updateRecord;
    user = await Select.findOne({
      where: {
        s_name: req.body.s_name,
      },
    });

    if (user) {
      for (i = 0; i < postId.length; i++) {
        updateRecord = await Option.update(
          {
            o_name: postId[i].o_name,
            o_value: postId[i].o_value,
          },
          {
            where: { sid: id, id: postId[i].id },
          }
        );
      }
    } else {
      console.log("user not found");
    }

    let addRecord = req.body.addRecord;
    if (addRecord) {
      for (j = 0; j < addRecord.length; j++) {
        let findUser = await Option.findOne({
          where: {
            o_name: addRecord[j].o_name,
          },
        });
        console.log(findUser);
        if (findUser == null) {
          await Option.create({
            sid: req.params.id,
            o_name: addRecord[j].o_name,
            o_value: addRecord[j].o_value,
          });
        }
      }
    }

    res.status(200).send(updateRecord);
  } catch (error) {
    console.log(error);
  }
};

//5.delete user by id
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    const userData = await Option.findOne({
      where: {
        id,
        id,
      },
    });

    if (userData) {
      const user = await Option.destroy({
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
    }
    await Option.restore({
      where: {
        id: id,
      },
    });

    res.status(200).send("user deleted succesfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
