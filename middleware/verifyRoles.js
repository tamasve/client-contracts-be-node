const verifyRoles = (...rolesKeywords) => {

    return (req, res, next) => {

        if (!req?.roles) return res.sendStatus(401);    // user is not authenticated, unknown to the server

        const userRoles = req.roles;

        const properRoles = userRoles
            .map( role => rolesKeywords.map(
                    keyword => role.rolename.toLowerCase().includes(keyword) ).filter( value => value === false ).length
                )
            .find( value => value === 0 );

        if (!properRoles) return res.sendStatus(403);    // user is not authorized to see the content, but known to the server

        next();     // user is authorized to see the content

    }

}

module.exports = verifyRoles;