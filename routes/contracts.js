const express = require('express');
const router = express.Router();
const contractsController = require('../controllers/contractsController');

router.get("/", contractsController.getAllContracts);

router.post("/new", contractsController.createNewContract);

router.route("/update/:id").put(contractsController.updateContract);

router.route("/delete/:id").delete(contractsController.deleteContract);

module.exports = router