'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantGenderSameAsSex extends ValidationStep {

    static getUrl() {
        return '/gender-same-as-sex';
    }

    get requiredFields() {
        return ['gender_different'];
    }

    handlePost(ctx, errors) {
        [ctx, errors] = super.handlePost(ctx, errors);
        if (ctx.gender_different !== 2 && ctx.gender_other) {
            delete ctx.gender_other;
        }
        return [ctx, errors];
    }

    nonIntegerFields() {
        return ['gender_other'];
    }

}

module.exports = ApplicantGenderSameAsSex;
