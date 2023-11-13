const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');


const handleLogin = async (req, res) => {

    if (!req.UserAuth) return res.status(400).json({message: "User authentication info is missing"});

    const {username, password} = req.UserAuth;

    if (!username || !password) return res.status(400).json({message: "Username and password required"});

    const user = await User.findOne({username}).exec();
    if (!user) return res.status(401).json({message: "No such username or password"});

    const pw = user.password;
    if (pw !== password) res.status(401).json({message: "No such username or password"});

    // if user and pw OK, generate the tokens

    const accessToken = jwt.sign(
        {"UserInfo": {
            "username": user.username,
            "roles": user.roles}
        },
        process.env.ACCESS_TOKEN_SECRET,
        { "expiresIn": '3m'}
    );

    const refreshToken = jwt.sign(
        {"username": user.username},
        process.env.REFRESH_TOKEN_SECRET,
        { "expiresIn": '3h'}
    );

    // save refresh token into DB with user + into FE cookie - http-only!
    user.refreshToken = refreshToken;
    const result = await user.save();
    console.log(result);

    res.cookie('jwt', refreshToken,
        { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000 });
    
    // send access token to FE
    res.json({accessToken});

}

module.exports = {handleLogin};