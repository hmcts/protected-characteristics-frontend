(function() {
    'use strict';

    const backButton = document.querySelector('#back-button');
    const back = function () { history.go(-1) };

    backButton.addEventListener('click', back);
    backButton.addEventListener('touchstart', back);
}).call(this);
