
const contractsData = require('../data/contractsData.json');

const getAllContracts = (req, res) => res.status(200).send(contractsData);

module.exports = {
    getAllContracts
}