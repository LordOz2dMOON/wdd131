const menuButton = document.getElementById('menu-button');
const navigation = document.querySelector('nav');

function toggleMenu() {
    navigation.classList.toggle('open');

    // Check if menu is now open and update button text accordingly
    if (navigation.classList.contains('open')) {
        menuButton.textContent = '✕'; // Use textContent and a different X symbol
    } else {
        menuButton.textContent = '☰'; // Use textContent for hamburger
    }
}

menuButton.addEventListener('click', toggleMenu);

const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last modified: ${lastModified}`;