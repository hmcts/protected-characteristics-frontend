'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantDisabilityImplications extends ValidationStep {

    static getUrl() {
        return '/disability-implications';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'disabilityImplications', value: '1', choice: 'Yes'},
                {key: 'disabilityImplications', value: '2', choice: 'Yes'}
            ]
        };
    }
}

module.exports = ApplicantDisabilityImplications;
