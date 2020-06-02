(function () {
    'use strict';

    const tokenGenButton = document.querySelector('#gen-token-btn');

    const generateToken = function (e) {
        e.preventDefault();

        const token = document.querySelector('#token');
        const formInputs = document.getElementById('invoker-form').getElementsByTagName('input');

        const queries = [];
        for (const input of formInputs) {
            if (input.value.length !== 0 && input.name.match(/^(?!_csrf|token).+/gm)) {
                queries.push(input.name + '=' + input.value);
            }
        }

        fetch(`/invoker/genToken?${queries.join('&')}`).then((res) => {
            res.json().then((json) => {
                token.value = json.token;
            });
        });
    };

    tokenGenButton.addEventListener('click', generateToken);
    tokenGenButton.addEventListener('touchstart', generateToken);
}).call(this);
