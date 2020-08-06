'use strict';

const config = require('config');
const ServiceMapper = require('app/utils/ServiceMapper');
const moment = require('moment');

const clearAnswers = (req, res) => {
    const token = req.session.token;
    const correlationId = req.session.correlationId;
    const formData = ServiceMapper.map(
        'FormData',
        [config.services.pcqBackend.url, req.session.id]
    );
    // Set the completed date
    const form = req.session.form;
    form.completedDate = moment().toISOString();

    if (req.session.featureToggles.ft_opt_out) {
        // Set the opt out flag
        form.optOut = 'Y';
    } else {
        form.pcqAnswers = {}; // Remove PCQ answers
        req.session.ctx = {}; // Clear ctx as well
    }

    const redirect = req.session.returnUrl || '/offline';
    return formData.post(token, correlationId, form)
        .then(() => {
            // We delete the flag (if exists) in case the user clicks back into PCQ
            delete form.optOut;
            res.redirect(redirect);
        })
        .catch(err => {
            req.log.error(err);
            res.redirect(redirect);
        });
};

const optOut = (req, res) => {
    // The pcqAnswers property indicates the user has continued passed the start page and created a backend record
    if (req.session.form.pcqAnswers) {
        return clearAnswers(req, res);
    }

    res.redirect(req.session.returnUrl || '/offline');
};

module.exports = optOut;
