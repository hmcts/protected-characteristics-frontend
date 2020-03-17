'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class ApplicantEthnicGroup extends ValidationStep {

    static getUrl() {
        return '/ethnic-group';
    }

    handlePost(ctx, errors) {
        if (ctx.ethnic_group === 0) {
            ctx.ethnicity = 0;
            ctx.ethnicity_other = null;
        }
        return [ctx, errors];
    }

    ignoreFieldsOnPost() {
        return ['ethnic_group'];
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'ethnic_group', value: 1, choice: 'White'},
                {key: 'ethnic_group', value: 2, choice: 'Mixed'},
                {key: 'ethnic_group', value: 3, choice: 'Asian'},
                {key: 'ethnic_group', value: 4, choice: 'Black'},
                {key: 'ethnic_group', value: 5, choice: 'Other'},
            ]
        };
    }
}

module.exports = ApplicantEthnicGroup;
