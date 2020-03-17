'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicBackgroundWhite extends ValidationStep {

    static getUrl() {
        return '/white-ethnic-group';
    }

    handlePost(ctx, errors) {
        if (ctx.ethnicity !== 4) {
            ctx.ethnicity_other = null;
        }
        return [ctx, errors];
    }

    nonIntegerFields() {
        return ['ethnicity_other'];
    }

}

module.exports = ApplicantEthnicBackgroundWhite;
