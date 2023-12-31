const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');


const handleLogout = async (req, res) => {

    console.log("cookies received:")
    console.log(req.cookies)

    if (!req.cookies?.jwt) return res.status(400).json({message: "User authentication info is missing"});
    const refreshToken = req.cookies.jwt;

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    const user = await User.findOne({refreshToken}).exec();
    if (!user) return res.status(401).json({message: "No such authenticated user"});

    user.refreshToken = '';
    const result = await user.save();
    console.log(result);
    console.log(`user "${user.username}" logged out`);

    res.sendStatus(204);
   
}

module.exports = {handleLogout};