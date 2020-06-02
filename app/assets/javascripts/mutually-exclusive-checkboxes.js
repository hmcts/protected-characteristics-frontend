(function() {
    'use strict';

    const toggleElements = function (elementsList1, elementsList2) {
        for (let i = 0; i < elementsList1.length; i++) {
            const selectedElement = elementsList1[i];
            selectedElement.addEventListener('click', function () {
                for (let j = 0; j < elementsList2.length; j++) {
                    const elementToDeselect = elementsList2[j];
                    const controls = elementToDeselect.getAttribute('aria-controls');
                    if (controls) {
                        const controlledElement = document.querySelector('#' + controls);
                        controlledElement.classList.add('govuk-checkboxes__conditional--hidden');
                    }

                    elementToDeselect.checked = false;
                    elementToDeselect.setAttribute('aria-expanded', 'false');
                }
            }, false);
        }
    };

    const $selectCheckboxes = document.querySelectorAll('[data-mutually-exclusive="js-select-choice"]');
    const $deselectCheckboxes = document.querySelectorAll('[data-mutually-exclusive="js-deselect-choice"]');

    toggleElements($selectCheckboxes, $deselectCheckboxes);
    toggleElements($deselectCheckboxes, $selectCheckboxes);
}).call(this);
