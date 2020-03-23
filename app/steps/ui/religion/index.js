'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantReligion extends ValidationStep {

    static getUrl() {
        return '/religion';
    }

    get requiredFields() {
        return ['religion'];
    }

    handlePost(ctx, errors) {
        [ctx, errors] = super.handlePost(ctx, errors);
        if (ctx.religion !== 8) {
            delete ctx.religion_other;
        }
        return [ctx, errors];
    }

    nonIntegerFields() {
        return ['religion_other'];
    }

}

module.exports = ApplicantReligion;
