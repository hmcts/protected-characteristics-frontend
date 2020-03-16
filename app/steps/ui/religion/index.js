'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantReligion extends ValidationStep {

    static getUrl() {
        return '/religion';
    }

    handlePost(ctx, errors) {
        if (ctx.religion !== '8') {
            delete ctx.religion_other;
        }
        return [ctx, errors];
    }

}

module.exports = ApplicantReligion;
