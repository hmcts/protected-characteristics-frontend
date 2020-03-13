'use strict';

const requireDirectory = require('require-directory');
const steps = requireDirectory(module);

module.exports = () => {
    return actor({
        startapply: steps.startpage.startpage,
        dateofbirth: steps.dateofbirth.dateofbirth,
        mainlanguage: steps.language.language,
        selectsex: steps.sex.sex,
        selectgendersameassex: steps.gendersameassex.gendersameassex,
        entermaritalstatus: steps.maritalstatus.maritalstatus,
        enterethnicgroup: steps.ethnicgroup.ethnicgroup,
        enterdisability: steps.disability.disability
    });
};
