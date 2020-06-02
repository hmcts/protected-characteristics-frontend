(function () {
    'use strict';

    const fillButton = document.querySelector('#fill-btn');

    const fill = function (e) {
        e.preventDefault();

        const inputFields = document.getElementById('invoker-form').getElementsByTagName('input');
        const emptyFields = [];
        for (const field of inputFields) {
            if (field.value.length === 0) {
                emptyFields.push(field.name);
            }
        }

        const service = document.querySelector('#service-select').value;
        const actor = document.querySelector('#actor-select').value;

        const formFillerUrl = `/invoker/formFiller?service=${service}&actor=${actor}&fields=${emptyFields.join(',')}`;
        fetch(formFillerUrl).then(function (res) {
            res.json().then(function (json) {
                Object.keys(json).forEach(key => {
                    const input = document.getElementById(key);
                    if (input) {
                        input.value = json[key];
                    }
                });
            });
        });
    };

    fillButton.addEventListener('click', fill);
    fillButton.addEventListener('touchstart', fill);
}).call(this);
