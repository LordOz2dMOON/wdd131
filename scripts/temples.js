const currentYear = document.getElementById("currentyear");
currentYear.innerHTML = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
const modTime = document.lastModified;
lastModified.innerHTML = `Last Modification: ${modTime}`;

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const hamburgerIcon = menuToggle.querySelector('.hamburger');
    const closeIcon = menuToggle.querySelector('.close');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        hamburgerIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });
});