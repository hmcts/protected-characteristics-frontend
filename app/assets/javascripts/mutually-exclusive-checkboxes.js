(function() {
    'use strict';

    const $selectCheckboxes = document.querySelectorAll('[data-mutually-exclusive="js-select-choice"]');
    const $deselectCheckboxes = document.querySelectorAll('[data-mutually-exclusive="js-deselect-choice"]');

    for (const selectedElement of $selectCheckboxes) {
        selectedElement.addEventListener('click', () => {
            for (const elementToDeselect of $deselectCheckboxes) {
                elementToDeselect.checked = false;
            }
        }, false);
    }

    for (const selectedElement of $deselectCheckboxes) {
        selectedElement.addEventListener('click', () => {
            for (const elementToDeselect of $selectCheckboxes) {
                elementToDeselect.checked = false;
            }
        }, false);
    }
}).call(this);

