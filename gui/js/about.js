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