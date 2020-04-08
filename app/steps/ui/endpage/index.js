'use strict';

const Step = require('app/core/steps/Step');

class EndPage extends Step {

    static getUrl () {
        return '/end-page';
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.returnUrl;
        return [ctx, formdata];
    }
}

module.exports = EndPage;
