'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantDisabilityImplications extends ValidationStep {

    static getUrl() {
        return '/disability-implications';
    }

    integerFields() {
        return ['disability_impact'];
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
