'use strict';

const {mapValues, map, reduce, escape, isObject, isEmpty, forEach, has} = require('lodash');
const UIStepRunner = require('app/core/runners/UIStepRunner');
const JourneyMap = require('app/core/JourneyMap');
const mapErrorsToFields = require('app/components/error').mapErrorsToFields;
const config = require('app/config');
const ServiceMapper = require('app/utils/ServiceMapper');
const FeatureToggle = require('app/utils/FeatureToggle');
const utils = require('app/components/step-utils');
const moment = require('moment');

class Step {

    static getUrl() {
        throw new ReferenceError('Step must override #url');
    }

    get name() {
        return this.constructor.name;
    }

    runner() {
        return new UIStepRunner();
    }

    get template() {
        if (!this.templatePath) {
            throw new TypeError(`Step ${this.name} has no template file in its resource folder`);
        }
        return `${this.templatePath}/template`;
    }

    constructor(steps, section = null, resourcePath, i18next, schema, language = 'en') {
        this.steps = steps;
        this.section = section;
        this.resourcePath = resourcePath;
        this.templatePath = `ui/${resourcePath}`;
        this.content = require(`app/resources/${language}/translation/${resourcePath}`);
        this.i18next = i18next;
    }

    next(req, ctx) {
        const journeyMap = new JourneyMap(req.session.journey);
        return journeyMap.nextStep(this, ctx);
    }

    nextStepUrl(req, ctx) {
        return config.app.basePath + this.next(req, ctx).constructor.getUrl();
    }

    getContextData(req, res, featureToggle, fieldsToClearOnPost = []) {
        const session = req.session;
        let ctx = {};
        Object.assign(ctx, session.ctx[this.section] || {});
        ctx.sessionID = req.sessionID;
        ctx = Object.assign(ctx, this.parseFields(req.body));

        if (req.method === 'POST') {
            forEach(fieldsToClearOnPost, (field) => {
                if (!has(req.body, field)) {
                    delete ctx[field];
                }
            });
        }

        ctx = FeatureToggle.appwideToggles(req, ctx, config.featureToggles.appwideToggles);

        return ctx;
    }

    handleGet(ctx) {
        return [ctx];
    }

    handlePost(ctx, errors) {
        return [ctx, errors];
    }

    validate() {
        return [true, []];
    }

    isComplete() {
        return [this.validate()[0], 'noProgress'];
    }

    generateContent(ctx, formdata, language = 'en') {
        if (!this.content) {
            throw new ReferenceError(`Step ${this.name} has no content.json in its resource folder`);
        }
        const contentCtx = Object.assign({}, formdata, ctx, this.commonProps);
        this.i18next.changeLanguage(language);

        return mapValues(this.content, (value, key) => this.i18next.t(`${this.resourcePath.replace(/\//g, '.')}.${key}`, contentCtx));
    }

    commonContent(language = 'en') {
        this.i18next.changeLanguage(language);
        const common = require(`app/resources/${language}/translation/common`);
        return mapValues(common, (value, key) => this.i18next.t(`common.${key}`));
    }

    generateFields(language, ctx, errors) {
        let fields = mapValues(ctx, (value, key) => {
            let returnValue;

            if (key.includes('formattedDate')) {
                const dateName = key.split('-')[0];
                const date = moment(ctx[`${dateName}-day`] + '/' + ctx[`${dateName}-month`] + '/' + ctx[`${dateName}-year`], config.dateFormat).parseZone();
                returnValue = utils.formattedDate(date, language);
            } else {
                returnValue = isObject(value) ? value : escape(value);
            }

            return {
                value: returnValue,
                error: false
            };
        });
        if (!isEmpty(errors)) {
            fields = mapErrorsToFields(fields, errors);
        }
        return fields;
    }

    // Returns an array of fields which need to be converted from strings to integers
    integerFields() {
        return [];
    }

    parseFields(fields) {
        this.integerFields().forEach(field => {
            if (fields[field] && !isNaN(parseInt(fields[field]))) {
                fields[field] = parseInt(fields[field]);
            }
        });

        return fields;
    }

    // Returns an array of fields to be ignored by the form data
    ignoreFieldsOnPost() {
        return [];
    }

    persistFormData(formdata, sessionID, req) {
        const formData = ServiceMapper.map(
            'FormData',
            [config.services.orchestration.url, sessionID]
        );
        return formData.post(req.authToken, req.session.serviceAuthorization, formdata);
    }

    action(ctx, formdata) {
        delete ctx.sessionID;
        delete ctx.featureToggles;
        delete ctx._csrf;
        return [ctx, formdata];
    }

    anySoftStops(formdata, ctx) {
        const softStopsList = map(this.steps, step => step.isSoftStop(formdata, ctx));
        const isSoftStop = reduce(softStopsList, (accumulator, nextElement) => {
            return accumulator || nextElement.isSoftStop;
        }, false);
        return isSoftStop;
    }

    isSoftStop() {
        return {
            'stepName': this.constructor.name,
            'isSoftStop': false
        };
    }

    setHardStop(ctx, reason) {
        ctx.stopReason = reason;
    }

    renderPage(res, html) {
        res.send(html);
    }
}

module.exports = Step;
