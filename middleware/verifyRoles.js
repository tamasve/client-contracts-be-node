const verifyRoles = (...rolesKeywords) => {

    return (req, res, next) => {

        if (!req?.roles) return res.sendStatus(401);    // user is not authenticated, unknown to the server

        const userRoles = req.roles;
        console.log(userRoles)

        const properRoles = userRoles
            .map( role => rolesKeywords.map(
                    keyword => role.rolename.toLowerCase().includes(keyword) ).filter( value => value === false ).length )
                .filter( value => value === 0 ).length;     // there should be at least 1 role that contains all expected keywords

        if (!properRoles) {console.log("forbidden"); return res.sendStatus(405);}    // user is not authorized to see the content, but known to the server

        console.log("user has proper role for the route");
        next();     // user is authorized to see the content

    }

}

module.exports = verifyRoles;