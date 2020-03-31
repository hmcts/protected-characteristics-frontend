'use strict';

const jwt = require('jsonwebtoken');
const config = require('app/config');

const createToken = (req, payload) => {
    const conf = config.auth.jwt;
    const token = jwt.sign(payload, conf.secret, {expiresIn: conf.ttl});

    req.session.token = token;
    return token;
};

module.exports = {
    createToken: createToken
};
