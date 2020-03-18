(function() {
    'use strict';

    const toggleElements = (elementsList1, elementsList2) => {
        for (const selectedElement of elementsList1) {
            selectedElement.addEventListener('click', () => {
                for (const elementToDeselect of elementsList2) {
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
