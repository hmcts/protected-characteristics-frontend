'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicBackgroundBlack extends ValidationStep {

    static getUrl() {
        return '/black-ethnic-group';
    }

    get requiredFields() {
        return ['ethnicity'];
    }

    handlePost(ctx, errors) {
        [ctx, errors] = super.handlePost(ctx, errors);
        if (ctx.ethnicity !== 16) {
            ctx.ethnicity_other = null;
        }
        return [ctx, errors];
    }

    nonIntegerFields() {
        return ['ethnicity_other'];
    }

}

module.exports = ApplicantEthnicBackgroundBlack;
