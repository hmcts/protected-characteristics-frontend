(function () {
    'use strict';

    function changeActorList(service) {
        const actorListRaw = document.querySelector('#actor-select-script').innerHTML;
        const actorList = actorListRaw ? JSON.parse(actorListRaw.trim()) : [];

        if (actorList.length === 0) {
            document.querySelector('#actor-select').innerHTML = '';
        } else {
            let options = '';
            for (const actor in actorList[service]) {
                options += `<option value="${actorList[service][actor]}">${actorList[service][actor]}</option>`;
            }
            document.querySelector('#actor-select').innerHTML = options;
        }

        // Set selected actor if possible
        const actorInputValue = document.querySelector('#actor').value;
        if (actorList[service].includes(actorInputValue)) {
            document.querySelector('#actor-select').value = actorInputValue;
        }
    }

    // Add onChange event listener
    document.querySelector('#service-select')
        .addEventListener('change', (evt => changeActorList(evt.target.value)));
    // Initialise the select options
    window.onload = () => changeActorList(document.querySelector('#service-select').value);

}).call(this);
