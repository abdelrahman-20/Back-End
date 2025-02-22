const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.param("id", (req, res, next, value) => {
  console.log(`Requested User ID: ${value}`);
  next();
});

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
