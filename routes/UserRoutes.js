const userController = require("../controllers/UserController.js");

const router = require("express").Router();

router.post("/addUser", userController.addUser);

router.get("/allUsers", userController.getAllUsers);

router.get("/:id", userController.getOneUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.get("/rawquery", userController.rawQuery);

router.get("/pagination/:id", userController.pagination);


module.exports = router;
