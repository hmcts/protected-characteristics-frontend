'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEnglishLevel extends ValidationStep {

    static getUrl() {
        return '/english-level';
    }

    get requiredFields() {
        return ['english_language_level'];
    }
}

module.exports = ApplicantEnglishLevel;
