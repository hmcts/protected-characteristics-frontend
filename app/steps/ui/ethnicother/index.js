'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicBackgroundOther extends ValidationStep {

    static getUrl() {
        return '/other-ethnic-group';
    }
}

module.exports = ApplicantEthnicBackgroundOther;
