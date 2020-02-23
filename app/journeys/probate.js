'use strict';

const stepList = {
    StartPage: 'ApplicantDateOfBirth',
    ApplicantDateOfBirth: 'ApplicantLanguage',
    ApplicantLanguage: {
        otherLanguage: 'ApplicantEnglishLevel',
        otherwise: 'ApplicantSex'
    },
    ApplicantEnglishLevel: 'ApplicantSex',
    ApplicantSex: 'ApplicantGenderSameAsSex',
    ApplicantGenderSameAsSex: 'ApplicantSexualOrientation',
    ApplicantSexualOrientation: 'ApplicantMaritalStatus',
    ApplicantMaritalStatus: 'ApplicantEthnicGroup',
    ApplicantEthnicGroup: {
        White: 'ApplicantEthnicBackgroundWhite',
        Mixed: 'ApplicantEthnicBackgroundMixed',
        Asian: 'ApplicantEthnicBackgroundAsian',
        Black: 'ApplicantEthnicBackgroundBlack',
        Other: 'ApplicantEthnicBackgroundOther',
        otherwise: 'ApplicantReligion'
    },
    ApplicantEthnicBackgroundWhite: 'ApplicantReligion',
    ApplicantEthnicBackgroundMixed: 'ApplicantReligion',
    ApplicantEthnicBackgroundAsian: 'ApplicantReligion',
    ApplicantEthnicBackgroundBlack: 'ApplicantReligion',
    ApplicantEthnicBackgroundOther: 'ApplicantReligion',
    ApplicantReligion: 'ApplicantHealthConditions',
    ApplicantHealthConditions: {
        Yes: 'ApplicantHealthConditionsImplications',
        otherwise: 'ApplicantPregnant'
    },
    ApplicantHealthConditionsImplications: {
        Yes: 'ApplicantHealthConditionsImplicationAreas',
        otherwise: 'ApplicantPregnant'
    },
    ApplicantHealthConditionsImplicationAreas: 'ApplicantPregnant',
    ApplicantPregnant: 'EndPage'
};

module.exports.stepList = stepList;
