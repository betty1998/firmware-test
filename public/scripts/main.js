
// Send form data to server
const form = document.getElementById('upload-form');
form.addEventListener('submit', async (event) => {
    console.log('Form submitted');
    event.preventDefault();

    const formData = new FormData(form);
    const response = await fetch('/', {
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
    // get latest version
    const response = await fetch('https://firmware.ptzoptics.com/F53.HI/RVU.json');
    if (response.ok) {
        const json = await response.json();
        console.log(JSON.stringify(json));

        const socVersion = json.data.soc_version;
        console.log('SOC Version:', socVersion);
        const latestVersion = document.getElementById('latest-version');      
        latestVersion.innerHTML = socVersion;
    }
    // get current version
    // fetch from /cgi-bin/param.cgi with param f=get_device_conf
    const response2 = await fetch('/cgi-bin/param.cgi?f=get_device_conf');
    if (response2.ok) {
        const json2 = await response2.json();
        console.log(JSON.stringify(json2));

        const versioninfo = json2.versioninfo;
        console.log('Version Info:', versioninfo);
        const currentVersion = document.getElementById('current-version');
        currentVersion.innerHTML = versioninfo;
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