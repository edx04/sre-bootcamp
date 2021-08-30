import {get } from 'config';
import { resolve } from 'path';

const sync = require('sync-sql');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');



var config = {
    host: "bootcamp-tht.sre.wize.mx",
    port: "3306",
    user: "secret",
    password: "noPow3r",
    database: 'bootcamp_tht'
}




let privateKey = 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW';

export const loginFunction = async(username, password) => {

    const query = 'SELECT * FROM users WHERE username = ?'
    const result = sync.mysql(config, query, [username]).data.rows
    if (!result.length) return {
        status: 401
    }
    const user = result[0];
    const salt = user.salt;
    const correct_password = user.password;
    const role = user.role;

    let hash = crypto.createHash('sha512');
    let data = hash.update(password + salt, 'utf-8');
    let hash_password = data.digest('hex');

    if (hash_password == correct_password) {

        return new Promise((resolve, reject) => {
            jwt.sign({ role: role }, privateKey, { algorithm: 'HS256' }, (err, token) => {
                console.log(token)
                return resolve({
                    status: 200,
                    data: token
                });
            });
        });
    } else {
        return {
            status: 401,
            data: ''
        }
    }





}