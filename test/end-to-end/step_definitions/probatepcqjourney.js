/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const {I} = inject();

Given('I am a probate Citizen user', () => {
    I.click('Sign in', '//html/body/div[1]/header');
    I.see('Sign in to GitHub', 'h1');
    I.fillField('Username or email address', 'something@totest.com');
    I.fillField('Password', '123456');
    I.click('Sign in');
    I.see('Incorrect username or password.', '.flash-error');
    //To:Do : Probate team
});

When('I invoke the PCQs task', () => {
    //To:Do : Probate team
});

Then('I am presented with the PCQ Intro page', () => {
    I.startapply();
});

When('I submit all pcq questions', () => {
    I.dateofbirth();
    I.selectenglishorwelsh();
    I.selectsexmale();
    I.selectyesgendersameassex();
    I.selecthetersexualorientation();
    I.selectyesmaritalstatus();
    I.selectethnicgroup();
    I.selectenglishethnicgroup();
    I.selectchristianreligion();
    I.selectyesdisability();
    I.selectyespregnant();
    I.see('You have answered the equality questions');
});

Then('a record successfully created in database', () => {
    //To:Do : Database insertion
});
When('I submit No for all pcq questions', () => {
    I.dobvalidations();
    I.selectotherlanguage();
    I.selectverywellenglishlevel();
    I.selectsexfemale();
    I.selectnogendersameassex();
    I.selectothersexualorientation();
    I.selectnomaritalstatus();
    I.selectethnicMixedormultipleethnicgroups();
    I.selectmixedwhiteandblackcaribbeanethnicgroup();
    I.selectotherreligion();
    I.selectnodisability();
    I.selectnopregnant();
    I.see('You have answered the equality questions');
});
When('I submit prefer not to say for all pcq questions', () => {
    I.dobprefernottosay();
    I.selectlanguageprefernottosay();
    I.sexprefernottosay();
    I.gendersameassexprefernottosay();
    I.sexualorientationprefernottosay();
    I.maritalstatusprefernottosay();
    I.selectprefernottosayethnicgroup();
    I.selectwhiteethnicgroupprefernottosay();
    I.selectreligionprefernottosay();
    I.disabilityprefernottosay();
    I.selectpregnantprefernottosay();
    I.see('You have answered the equality questions');
});
