'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantReligion extends ValidationStep {

    static getUrl() {
        return '/religion';
    }
}

module.exports = ApplicantReligion;
