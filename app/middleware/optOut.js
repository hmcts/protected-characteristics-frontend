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

    form.pcqAnswers = {}; // Remove PCQ answers
    req.session.ctx = {}; // Clear ctx as well

    const redirect = req.session.returnUrl || '/offline';
    return formData.post(token, correlationId, form)
        .then(() => {
            res.redirect(redirect);
        })
        .catch(err => {
            req.log.error(err);
            res.redirect(redirect);
        });
};

const optOut = (req, res) => {
    const form = req.session.form;
    if (form.pcqAnswers && Object.keys(form.pcqAnswers).length > 0) {
        return clearAnswers(req, res);
    }

    res.redirect(req.session.returnUrl || '/offline');
};

module.exports = optOut;
