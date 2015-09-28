//go back to home page button
document.getElementById('back_button').addEventListener("click", function () {
    window.location.assign("index.html");
});
//set theme
if (localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark');
}
//on load effect
document.body.classList.add('closed');
setTimeout(function () {
    document.body.classList.add('open');
}, 10);
//call update settings view
updateSettingsValues();
//update settings view
function updateSettingsValues() {
    //loads saved values and reflects in the UI
    //theme switch
    if (localStorage.getItem('theme') == 'dark') {
        document.getElementById('dt').checked = true;
    }
}
//proxy state change event
document.getElementById('proxy').addEventListener("click", function () {
    var chk = this.checked;
    if (chk) {
        document.getElementById('proxy_card').classList.add('expand');
        document.getElementById('proxy_card').classList.add('proxycard');
    }
    else {
        document.getElementById('proxy_card').classList.remove('expand');
        document.getElementById('proxy_card').classList.remove('proxycard');
    }
});
//bridges state change event
document.getElementById('bridges').addEventListener("click", function () {
    var chk = this.checked;
    if (chk) {
        document.getElementById('bridges_card').classList.add('expand');
        document.getElementById('bridges_card').classList.add('bridgescard');
    }
    else {
        document.getElementById('bridges_card').classList.remove('expand');
        document.getElementById('bridges_card').classList.remove('bridgescard');
    }
});
//radio button group events
document.getElementById('bridges-custom__radio').addEventListener("click", function () {
    if (this.checked) {
        document.getElementById('bridges-custom__text').disabled = false;
        document.getElementById('bridges-inner__dropdown').disabled = true;
    }
});
document.getElementById('bridges-transport__radio').addEventListener("click", function () {
    if (this.checked) {
        document.getElementById('bridges-custom__text').disabled = true;
        document.getElementById('bridges-inner__dropdown').disabled = false;
    }
});
//theme switch
document.getElementById('dt').addEventListener("click", function () {
    if (this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});