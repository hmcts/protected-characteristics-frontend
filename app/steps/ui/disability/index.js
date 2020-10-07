'use strict';

const MultiPartValidationStep = require('app/core/steps/MultiPartValidationStep');
const DisabilityImplications = require('app/steps/ui/disabilityimplications/index');
const DisabilityImplicationsAreas = require('app/steps/ui/disabilityimplicationsareas/index');

class ApplicantDisability extends MultiPartValidationStep {

    static getUrl() {
        return '/disability';
    }

    childSteps() {
        return [DisabilityImplications, DisabilityImplicationsAreas];
    }

    deleteChildFields(ctx) {
        return ctx.disability_conditions !== 1;
    }

    get requiredFields() {
        return ['disability_conditions'];
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'disability_conditions', value: 1, choice: 'Yes'}
            ]
        };
    }
}

module.exports = ApplicantDisability;
