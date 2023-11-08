const express = require('express');
const router = express.Router();
const contractsController = require('../../controllers/contractsController');

router.get("/", contractsController.getAllContracts);

module.exports = router