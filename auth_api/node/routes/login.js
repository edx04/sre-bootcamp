import { reporters } from 'mocha';
import { loginFunction } from '../services/login';

export const login = async(req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    let response = await loginFunction(username, password);
    if (response.status == 200) {
        res.send({ data: response.data });
    } else {
        res.status(401).send("wrong username and password ")
    }


    next();
}