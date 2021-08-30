const jwt = require('jsonwebtoken');


const valid_roles = ['admin', 'editor', 'viewer']


let privateKey = 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW';
export const protectFunction = (authorization) => {

    try {
        const token = authorization.split(" ")[1];
        const role = jwt.verify(token, privateKey)
        if (valid_roles.includes(role.role)) {
            return {
                status: 200,
                data: "You are under protected data"
            }
        } else {
            return { status: 403 }
        }


    } catch (err) {
        return { status: 401 }
    }

}