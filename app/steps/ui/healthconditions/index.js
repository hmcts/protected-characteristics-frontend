'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantHealthConditions extends ValidationStep {

    static getUrl() {
        return '/health-conditions';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'healthConditions', value: 'optionYes', choice: 'Yes'}
            ]
        };
    }
}

module.exports = ApplicantHealthConditions;
