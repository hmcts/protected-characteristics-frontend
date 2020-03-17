'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantMaritalStatus extends ValidationStep {

    static getUrl() {
        return '/marital-status';
    }

    integerFields() {
        return ['marriage'];
    }
}

module.exports = ApplicantMaritalStatus;
