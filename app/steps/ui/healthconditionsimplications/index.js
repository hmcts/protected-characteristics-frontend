'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantHealthConditionsImplications extends ValidationStep {

    static getUrl() {
        return '/health-conditions-implications';
    }
}

module.exports = ApplicantHealthConditionsImplications;
