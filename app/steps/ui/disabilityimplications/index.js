'use strict';

const MultiPartValidationStep = require('app/core/steps/MultiPartValidationStep');
const DisabilityImplicationsAreas = require('app/steps/ui/disabilityimplicationsareas/index');

class ApplicantDisabilityImplications extends MultiPartValidationStep {

    static getUrl() {
        return '/disability-implications';
    }

    static fields() {
        return ['disability_impact'];
    }

    childSteps() {
        return [DisabilityImplicationsAreas];
    }

    deleteChildFields(ctx) {
        return ctx.disability_impact !== 1 && ctx.disability_impact !== 2;
    }

    get requiredFields() {
        return ApplicantDisabilityImplications.fields();
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'disability_impact', value: 1, choice: 'Yes'},
                {key: 'disability_impact', value: 2, choice: 'Yes'}
            ]
        };
    }
}

module.exports = ApplicantDisabilityImplications;
