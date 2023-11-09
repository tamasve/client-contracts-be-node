const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');

router.get("/", usersController.getAllUsers);

router.post("/new", usersController.createNewUser);

router.route("/update/:id").put(usersController.updateUser);

router.route("/delete/:id").delete(usersController.deleteUser);

module.exports = router