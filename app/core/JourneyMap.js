'use strict';

const {get} = require('lodash');
const steps = require('app/core/initSteps').steps;

class JourneyMap {
    constructor(journey) {
        this.journey = journey;
    }

    nextOptionStep(currentStep, ctx) {
        const match = currentStep
            .nextStepOptions(ctx).options
            .find((option) => get(ctx, option.key) === option.value);
        return match ? match.choice : 'otherwise';
    }

    nextStep(currentStep, ctx) {
        let nextStepName = this.journey.stepList[currentStep.name];
        if (nextStepName !== null && typeof nextStepName === 'object') {
            nextStepName = nextStepName[this.nextOptionStep(currentStep, ctx)];
        }

        if (this.journey.skipList) {
            const skipListNames = this.journey.skipList.map(sl => sl.stepName);
            if (skipListNames.includes(nextStepName)) {
                const skipStep = this.journey.skipList[skipListNames.indexOf(nextStepName)];
                // If the skip step specifies the next step, use that, else find the next step.
                return skipStep.nextStepName ? steps[skipStep.nextStepName] : this.nextStep(steps[nextStepName], ctx);
            }
        }

        return steps[nextStepName];
    }

    stepList() {
        return this.journey.stepList;
    }
}

module.exports = JourneyMap;
