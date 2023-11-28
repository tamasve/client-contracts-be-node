const User = require('../model/User');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json( {"message": "No user found"} )
    res.status(200).json(users);
}

const createNewUser = async (req, res) => {
    console.log("new user into DB...")
    console.log(req.body);      // the new user data (check)
    const {username, password, email, roles} = req.body;  // extract user object from req. body
    
    const canSave = [username, password, email, roles].every(Boolean);
    if (!canSave) return res.status(400).json({'message': 'Every user property should be filled out'});

    const duplicate = await User.findOne({username}).exec();
    if (duplicate) return res.sendStatus(409);

    
    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const result = await User.create(
            {username, hashedPwd, email, active: false, roles, "refreshToken": ""}
        );
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

const updateUser = async (req, res) => {
    console.log("update user in DB...")
    console.log(req.body);      // the user to update
    console.log(req.params);
    
    if (!req?.body?._id)  return res.status(400).json( {'message': 'ID required'} );
    
    const { _id } = req.body;
    const user = await User.findOne({_id}).exec();     // find user by _id
    if (!user) return res.status(204).json({'message': `No user matches ID ${_id}`, _id});

    console.log(`${user.username} with ID=${_id} matches and will be updated`);

    Object.keys(req.body).forEach(      // run through all keys in the received object...
        (key) => {
            if (req.body[key]) user[key] = req.body[key];     // ... and modify it in the object in DB
        });

    const result = await user.save();     // save modified user object
    res.json(result);
}

const deleteUser = async (req, res) => {
    console.log("delete user in DB...")
    console.log(req.params);    // the user to delete: await id from url
    
    if (!req.params.id)  return res.status(400).json( {'message': 'ID required'} );
    
    const { id } = req.params;
    const user = await User.findOne({_id: id}).exec();     // find user by _id
    if (!user) return res.status(204).json({'message': `No user matches ID ${id}`, _id: id});

    console.log(`${user.username} with ID=${id} matches and will be deleted`);

    try {
        const result = await user.deleteOne({_id: id});     // delete user object
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}