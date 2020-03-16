'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantGenderSameAsSex extends ValidationStep {

    static getUrl() {
        return '/gender-same-as-sex';
    }

    handlePost(ctx, errors) {
        if (ctx.gender_different !== '2' && ctx.gender_other) {
            delete ctx.gender_other;
        }
        return [ctx, errors];
    }

}

module.exports = ApplicantGenderSameAsSex;
