'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicBackgroundWhite extends ValidationStep {

    static getUrl() {
        return '/white-ethnic-group';
    }
}

module.exports = ApplicantEthnicBackgroundWhite;
