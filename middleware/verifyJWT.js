const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {

    console.log(req.headers);
    const authHeader = req.headers?.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).send("Unauthorized, access forbidden");

    const accessToken = authHeader.split(" ")[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            if (error) return res.status(403).send("Access forbidden");
            req.username = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            console.log(req.roles)
            next();
        }
    );

};

module.exports = verifyJWT;