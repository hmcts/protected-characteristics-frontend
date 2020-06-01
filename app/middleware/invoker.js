'use strict';

const invoker = new (require('app/utils/Invoker'))();
const featureToggle = new (require('app/utils/FeatureToggle'))();

const render = (req, res) => {
    res.render('invoker/template', invoker.content, (err, html) => {
        if (err) {
            req.log.error(err);
            return res.status(500);
        }
        res.send(html);
    });
};

const formFiller = (req, res) => {
    res.json(invoker.fillForm(req.query.service, req.query.actor, req.query.fields.split(',')));
};

const postForm = (req, res) => {
    res.redirect(invoker.serviceEndpoint(req.body));
};

const addTo = (app) => {
    app.all('/invoker*', (req, res, next) => {
        featureToggle.checkToggle('ft_invoker', (err, enabled) => {
            if (err || !enabled) {
                res.redirect('/404');
            } else {
                next();
            }
        }, req.session.id);
    });

    app.get('/invoker', render);
    app.get('/invoker/formFiller', formFiller);
    app.post('/invoker', postForm);
};

module.exports = {
    'addTo': addTo
};
