'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantDisability extends ValidationStep {

    static getUrl() {
        return '/disability';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'disability', value: '1', choice: 'Yes'}
            ]
        };
    }
}

module.exports = ApplicantDisability;
