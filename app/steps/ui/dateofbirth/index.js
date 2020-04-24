'use strict';

const DateStep = require('app/core/steps/DateStep');
const FieldError = require('app/components/error');

class ApplicantDateOfBirth extends DateStep {

    static getUrl() {
        return '/date-of-birth';
    }

    get requiredFields() {
        return ['dob_provided'];
    }

    dateName() {
        return ['dob'];
    }

    handlePost(ctx, errors, formdata, session) {
        [ctx, errors] = super.handlePost(ctx, errors);
        if (ctx.dob_provided === 1) {
            const dob = new Date(`${ctx['dob-year']}-${ctx['dob-month']}-${ctx['dob-day']}`);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (ctx['dob-year'] > today.getFullYear()) {
                errors.push(FieldError('dob-year', 'invalid', this.resourcePath, this.generateContent({}, {}, session.language), session.language));
            }

            if (dob >= today) {
                errors.push(FieldError('dob', 'dateInFuture', this.resourcePath, this.generateContent({}, {}, session.language), session.language));
            }
        }

        return [ctx, errors];
    }

    validate(ctx, formdata, language) {
        let [isValid, errors] = [true, {}];
        if (ctx.dob_provided !== 0) {
            [isValid, errors] = super.validate(ctx, formdata, language);
        }
        return [isValid, errors];
    }
    action(ctx, formdata) {
        super.action(ctx, formdata);
        if (ctx.dob_provided === 0) {
            delete ctx.dob;
            delete ctx['dob-day'];
            delete ctx['dob-month'];
            delete ctx['dob-year'];
            delete ctx['dob-formattedDate'];
        }
        return [ctx, formdata];
    }

    nonIntegerFields() {
        return ['dob', 'dob-day', 'dob-month', 'dob-year', 'dob-formattedDate'];
    }

    ignoreFieldsOnPost() {
        return ['dob-day', 'dob-month', 'dob-year', 'dob-formattedDate'];
    }

}

module.exports = ApplicantDateOfBirth;
