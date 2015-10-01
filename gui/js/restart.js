//get theme
chrome.storage.local.get('theme', function (values) {
    if (values.theme == 'dark') {
        document.body.classList.add('dark');
    }
});
//simulate page refresh
setTimeout(function () {
    document.querySelector('body').classList.add('hide');
}, 1200);
setTimeout(function () {
    location.href = "index.html";
}, 1500);