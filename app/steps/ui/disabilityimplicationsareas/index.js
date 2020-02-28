'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantDisabilityImplicationAreas extends ValidationStep {

    static getUrl() {
        return '/disability-implications-areas';
    }

    getContextData(req, res, featureToggles) {
        const ctx = super.getContextData(req, res, featureToggles, ['disabilityImplicationsAreas']);
        ctx.disabilityImplicationsAreas = ctx.disabilityImplicationsAreas || [];

        return ctx;
    }
}

module.exports = ApplicantDisabilityImplicationAreas;
