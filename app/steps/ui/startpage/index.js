'use strict';

const Step = require('app/core/steps/Step');

class StartPage extends Step {

    static getUrl () {
        return '/start-page';
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.returnUrl;
        return [ctx, formdata];
    }
}

module.exports = StartPage;
