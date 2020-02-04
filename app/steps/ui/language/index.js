'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantLanguage extends ValidationStep {

    static getUrl() {
        return '/language';
    }
}

module.exports = ApplicantLanguage;
