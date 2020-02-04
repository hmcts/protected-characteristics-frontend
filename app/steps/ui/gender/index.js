'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantGenderSameAsSex extends ValidationStep {

    static getUrl() {
        return '/gender-same-as-sex';
    }
}

module.exports = ApplicantGenderSameAsSex;
