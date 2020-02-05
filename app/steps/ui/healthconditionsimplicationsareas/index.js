'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantHealthConditionsImplicationAreas extends ValidationStep {

    static getUrl() {
        return '/health-conditions-implications-areas';
    }
}

module.exports = ApplicantHealthConditionsImplicationAreas;
