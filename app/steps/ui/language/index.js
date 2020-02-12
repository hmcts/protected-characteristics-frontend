'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantLanguage extends ValidationStep {

    static getUrl() {
        return '/language';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'language', value: 'optionOther', choice: 'otherLanguage'}
            ]
        };
    }
}

module.exports = ApplicantLanguage;
