const Role = require('../model/Role');


const getAllRoles = async (req, res) => {
    const roles = await Role.find();
    if (!roles) return res.status(204).json( {"message": "No role found"} )
    res.status(200).json(roles);
}

const createNewRole = async (req, res) => {
    console.log("new role into DB...")
    console.log(req.body);      // the new role data (check)
    const {rolename, description} = req.body;  // extract role object from req. body
    
    const canSave = [rolename, description].every(Boolean)
    if (!canSave) return res.status(400).json({'message': 'Every role property should be filled out'})
    
    try {
        const result = await Role.create(
            {rolename, description}
        );
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

const updateRole = async (req, res) => {
    console.log("update role in DB...")
    console.log(req.body);      // the role to update
    console.log(req.params);
    
    if (!req?.body?._id)  return res.status(400).json( {'message': 'ID required'} );
    
    const { _id } = req.body;
    const role = await Role.findOne({_id}).exec();     // find role by _id
    if (!role) return res.status(204).json({'message': `No role matches ID ${_id}`, _id});

    console.log(`${role.rolename} with ID=${_id} matches and will be updated`);

    Object.keys(req.body).forEach(      // run through all keys in the received object...
        (key) => {
            if (req.body[key]) role[key] = req.body[key];     // ... and modify it in the object in DB
        });

    const result = await role.save();     // save modified role object
    res.json(result);
}

const deleteRole = async (req, res) => {
    console.log("delete role in DB...")
    console.log(req.params);    // the role to delete: await id from url
    
    if (!req.params.id)  return res.status(400).json( {'message': 'ID required'} );
    
    const { id } = req.params;
    const role = await Role.findOne({_id: id}).exec();     // find role by _id
    if (!role) return res.status(204).json({'message': `No role matches ID ${id}`, _id: id});

    console.log(`${role.rolename} with ID=${id} matches and will be deleted`);

    try {
        const result = await role.deleteOne({_id: id});     // delete role object
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
}


module.exports = {
    getAllRoles,
    createNewRole,
    updateRole,
    deleteRole
}