'use strict';

const expect = require('chai').expect;
const Invoker = require('app/utils/Invoker');

/* eslint-disable no-unused-expressions */
describe('Invoker', () => {
    let invoker;

    beforeEach(() => {
        invoker = new Invoker();
    });

    describe('fillForm() && formFiller()', () => {
        it('should fill all fields when they are empty', (done) => {
            const service = 'SERVICE';
            const actor = 'ACTOR';
            const fields = ['serviceId', 'actor', 'pcqId', 'ccdCaseId', 'partyId', 'language', 'returnUrl', 'default'];

            const formFiller = invoker.fillForm(service, actor, fields);

            expect(formFiller.serviceId).to.equal('SERVICE');
            expect(formFiller.actor).to.equal('ACTOR');
            expect(formFiller.pcqId).to.not.be.empty;
            expect(formFiller.ccdCaseId).to.not.be.empty;
            expect(formFiller.partyId).to.equal('SERVICE_ACTOR@test.gov.uk');
            expect(formFiller.returnUrl).to.equal('SERVICE_ACTOR.test.gov.uk');
            expect(formFiller.language).to.equal('en');
            expect(formFiller.default).to.equal('');

            done();
        });

        it('should fill only serviceID and actor when PCQLite is true and all fields are empty', (done) => {
            const service = 'PROBATE';
            const actor = 'APPLICANT';
            const fields = ['serviceId', 'actor', 'pcqId', 'ccdCaseId', 'partyId', 'language', 'returnUrl', 'default'];

            const formFiller = invoker.fillForm(service, actor, fields);

            expect(formFiller.serviceId).to.equal('PROBATE');
            expect(formFiller.actor).to.equal('APPLICANT');
            expect(formFiller.pcqId).to.be.empty;
            expect(formFiller.ccdCaseId).to.be.empty;
            expect(formFiller.partyId).to.be.empty;
            expect(formFiller.returnUrl).to.be.empty;
            expect(formFiller.language).to.be.empty;
            expect(formFiller.default).to.equal('');

            done();
        });
    });

    describe('serviceEndpoint()', () => {
        it('should generate the service endpoint url', (done) => {
            const form = {
                serviceId: 'a',
                actor: 'b',
                pcqId: 'c',
                ccdCaseId: 'd',
                partyId: 'e',
                returnUrl: 'f',
                language: 'g',
                _csrf: 'h',
            };

            const serviceEndpoint = invoker.serviceEndpoint(form);
            expect(serviceEndpoint).to.equal('/service-endpoint?serviceId=a&actor=b&pcqId=c&ccdCaseId=d&partyId=e&returnUrl=f&language=g');
            done();
        });
    });

    describe('content()', () => {
        it('should return the correct content', (done) => {
            expect(invoker.content).to.deep.equal({
                serviceList: [
                    {
                        value: 'PROBATE',
                        text: 'PROBATE'
                    },
                    {
                        value: 'CMC',
                        text: 'CMC'
                    },
                    {
                        value: 'DIVORCE',
                        text: 'DIVORCE'
                    },
                    {
                        value: 'SSCS',
                        text: 'SSCS'
                    }
                ],
                actorList: {
                    'PROBATE': [
                        'APPLICANT'
                    ],
                    'CMC': [
                        'CLAIMANT',
                        'DEFENDANT'
                    ],
                    'DIVORCE': [
                        'PETITIONER',
                        'RESPONDENT',
                        'CORESPONDENT'
                    ],
                    'SSCS': [
                        'APPELLANT'
                    ]
                },
                pcqLiteList: {
                    'PROBATE': true,
                    'CMC': false,
                    'DIVORCE': false,
                    'SSCS': false
                }
            });
            done();
        });
    });
});
