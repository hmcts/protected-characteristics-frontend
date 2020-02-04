'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantSexualOrientation extends ValidationStep {

    static getUrl() {
        return '/sexual-orientation';
    }
}

module.exports = ApplicantSexualOrientation;
