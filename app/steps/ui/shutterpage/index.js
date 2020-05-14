'use strict';

const Step = require('app/core/steps/Step');
const registeredServices = require('app/registeredServices.json');

class ShutterPage extends Step {
    static getUrl() {
        return '/offline';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        if (req.session.returnUrl) {
            ctx.returnUrl = req.session.returnUrl;
        }

        ctx.services = registeredServices || [];

        return ctx;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.returnUrl;
        delete ctx.services;
        return [ctx, formdata];
    }
}

module.exports = ShutterPage;
