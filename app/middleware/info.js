'use strict';

const {pick} = require('lodash');
const gitProperties = require('git.properties');

const info = (req, res) => {
    res.json({
        git: {commit: pick(gitProperties.git.commit, ['time', 'id'])}
    });
};

module.exports = info;
