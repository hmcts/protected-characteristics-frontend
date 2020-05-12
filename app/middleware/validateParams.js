'use strict';

const validateParams = (req, res, next) => {
    if (!req.session.validParameters && req.path !== '/offline') {
        res.redirect('/offline');
    } else {
        next();
    }
};

module.exports = validateParams;
