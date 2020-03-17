'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantPregnant extends ValidationStep {

    static getUrl() {
        return '/pregnant';
    }

    integerFields() {
        return ['pregnancy'];
    }
}

module.exports = ApplicantPregnant;
