const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');


const handleRefreshToken = async (req, res) => {

    console.log("-- access token refresh request --")
    console.log("cookies received:")
    console.log(req.cookies)

    if (!req.cookies?.jwt) return res.status(400).json({message: "User authentication info is missing"});
    const refreshToken = req.cookies.jwt;

    const user = await User.findOne({refreshToken}).exec();
    if (!user) return res.status(401).json({message: "No such authenticated user"});
    console.log(`user: ${user.username}`);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
            if (error) return res.status(403).json({message: "Authentication error"});
            if (user.username !== decoded.username) return res.status(403).json({message: "User is not authenticated"});

            // if user from token OK, generate new access token
    
            const accessToken = jwt.sign(
                {"UserInfo": {
                    "username": user.username,
                    "roles": user.roles}
                },
                process.env.ACCESS_TOKEN_SECRET,
                { "expiresIn": '50s'}
            );

            // send access token to FE
            res.json({accessToken});
        }
    )
   
}

module.exports = {handleRefreshToken};