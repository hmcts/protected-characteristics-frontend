'use strict';

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#back-button').addEventListener('click', () => history.go(-1));
});
