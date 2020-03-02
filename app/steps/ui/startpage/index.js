'use strict';

const Step = require('app/core/steps/Step');

class StartPage extends Step {

    static getUrl () {
        return '/start-page';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        ctx.returnUrl = `${req.session.returnUrl}?locale=${req.session.language}`;
        ctx.previousUrl = ctx.returnUrl;

        return ctx;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.returnUrl;
        delete ctx.previousUrl;
        return [ctx, formdata];
    }
}

module.exports = StartPage;
