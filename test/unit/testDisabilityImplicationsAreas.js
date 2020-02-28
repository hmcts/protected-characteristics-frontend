'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ApplicantDisabilityImplicationAreas = steps.ApplicantDisabilityImplicationAreas;

describe('ApplicantDisabilityImplicationAreas', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantDisabilityImplicationAreas.constructor.getUrl();
            expect(url).to.equal('/disability-implications-areas');
            done();
        });
    });

    describe('getContextData()', () => {
        it('should return the context with the disability implications areas', (done) => {
            const req = {
                session: {
                    form: {
                        disabilityimplicationsareas: {
                            disabilityImplicationsAreas: [
                                'optionMobility',
                                'optionMemory'
                            ]
                        }
                    }
                }
            };

            const ctx = ApplicantDisabilityImplicationAreas.getContextData(req);
            expect(ctx.disabilityImplicationsAreas).to.deep.equal([
                'optionMobility',
                'optionMemory'
            ]);
            done();
        });
    });
});
