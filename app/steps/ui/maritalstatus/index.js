'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantMaritalStatus extends ValidationStep {

    static getUrl() {
        return '/marital-status';
    }

    get requiredFields() {
        return ['marriage'];
    }
}

module.exports = ApplicantMaritalStatus;
