'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicBackgroundBlack extends ValidationStep {

    static getUrl() {
        return '/black-ethnic-group';
    }

    handlePost(ctx, errors) {
        if (ctx.ethnicity !== 16) {
            ctx.ethnicity_other = null;
        }
        return [ctx, errors];
    }

    integerFields() {
        return ['ethnicity'];
    }

}

module.exports = ApplicantEthnicBackgroundBlack;
