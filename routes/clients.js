const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');
const verifyRoles = require('../middleware/verifyRoles');

router.route("/").get(verifyRoles("read"), clientsController.getAllClients);

router.route("/new").post(verifyRoles("client", "write"), clientsController.createNewClient);

router.route("/update/:id").put(verifyRoles("client", "write"), clientsController.updateClient);

router.route("/delete/:id").delete(verifyRoles("client", "delete"), clientsController.deleteClient);

module.exports = router