import { protectFunction } from '../services/protected';

export const protect = (req, res, next) => {
    let authorization = req.headers.authorization;

    let response = protectFunction(authorization)
    if (response.status == 200) {
        res.send({
            "data": response.data
        })
    } else {
        res.status(response.status).send("Error");
    }


    next();
}