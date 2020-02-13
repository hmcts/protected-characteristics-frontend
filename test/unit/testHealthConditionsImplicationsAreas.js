'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantHealthConditionsImplicationAreas = steps.ApplicantHealthConditionsImplicationAreas;

describe('ApplicantHealthConditionsImplicationAreas', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantHealthConditionsImplicationAreas.constructor.getUrl();
            expect(url).to.equal('/health-conditions-implications-areas');
            done();
        });
    });

    describe('getContextData()', () => {
        it('should return the context with the health conditions implications areas', (done) => {
            const req = {
                session: {
                    form: {
                        healthconditionsimplicationsareas: {
                            healthConditionsImplicationsAreas: [
                                'optionMobility',
                                'optionMemory'
                            ]
                        }
                    }
                }
            };

            const ctx = ApplicantHealthConditionsImplicationAreas.getContextData(req);
            expect(ctx.healthConditionsImplicationsAreas).to.deep.equal([
                'optionMobility',
                'optionMemory'
            ]);
            done();
        });
    });

    describe('action()', () => {
        it('test that context variables are removed and empty object returned', () => {
            let formdata = {};
            let ctx = {
                healthConditionsImplicationsAreas: [
                    'optionMemory',
                    'optionSocially'
                ]
            };
            [ctx, formdata] = ApplicantHealthConditionsImplicationAreas.action(ctx, formdata);
            expect(ctx).to.deep.equal({});
        });
    });
});
