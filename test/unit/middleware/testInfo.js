'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const rewire = require('rewire');
const info = rewire('app/middleware/info');

describe('setJourney', () => {
    it('should set req.journey with the default journey when no form session', (done) => {
        info.__set__('gitProperties', {
            git: {
                commit: {
                    time: 'Tue May 19 2020 12:00:25 GMT+0100 (British Summer Time)',
                    id: 'commitid',
                    test: 'I should not see this on the info endpoint',
                }
            }
        });
        const res = {json: sinon.spy()};

        info({}, res);

        expect(res.json.calledWith({
            git: {
                commit: {
                    time: 'Tue May 19 2020 12:00:25 GMT+0100 (British Summer Time)',
                    id: 'commitid'
                }
            }
        })).to.equal(true);

        done();
    });
});
