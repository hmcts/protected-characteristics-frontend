'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantHealthConditionsImplications extends ValidationStep {

    static getUrl() {
        return '/health-conditions-implications';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'healthConditionsImplications', value: 'optionYesLot', choice: 'Yes'},
                {key: 'healthConditionsImplications', value: 'optionYesLittle', choice: 'Yes'},
            ]
        };
    }
}

module.exports = ApplicantHealthConditionsImplications;
