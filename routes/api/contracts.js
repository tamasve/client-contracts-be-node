const express = require('express');
const router = express.Router();
const contractsController = require('../../controllers/contractsController');

router.get("/", contractsController.getAllContracts);

router.post("/new", clientsController.createNewContract);

router.route("/update/:id").put(clientsController.updateContract);

router.route("/delete/:id").delete(clientsController.deleteContract);

module.exports = router