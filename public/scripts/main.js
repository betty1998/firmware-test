
// Send form data to server
const form = document.getElementById('upload-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const spinner = document.getElementById('upload-spinner');
    spinner.style.display = 'block';
    const response = await fetch('/', {
        method: 'POST',
        body: formData
    });

    const json = await response.json();
    console.log(JSON.stringify(json));
    spinner.style.display = 'none';
    const update = document.getElementById('update');
    update.style.display = 'block';
});

// add event listener to the check button
const checkButton = document.getElementById('check-btn');
checkButton.addEventListener('click', async (event) => {
    event.preventDefault();
    
    const response = await fetch('https://firmware.ptzoptics.com/F53.HI/RVU.json');
    let imgName;
    let logName;

    if (response.ok) {
        const json = await response.json();
        console.log(JSON.stringify(json));

        // get img name
        imgName = json.data.img_name;
        // get log name
        logName = json.data.log_name;

        // get latest version
        const socVersion = json.data.soc_version;
        console.log('SOC Version:', socVersion);
        const latestVersion = document.getElementById('latest-version');      
        latestVersion.innerHTML = socVersion;
    }
    // get current version
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

    // download files
    // fetch firmware file
    const response3 = await fetch('https://firmware.ptzoptics.com/F53.HI/' + imgName);
    if (response3.ok) {
        const blob = await response3.blob();
        const url = URL.createObjectURL(blob);
        const a = document.getElementById('firmware')
        a.href = url;
        a.download = imgName;
    }
    // fetch changelog file
    const response4 = await fetch('https://firmware.ptzoptics.com/F53.HI/' + logName);
    if (response4.ok) {
        const blob2 = await response4.blob();
        const url2 = URL.createObjectURL(blob2);
        const a2 = document.getElementById('changelog');
        a2.href = url2;
        a2.download = logName;
    }


});

// add event listener to the update button
const updateButton = document.getElementById('update-btn');
updateButton.addEventListener('click', async (event) => {
    event.preventDefault();
    // display spinner
    const spinner = document.getElementById('update-spinner');
    spinner.style.display = 'block';

    // fetch from /update
    const response = await fetch('/update');
    const json = await response.json();
    console.log(JSON.stringify(json));

    // hide spinner and update button
    spinner.style.display = 'none';
    const update = document.getElementById('update');
    update.style.display = 'none';

    // display update result
    const updateResult = document.getElementById('update-result');
    updateResult.style.display = 'block';



});