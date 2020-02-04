'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicBackgroundAsian extends ValidationStep {

    static getUrl() {
        return '/asian-ethnic-group';
    }
}

module.exports = ApplicantEthnicBackgroundAsian;
