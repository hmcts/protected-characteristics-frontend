'use strict';

const stepList = {
    StartPage: 'ApplicantDateOfBirth',
    ApplicantDateOfBirth: 'ApplicantLanguage',
    ApplicantLanguage: 'ApplicantSex',
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
        Female: 'ApplicantPregnant',
        otherwise: 'EndPage'
    },
    ApplicantHealthConditionsImplications: 'ApplicantHealthConditionsImplicationAreas',
    ApplicantHealthConditionsImplicationAreas: {
        Female: 'ApplicantPregnant',
        otherwise: 'EndPage'
    },
    ApplicantPregnant: 'EndPage'
};

module.exports.stepList = stepList;
