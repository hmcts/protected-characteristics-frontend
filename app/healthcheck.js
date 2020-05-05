'use strict';

const healthcheck = require('@hmcts/nodejs-healthcheck');
const logger = require('app/components/logger')('Init');
const os = require('os');
const config = require('config');
const getStore = require('app/components/utils').getStore;
const session = require('express-session');
const sessionStore = getStore(config.redis, session);

const osHostname = os.hostname();
const gitProperties = require('git.properties');
const gitCommitId = gitProperties.git.commit.id;
const gitRevision = process.env.GIT_REVISION;

const statusComment = 'Please disregard \'status\' and take \'actualStatus\' as the absolute truth.';
const checks = {
    'pcq-backend': healthcheck.web(`${config.services.pcqBackend.url}/health`, {
        callback: (err, res) => {
            const status = err ? 'DOWN' : res.body.status;
            if (status === 'DOWN') {
                logger.info('pcq-backend is DOWN');
            }
            return healthcheck.up({actualStatus: status, comment: statusComment});
        },
        timeout: 5000,
        deadline: 10000
    })
};
if (sessionStore.constructor.name === 'RedisStore') {
    checks.redis = healthcheck.raw(() => {
        const healthy = sessionStore.client.status === 'ready';
        if (!healthy) {
            logger.info('redis is DOWN');
        }
        return healthy ? healthcheck.up() : healthcheck.down();
    });
}

const setup = app => {
    healthcheck.addTo(app, {
        checks: checks,
        buildInfo: {
            name: config.service.name,
            host: os.hostname(),
            uptime: process.uptime(),
            version: gitRevision,
            gitCommitId
        }
    });
};

module.exports = {
    setup: setup,
    osHostname: osHostname,
    gitCommitId: gitCommitId
};
