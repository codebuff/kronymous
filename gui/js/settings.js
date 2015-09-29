//go back to home page button
document.getElementById('back_button').addEventListener("click", function () {
    location.href = "index.html";
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
//call update settings view
updateSettingsValues();
//update settings view
function updateSettingsValues() {
    //loads saved values and reflects in the UI
    //theme switch
    chrome.storage.local.get('theme', function (value) {
        if (value.theme == 'dark') {
            //to simulate true
            document.getElementById('dt').click();
        }
    });
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
//proxy dropdown select
var lasttarget_proxy;
document.getElementById('select_proxy').addEventListener("click", function (e) {
    if (lasttarget_proxy) {
        lasttarget_proxy.classList.remove("selected");
    }
    //change the target element now
    lasttarget_proxy = e.target;
    lasttarget_proxy.classList.add("selected");
    //set text of drop down
    document.getElementById('proxy_text').innerHTML = e.target.getAttribute("data-text");
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
//bridge dropdown select
var lasttarget_bridge;
document.getElementById('select_bridge').addEventListener("click", function (e) {
    if (lasttarget_bridge) {
        lasttarget_bridge.classList.remove("selected");
    }
    //change the target element now
    lasttarget_bridge = e.target;
    lasttarget_bridge.classList.add("selected");
    //set text of drop down
    document.getElementById('bridges_text').innerHTML = e.target.getAttribute("data-text");
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
        chrome.storage.local.set({ 'theme': 'dark' });
    }
    else {
        document.body.classList.remove('dark');
        chrome.storage.local.set({ 'theme': 'light' });
    }
});