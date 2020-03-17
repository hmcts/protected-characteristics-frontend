'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicBackgroundOther extends ValidationStep {

    static getUrl() {
        return '/other-ethnic-group';
    }

    handlePost(ctx, errors) {
        if (ctx.ethnicity !== 18) {
            ctx.ethnicity_other = null;
        }
        return [ctx, errors];
    }

    integerFields() {
        return ['ethnicity'];
    }

}

module.exports = ApplicantEthnicBackgroundOther;
