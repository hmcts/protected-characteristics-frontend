const event = require('codeceptjs').event;
const container = require('codeceptjs').container;
const exec = require('child_process').exec;
const sauceUsername = 'salivendra';
const sauceKey = 'd8c2d5fc-1807-434d-bdbd-133e326416ec';

function updateSauceLabsResult(result, sessionId) {
    console.log('SauceOnDemandSessionID=' + sessionId + ' job-name=div-petitioner-frontend'); /* eslint-disable-line no-console, prefer-template */
    return 'curl -X PUT -s -d \'{"passed": ' + result + '}\' -u ' + sauceUsername + ':' + sauceKey + ' https://eu-central-1.saucelabs.com/rest/v1/' + sauceUsername + '/jobs/' + sessionId;
}

module.exports = function() {

    // Setting test success on SauceLabs
    event.dispatcher.on(event.test.passed, () => {

        const sessionId = container.helpers('WebDriverIO').browser.requestHandler.sessionID;
        exec(updateSauceLabsResult('true', sessionId));

    });

    // Setting test failure on SauceLabs
    event.dispatcher.on(event.test.failed, () => {

        const sessionId = container.helpers('WebDriverIO').browser.requestHandler.sessionID;
        exec(updateSauceLabsResult('false', sessionId));

    });
};
