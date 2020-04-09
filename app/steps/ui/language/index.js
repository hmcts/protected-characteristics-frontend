'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantLanguage extends ValidationStep {

    static getUrl() {
        return '/language';
    }

    get requiredFields() {
        return ['language_main'];
    }

    action(ctx, formdata) {
        if (ctx.language_main !== 2) {
            ctx.english_language_level = null;
            if (ctx.language_other) {
                delete ctx.language_other;
            }
        }
        return super.action(ctx, formdata);
    }

    nonIntegerFields() {
        return ['language_other'];
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'language_main', value: 2, choice: 'otherLanguage'}
            ]
        };
    }
}

module.exports = ApplicantLanguage;
