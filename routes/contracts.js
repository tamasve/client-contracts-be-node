const express = require('express');
const router = express.Router();
const contractsController = require('../controllers/contractsController');
const verifyRoles = require('../middleware/verifyRoles');

router.route("/").get(verifyRoles("read"), contractsController.getAllContracts);

router.route("/new").post(verifyRoles("contract", "write"), contractsController.createNewContract);

router.route("/update/:id").put(verifyRoles("contract", "write"), contractsController.updateContract);

router.route("/delete/:id").delete(verifyRoles("contract", "delete"), contractsController.deleteContract);

module.exports = router