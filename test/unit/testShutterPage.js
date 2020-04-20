'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/ui`]);
const ShutterPage = steps.ShutterPage;

describe('ShutterPage', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ShutterPage.constructor.getUrl();
            expect(url).to.equal('/offline');
            done();
        });
    });

    describe('generateContent()', () => {
        it('should return variable text for a service', () => {
            const formdata = {
                serviceId: 'cmc',
                actor: 'claimant'
            };
            const content = ShutterPage.generateContent({}, formdata);
            expect(content.paragraph1).to.equal('We have saved your answers and will direct you back to your application now.');
        });

        it('should return variable text for a service in welsh', () => {
            const formdata = {
                serviceId: 'cmc',
                actor: 'claimant'
            };
            const content = ShutterPage.generateContent({}, formdata, 'cy');
            expect(content.paragraph1).to.equal('Rydym wedi arbed eich atebion a byddwn yn eich cyfeirio yn ôl at eich hawliad yn awr.');
        });
    });
});
