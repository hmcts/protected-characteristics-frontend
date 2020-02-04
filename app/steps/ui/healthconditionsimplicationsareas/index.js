'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const get = require('lodash').get;

class ApplicantHealthConditionsImplicationAreas extends ValidationStep {

    static getUrl() {
        return '/health-conditions-implications-areas';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        ctx.sex = get(formdata, 'sex.sex');
        return ctx;
    }

    nextStepOptions(ctx) {
        ctx.female = ctx.sex === 'optionFemale';

        return {
            options: [
                {key: 'female', value: true, choice: 'Female'}
            ]
        };
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.female;
        return [ctx, formdata];
    }
}

module.exports = ApplicantHealthConditionsImplicationAreas;
