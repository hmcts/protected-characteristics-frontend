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

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.healthConditionsImplicationsAreas;
        return [ctx, formdata];
    }
}

module.exports = ApplicantHealthConditionsImplicationAreas;
