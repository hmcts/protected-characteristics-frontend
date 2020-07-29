'use strict';

const expect = require('chai').expect;
const rewire = require('rewire');
const JourneyMap = rewire('app/core/JourneyMap');
const defaultJourney = require('app/journeys/default');

describe('JourneyMap.js', () => {
    let currentStep;

    beforeEach(() => {
        currentStep = {
            nextStepOptions: () => {
                return {
                    options: [
                        {key: 'language', value: 'optionOther', choice: 'otherLanguage'}
                    ]
                };
            }
        };
    });

    describe('nextOptionStep()', () => {
        it('should return the next option step', (done) => {
            const ctx = {
                language: 'optionOther'
            };
            const journeyMap = new JourneyMap();
            const nextOptionStep = journeyMap.nextOptionStep(currentStep, ctx);
            expect(nextOptionStep).to.equal('otherLanguage');
            done();
        });

        it('should return otherwise', (done) => {
            const ctx = {};
            const journeyMap = new JourneyMap();
            const nextOptionStep = journeyMap.nextOptionStep(currentStep, ctx);
            expect(nextOptionStep).to.equal('otherwise');
            done();
        });
    });

    describe('nextStep()', () => {
        let revert;
        let journey;

        beforeEach(() => {
            revert = JourneyMap.__set__('steps', {
                ApplicantEnglishLevel: {
                    name: 'ApplicantEnglishLevel'
                },
                ApplicantGenderSameAsSex: {
                    name: 'ApplicantGenderSameAsSex'
                }
            });
            journey = defaultJourney;
        });

        afterEach(() => {
            revert();
        });

        it('should return the next option step if the next step is a string', (done) => {
            currentStep.name = 'ApplicantSex';
            const ctx = {};
            const journeyMap = new JourneyMap(journey);
            const nextStep = journeyMap.nextStep(currentStep, ctx);
            expect(nextStep).to.deep.equal({name: 'ApplicantGenderSameAsSex'});
            done();
        });

        it('should return the next option step if the next step is an object', (done) => {
            currentStep.name = 'ApplicantLanguage';
            const ctx = {
                language: 'optionOther'
            };
            const journeyMap = new JourneyMap(journey);
            const nextStep = journeyMap.nextStep(currentStep, ctx);
            expect(nextStep).to.deep.equal({name: 'ApplicantEnglishLevel'});
            done();
        });
    });

    describe('nextStep() - With skip list', () => {
        it('should skip a step if it is in the skip list', (done) => {
            const revert = JourneyMap.__set__('steps', {
                ApplicantDateOfBirth: {
                    name: 'ApplicantDateOfBirth'
                },
                ApplicantLanguage: {
                    name: 'ApplicantLanguage'
                }
            });

            currentStep.name = 'StartPage';

            const journey = require('test/data/journeys/test');
            journey.skipList = [
                {stepName: 'ApplicantDateOfBirth'}
            ];

            const ctx = {};
            const journeyMap = new JourneyMap(journey);
            const nextStep = journeyMap.nextStep(currentStep, ctx);
            expect(nextStep).to.deep.equal({name: 'ApplicantLanguage'});
            revert();
            done();
        });

        it('should skip a step in the skip list and navigate to the specified next step', (done) => {
            const revert = JourneyMap.__set__('steps', {
                ApplicantDateOfBirth: {
                    name: 'ApplicantDateOfBirth'
                },
                ApplicantSex: {
                    name: 'ApplicantSex'
                }
            });

            currentStep.name = 'StartPage';

            const journey = require('test/data/journeys/test');
            journey.skipList = [
                {stepName: 'ApplicantDateOfBirth', nextStepName: 'ApplicantSex'}
            ];

            const ctx = {};
            const journeyMap = new JourneyMap(journey);
            const nextStep = journeyMap.nextStep(currentStep, ctx);
            expect(nextStep).to.deep.equal({name: 'ApplicantSex'});
            revert();
            done();
        });
    });

    describe('stepList()', () => {
        it('should return the journey step list', (done) => {
            const journeyMap = new JourneyMap(defaultJourney);
            const stepList = journeyMap.stepList();
            expect(stepList).to.deep.equal(defaultJourney.stepList);
            done();
        });
    });
});
