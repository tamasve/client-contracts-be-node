const verifyRoles = (...rolesKeywords) => {

    return (req, res, next) => {

        if (!req?.roles) return res.sendStatus(401);

        const userRoles = req.roles;

        const properRoles = userRoles
            .map( role => rolesKeywords.map(
                    keyword => role.rolename.toLowerCase().includes(keyword) ).filter( value => value === false ).length
                )
            .find( value => value === 0 );

        if (!properRoles) return res.sendStatus(401);
        next();

    }

}

module.exports = verifyRoles;