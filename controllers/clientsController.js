const Client = require('../model/Client');


const getAllClients = async (req, res) => {
    console.log("get all clients");
    const clients = await Client.find();
    if (!clients) return res.status(204).json( {"message": "No client found"} )
    res.status(200).json(clients);
}

const createNewClient = async (req, res) => {
    console.log("new client into DB...")
    console.log(req.body);      // the new client data (check)
    const {name, taxnumber, segment, headquarters, foundation} = req.body;  // extract client object from req. body
    
    const canSave = [name, taxnumber, segment, headquarters, foundation].every(Boolean)
    if (!canSave) return res.status(400).json({'message': 'Every client property should be filled out'})
    
    try {
        const result = await Client.create(
            {name, taxnumber, segment, headquarters, foundation}
        );
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

const updateClient = async (req, res) => {
    console.log("update client in DB...")
    console.log(req.body);      // the client to update
    console.log(req.params);
    
    if (!req?.body?._id)  return res.status(400).json( {'message': 'ID required'} );
    
    const { _id } = req.body;
    const client = await Client.findOne({_id}).exec();     // find client by _id
    if (!client) return res.status(204).json({'message': `No client matches ID ${_id}`, _id});

    console.log(`${client.name} with ID=${_id} matches and will be updated`);

    Object.keys(req.body).forEach(      // run through all keys in the received object...
        (key) => {
            if (req.body[key]) client[key] = req.body[key];     // ... and modify it in the object in DB
        });

    const result = await client.save();     // save modified client object
    res.json(result);
}

const deleteClient = async (req, res) => {
    console.log("delete client in DB...")
    console.log(req.params);    // the client to delete: await id from url
    
    if (!req.params.id)  return res.status(400).json( {'message': 'ID required'} );
    
    const { id } = req.params;
    const client = await Client.findOne({_id: id}).exec();     // find client by _id
    if (!client) return res.status(204).json({'message': `No client matches ID ${id}`, _id: id});

    console.log(`${client.name} with ID=${id} matches and will be deleted`);

    try {
        const result = await client.deleteOne({_id: id});     // delete client object
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
}


module.exports = {
    getAllClients,
    createNewClient,
    updateClient,
    deleteClient
}