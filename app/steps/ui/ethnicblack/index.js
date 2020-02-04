'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicBackgroundBlack extends ValidationStep {

    static getUrl() {
        return '/black-ethnic-group';
    }
}

module.exports = ApplicantEthnicBackgroundBlack;
