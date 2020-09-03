'use strict';

const pathWhitelist = [
    '/offline', '/invoker', '/invoker/formFiller', '/invoker/genToken'
];

const validateParams = (req, res, next) => {
    if (req.session.validParameters || pathWhitelist.includes(req.path)) {
        next();
    } else {
        res.redirect('/offline');
    }
};

module.exports = validateParams;
