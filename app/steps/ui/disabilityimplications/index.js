'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantDisabilityImplications extends ValidationStep {

    static getUrl() {
        return '/disability-implications';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'disabilityImplications', value: 'optionYesLot', choice: 'Yes'},
                {key: 'disabilityImplications', value: 'optionYesLittle', choice: 'Yes'}
            ]
        };
    }
}

module.exports = ApplicantDisabilityImplications;
