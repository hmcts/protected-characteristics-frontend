'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicBackgroundMixed extends ValidationStep {

    static getUrl() {
        return '/mixed-ethnic-group';
    }
}

module.exports = ApplicantEthnicBackgroundMixed;
