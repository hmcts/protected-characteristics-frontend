'use strict';

const Step = require('app/core/steps/Step');

class EndPage extends Step {

    static getUrl () {
        return '/end-page';
    }
}

module.exports = EndPage;
