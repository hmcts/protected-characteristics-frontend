/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const {I} = inject();

Given('I am a probate Citizen user', () => {
    //To:Do : Probate team
});

When('I invoke the PCQs task', () => {
    //To:Do : Probate team
});

Then('I am presented with the PCQ Intro page', () => {
    I.startapply();
});

Then('continue button exists', () => {
    I.see('Continue to the question');
});

Then('there is an opt out option', () => {
    I.see('I don\'t want to answer these questions');
});
