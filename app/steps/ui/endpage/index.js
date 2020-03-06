'use strict';

const Step = require('app/core/steps/Step');

class EndPage extends Step {

    static getUrl () {
        return '/end-page';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        if (req.session.returnUrl) {
            ctx.returnUrl = `${req.session.returnUrl}?locale=${req.session.language}`;
        }

        return ctx;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.returnUrl;
        return [ctx, formdata];
    }
}

module.exports = EndPage;
