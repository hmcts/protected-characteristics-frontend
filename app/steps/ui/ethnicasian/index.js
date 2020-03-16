'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicBackgroundAsian extends ValidationStep {

    static getUrl() {
        return '/asian-ethnic-group';
    }

    handlePost(ctx, errors) {
        if (ctx.ethnicity !== '13') {
            ctx.ethnicity_other = null;
        }
        return [ctx, errors];
    }

}

module.exports = ApplicantEthnicBackgroundAsian;
