
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
        const text = await response2.text();
        const lines = text.split('\n');
        const versionInfoLine = lines.find(line => line.startsWith('versioninfo='));
        // Split by '=' and remove quotes
        const versionInfo = versionInfoLine.split('=')[1].replace(/"/g, ''); 
        const regex = /SOC v\d+(\.\d+)*\d+/;
        const match = versionInfo.match(regex);
        const version = match[0].substring(4);
        console.log('Version Info:', version);

        const currentVersion = document.getElementById('current-version');
        currentVersion.innerHTML = version;
    }
    // check if current version is smaller than latest version to determine if update is needed
    const current = document.getElementById('current-version').innerHTML;
    const latest = document.getElementById('latest-version').innerHTML;
    if (current < latest) {
        console.log('Update needed');
        const check = document.getElementById('check-result');
        check.style.display = 'block';
    }else{
        console.log('No update needed');
        const version= document.getElementById('version-info');
        version.style.display = 'block';
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