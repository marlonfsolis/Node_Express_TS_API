import {resolve} from 'path';

const __basedir = resolve('.');

module.exports = {
    "port": 3000,
    "db": {
        "username": "username",
        "password": "password",
        "name": "express-ts",
        "host": "host"
    },
    "jwt-secret": "Do not tell any body.",
    "jwt-exp": "1h",
    "path": {
        "basedir": __basedir
    }
};
