//control the main progress bar
document.getElementById('p1').addEventListener('mdl-componentupgraded', function () {
    this.MaterialProgress.setProgress(44);
});

//start / stop tor button
document.getElementById('start_button').addEventListener("click", function () {
    if (document.getElementById('start_button_text').innerHTML == "Start Tor") {
        document.getElementById('terminal').classList.add('visible');
        lib.init(function () {
            runTor();
        });
        document.getElementById('start_button_text').innerHTML = "Restart Tor";
    } else {
        document.querySelector('body').classList.add('hide');
        setTimeout(function () {
            location.href = "restart.html";
        }, 300);
    }
});

//open settings button
document.getElementById('settings_button').addEventListener("click", function () {
    document.querySelector('body').classList.add('hide');
    setTimeout(function () {
        location.href = "settings.html";
    }, 300);
});

//get theme
chrome.storage.local.get('theme', function (value) {
    if (value.theme == 'dark') {
        document.body.classList.add('dark');
    }
});

//on load effect
document.body.classList.add('closed');
setTimeout(function () {
    document.body.classList.add('open');
}, 10);

//help and about us
document.getElementById('help').addEventListener("click", function () {
    document.querySelector('body').classList.add('hide');
    setTimeout(function () {
        window.location.assign("about.html");
    }, 300);
});