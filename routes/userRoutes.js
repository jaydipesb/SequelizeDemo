const userController = require("../controllers/userController.js");

const router = require("express").Router();

router.post("/addUser", userController.addUser);

router.get("/allUsers", userController.getAllUsers);

router.get("/:id", userController.getOneUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.get("/rawquery", userController.rawQuery);

router.get("/onetoone", userController.onetoone);

router.get("/pagination/:id", userController.pagination);

router.delete("/employee/:id", userController.deleteEmployee);

router.get("/search", userController.Searching);

module.exports = router;
