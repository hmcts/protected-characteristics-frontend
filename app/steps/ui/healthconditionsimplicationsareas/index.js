'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantHealthConditionsImplicationAreas extends ValidationStep {

    static getUrl() {
        return '/health-conditions-implications-areas';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        ctx.healthConditionsImplicationsAreas = ctx.healthConditionsImplicationsAreas || [];

        return ctx;
    }
}

module.exports = ApplicantHealthConditionsImplicationAreas;
