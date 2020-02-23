'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantProvideDateOfBirth extends ValidationStep {

    static getUrl() {
        return '/provide-date-of-birth';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'provideDateOfBirth', value: 'optionYes', choice: 'Yes'}
            ]
        };
    }
}

module.exports = ApplicantProvideDateOfBirth;
