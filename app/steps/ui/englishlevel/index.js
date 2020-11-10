'use strict';

const MultiPartValidationStep = require('app/core/steps/MultiPartValidationStep');

class ApplicantEnglishLevel extends MultiPartValidationStep {

    static getUrl() {
        return '/english-level';
    }

    static fields() {
        return ['english_language_level'];
    }

    get requiredFields() {
        return ApplicantEnglishLevel.fields();
    }
}

module.exports = ApplicantEnglishLevel;
