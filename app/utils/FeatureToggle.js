'use strict';

const logger = require('app/components/logger');
const config = require('config');
const LaunchDarkly = require('app/components/launch-darkly');

class FeatureToggle {
    constructor() {
        this.launchDarkly = new LaunchDarkly().getInstance();
    }

    callCheckToggle(req, res, next, launchDarkly, featureToggleKey, callback, redirectPage) {
        return this.routeCheckToggle({
            req,
            res,
            next,
            launchDarkly,
            featureToggleKey,
            callback,
            redirectPage
        });
    }

    routeCheckToggle(params) {
        const sessionId = params.req.session.id;
        try {
            this.checkToggle(params.featureToggleKey, (err, showFeature) => {
                if (err) {
                    params.next();
                } else {
                    params.callback({
                        req: params.req,
                        res: params.res,
                        next: params.next,
                        redirectPage: params.redirectPage,
                        isEnabled: showFeature,
                        featureToggleKey: params.featureToggleKey
                    });
                }
            }, sessionId, params.launchDarkly.ftValue);
        } catch (err) {
            params.next();
        }
    }

    checkToggle(featureToggleKey, callback, sessionId, ftValue) {
        const ldUser = config.featureToggles.launchDarklyUser;
        const toggleKey = config.featureToggles[featureToggleKey];
        const defaultValue = ftValue && ftValue[featureToggleKey] ? ftValue[featureToggleKey] : false;

        this.launchDarkly.variation(toggleKey, ldUser, defaultValue, (err, enabled) => {
            logger(sessionId).info(`Checking feature toggle: ${toggleKey}, isEnabled: ${enabled}`);
            callback(err, enabled);
        });
    }

    togglePage(params) {
        if (params.isEnabled) {
            params.next();
        } else {
            params.res.redirect(params.redirectPage);
        }
    }

    toggleExistingPage(params) {
        if (params.isEnabled) {
            params.res.redirect(params.redirectPage);
        } else {
            params.next();
        }
    }

    toggleFeature(params) {
        if (!params.req.session.featureToggles) {
            params.req.session.featureToggles = {};
        }
        params.req.session.featureToggles[params.featureToggleKey] = params.isEnabled;
        params.next();
    }

    static appwideToggles(req, ctx, appwideToggles) {
        if (appwideToggles.length) {
            ctx.featureToggles = {};
            appwideToggles.forEach((toggleKey) => {
                ctx.featureToggles[toggleKey] = FeatureToggle.isEnabled(req.session.featureToggles, toggleKey).toString();
            });
        }

        return ctx;
    }

    static isEnabled(featureToggles, key) {
        if (featureToggles && featureToggles[key]) {
            return true;
        }
        return false;
    }
}

module.exports = FeatureToggle;
