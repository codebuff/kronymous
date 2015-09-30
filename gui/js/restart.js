//simulate page refresh
setTimeout(function () {
    document.querySelector('body').classList.add('hide');
}, 1200);
setTimeout(function () {
    location.href = "index.html";
}, 1500);