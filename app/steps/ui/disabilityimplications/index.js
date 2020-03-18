'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantDisabilityImplications extends ValidationStep {

    static getUrl() {
        return '/disability-implications';
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
