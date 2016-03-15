//control the main progress bar
document.getElementById('p1').addEventListener('mdl-componentupgraded', function () {
    this.MaterialProgress.setProgress(0);
});

//loading settings
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get({
        firstrun: true,
        restarting_tor: false,
        autostart_tor: false,
        proxy_type: "none",
        proxy_address: "none",
        proxy_port: "none",
        accessible_ports: "all",
        reachable_addresses: "all",
        tor_port: 9999,
        theme: "dark",
        adv_opt:"none"
    }, function (items) {
        //console.log(items);
        if (items.restarting_tor || items.autostart_tor) {
            lib.init(function () {
                set_settings(items); // in tor.js
                runTor();
                updateTorStatus( "Tor is running, see below for details.");
            });
            chrome.storage.local.set({ restarting_tor: false });
            document.getElementById('start_button_text').innerHTML = "Restart Tor";
            document.getElementById('anonymity').setAttribute('style', 'display:inline-block');
        }
        set_gui(items);
        set_settings(items); // in tor.js
    });
});

//set start up settings
function set_gui(items) {
    //set theme
    if (items.theme == 'dark') {
        document.body.classList.add('dark');
    }
    //autostart checkbox to be ticked
    if (items.autostart_tor) {
        document.getElementById('autostart_checkbox').click();
    }
    //check first run
    if (items.firstrun) {
        document.getElementById("first-time-dialog--overlay").classList.add("visible");
    }
}

//first time dialog close
document.getElementById('ok_button').addEventListener("click", function () {
    document.getElementById('first-time-dialog--overlay').classList.remove('visible');
    chrome.storage.local.set({ firstrun: false });
});

//anonymity
document.getElementById('anonymity_ok_button').addEventListener("click", function () {
    document.getElementById('anonymity-help--overlay').classList.remove('visible');
});

//start / restart tor button
document.getElementById('start_button').addEventListener("click", function () {
    if (document.getElementById('start_button_text').innerHTML == "Start Tor") {
        document.getElementById('terminal').classList.add('visible');
        lib.init(function () {
            runTor();
        });
        updateTorStatus( "Tor is running, see below for details.");
        document.getElementById('start_button_text').innerHTML = "Restart Tor";
        document.getElementById('anonymity').setAttribute('style', 'display:inline-block');
    } else {
        chrome.storage.local.set({ restarting_tor: true });
        document.querySelector('body').classList.add('hide');
        setTimeout(function () {
            location.href = "restart.html";
        }, 300);
        //update tor status text
        updateTorStatus("Restarting Tor ...");
    }
});

//tor status update
function updateTorStatus(status) {
    document.getElementById('tor_status').innerHTML = status;
}

//open settings button
document.getElementById('settings_button').addEventListener("click", function () {
    document.querySelector('body').classList.add('hide');
    setTimeout(function () {
        location.href = "settings.html";
    }, 300);
});

//on load effect
document.body.classList.add('closed');
setTimeout(function () {
    document.body.classList.add('open');
}, 10);

//autostart tor option
document.getElementById('autostart_checkbox').addEventListener("click", function () {
    if (this.checked) {
        chrome.storage.local.set({ 'autostart_tor': true });
    }
    else {
        chrome.storage.local.set({ 'autostart_tor': false });
    }
});

//help and about us
document.getElementById('help').addEventListener("click", function () {
    document.getElementById("first-time-dialog--overlay").classList.add("visible");
    /*document.querySelector('body').classList.add('hide');
    setTimeout(function () {
        window.location.assign("about.html");
    }, 300);*/
});

//anonymity
document.getElementById('anonymity').addEventListener("click", function () {
    document.getElementById("anonymity-help--overlay").classList.add("visible");
    /*document.querySelector('body').classList.add('hide');
     setTimeout(function () {
     window.location.assign("about.html");
     }, 300);*/
});
