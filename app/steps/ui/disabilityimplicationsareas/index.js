'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantDisabilityImplicationAreas extends ValidationStep {

    static getUrl() {
        return '/disability-implications-areas';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        ctx.disabilityImplicationsAreas = ctx.disabilityImplicationsAreas || [];

        return ctx;
    }
}

module.exports = ApplicantDisabilityImplicationAreas;
