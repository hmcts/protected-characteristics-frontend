'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantSex extends ValidationStep {

    static getUrl() {
        return '/sex';
    }

    get requiredFields() {
        return ['sex'];
    }
}

module.exports = ApplicantSex;
