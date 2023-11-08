const express = require('express');
const router = express.Router();
const clientsController = require('../../controllers/clientsController');

router.get("/", clientsController.getAllClients);

router.post("/new", clientsController.createNewClient);

router.route("/update/:id").put(clientsController.updateClient);

router.route("/delete/:id").delete(clientsController.deleteClient);

module.exports = router