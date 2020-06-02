(function() {
    'use strict';

    const backButton = document.querySelector('#back-button');
    const back = function (e) {
        e.preventDefault();
        window.history.back();
    };

    backButton.addEventListener('click', back);
    backButton.addEventListener('touchstart', back);
}).call(this);
