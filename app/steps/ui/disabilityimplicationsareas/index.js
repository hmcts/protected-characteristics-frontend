'use strict';

const MultiPartValidationStep = require('app/core/steps/MultiPartValidationStep');

const CHECKBOX_FIELDS = [
    'disability_vision',
    'disability_hearing',
    'disability_mobility',
    'disability_dexterity',
    'disability_learning',
    'disability_memory',
    'disability_mental_health',
    'disability_stamina',
    'disability_social',
    'disability_other',
    'disability_none'
];

class ApplicantDisabilityImplicationAreas extends MultiPartValidationStep {

    static getUrl() {
        return '/disability-implications-areas';
    }

    static fields() {
        return [...CHECKBOX_FIELDS, 'disability_other_details'];
    }

    getContextData(req, res, featureToggles) {
        const ctx = super.getContextData(req, res, featureToggles, ['disabilityImplicationsAreas', ...CHECKBOX_FIELDS]);
        ctx.disabilityImplicationsAreas = ctx.disabilityImplicationsAreas || [];

        // Force disability implication areas as an array
        if (!Array.isArray(ctx.disabilityImplicationsAreas)) {
            ctx.disabilityImplicationsAreas = [ctx.disabilityImplicationsAreas];
        }

        return ctx;
    }

    handlePost(ctx, errors) {
        // If no options have been selected, set all the options to NULL else 0
        const fieldDefault = ctx.disabilityImplicationsAreas.length === 0 ? null : 0;
        CHECKBOX_FIELDS.forEach(field => (ctx[field] = fieldDefault));

        ctx.disabilityImplicationsAreas.forEach(disability => {
            ctx[disability] = 1;
        });

        if (ctx.disability_other !== 1 && ctx.disability_other_details) {
            delete ctx.disability_other_details;
        }

        delete ctx.disabilityImplicationsAreas;

        return [ctx, errors];
    }

    nonIntegerFields() {
        return ['disabilityImplicationsAreas', 'disability_other_details'];
    }

}

module.exports = ApplicantDisabilityImplicationAreas;
