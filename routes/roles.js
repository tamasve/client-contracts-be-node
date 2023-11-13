const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');

router.get("/", rolesController.getAllRoles);

router.post("/new", rolesController.createNewRole);

router.route("/update/:id").put(rolesController.updateRole);

router.route("/delete/:id").delete(rolesController.deleteRole);

module.exports = router