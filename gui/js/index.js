//control the main progress bar
document.getElementById('p1').addEventListener('mdl-componentupgraded', function () {
    this.MaterialProgress.setProgress(44);
});

//show advanced click
document.getElementById('advanced').addEventListener("click", function () {
    document.getElementById('logs').classList.toggle('visible');
});

//open settings button
document.getElementById('settings_button').addEventListener("click", function () {
    document.querySelector('body').classList.add('hide');
    setTimeout(function () {
        location.href = "settings.html";
    }, 300);
});

//set theme
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