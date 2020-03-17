'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEnglishLevel extends ValidationStep {

    static getUrl() {
        return '/english-level';
    }
}

module.exports = ApplicantEnglishLevel;
