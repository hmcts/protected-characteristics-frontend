(function() {
    'use strict';

    const clearButton = document.querySelector('#clear-btn');
    const form = document.getElementById('invoker-form');

    const clear = function (e) {
        e.preventDefault();
        // Reset() does not clear hidden inputs so the csrf value is safe.
        form.reset();
    };

    clearButton.addEventListener('click', clear);
    clearButton.addEventListener('touchstart', clear);

}).call(this);
