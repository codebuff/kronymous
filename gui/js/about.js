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