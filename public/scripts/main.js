
// Send form data to server
const form = document.getElementById('upload-form');
form.addEventListener('submit', async (event) => {
    console.log('Form submitted');
    event.preventDefault();

    const formData = new FormData(form);
    const response = await fetch('/hi/', {
        method: 'POST',
        body: formData
    });

    const json = await response.json();
    console.log(JSON.stringify(json));
});

// add event listener to the check button
const checkButton = document.getElementById('check-btn');
console.log(checkButton);
checkButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const response = await fetch('https://firmware.ptzoptics.com/F53.HI/RVU.json');
    if (response.ok) {
        const json = await response.json();
        console.log(JSON.stringify(json));

        if (json.code === 200) {
            const socVersion = json.data.soc_version;
            console.log('SOC Version:', socVersion);
            // create a new div element to display the SOC version
            const socVersionDiv = document.createElement('div');
            socVersionDiv.innerHTML = `SOC Version: ${socVersion}`;
            // append the new div element to the version-info div
            const versionInfoDiv = document.getElementById('version-info');
            versionInfoDiv.appendChild(socVersionDiv);

        } else {
            console.log('Error:', json.code);
        }
    } else {
        console.log('HTTP Error:', response.status);
    }

});

// add event listener to the update-btn
const updateButton = document.getElementById('update-btn');
updateButton.addEventListener('click', async (event) => {
    event.preventDefault();
    // fetch from /update
    const response = await fetch('/update');
    const json = await response.json();
    console.log(JSON.stringify(json));
});