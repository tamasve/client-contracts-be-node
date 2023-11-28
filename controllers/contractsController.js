const Contract = require('../model/Contract');

const getAllContracts = async (req, res) => {
    console.log("get all contracts");
    const contracts = await Contract.find();
    if (!contracts) return res.status(204).json( {"message": "No contract found"} )
    res.status(200).json(contracts);
}

const createNewContract = async (req, res) => {
    console.log("new contract into DB...")
    console.log(req.body);      // the new contract data (check)
    const {contract_id, client_taxnumber, asset_num, asset_type, gross_asset_value, financed_amount, start_date, end_date, margin, remaining_debt} = req.body;  // extract contract object from req. body
    
    const canSave = [contract_id, client_taxnumber, asset_num, asset_type, gross_asset_value, financed_amount, start_date, end_date, margin, remaining_debt].every(Boolean)
    if (!canSave) return res.status(400).json({'message': 'Every contract property should be filled out'})
    
    try {
        const result = await Contract.create(
            {contract_id, client_taxnumber, asset_num, asset_type, gross_asset_value, financed_amount, start_date, end_date, margin, remaining_debt}
        );
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

const updateContract = async (req, res) => {
    console.log("update contract in DB...")
    console.log(req.body);      // the contract to update
    console.log(req.params);
    
    if (!req?.body?._id)  return res.status(400).json( {'message': 'ID required'} );
    
    const { _id } = req.body;
    const contract = await Contract.findOne({_id}).exec();     // find contract by _id
    if (!contract) return res.status(204).json({'message': `No contract matches ID ${_id}`, _id});

    console.log(`${contract.contract_id} with ID=${_id} matches and will be updated`);

    Object.keys(req.body).forEach(      // run through all keys in the received object...
        (key) => {
            if (req.body[key]) contract[key] = req.body[key];     // ... and modify it in the object in DB
        });

    const result = await contract.save();     // save modified contract object
    res.json(result);
}

const deleteContract = async (req, res) => {
    console.log("delete contract in DB...")
    console.log(req.params);    // the contract to delete: await id from url
    
    if (!req.params.id)  return res.status(400).json( {'message': 'ID required'} );
    
    const { id } = req.params;
    const contract = await Contract.findOne({_id: id}).exec();     // find contract by _id
    if (!contract) return res.status(204).json({'message': `No contract matches ID ${id}`, _id: id});

    console.log(`${contract.contract_id} with ID=${id} matches and will be deleted`);

    try {
        const result = await contract.deleteOne({_id: id});     // delete contract object
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
}


module.exports = {
    getAllContracts,
    createNewContract,
    updateContract,
    deleteContract
}