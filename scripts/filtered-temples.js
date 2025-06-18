// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Additional temple objects (add 3 more as instructed)
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/1-Rome-Temple-2160936.jpg"
    },
    {
        templeName: "Provo City Center",
        location: "Provo, Utah, United States",
        dedicated: "2016, March, 20",
        area: 85084,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/400x250/provo-city-center-temple-1572517-wallpaper.jpg"
    }
];

// DOM elements
const menuButton = document.getElementById('menu-button');
const navigation = document.querySelector('nav');
const templeContainer = document.getElementById('temple-container');
const pageTitle = document.getElementById('page-title');
const navLinks = document.querySelectorAll('nav a');

// Mobile menu toggle function
function toggleMenu() {
    navigation.classList.toggle('open');

    // Check if menu is now open and update button text accordingly
    if (navigation.classList.contains('open')) {
        menuButton.textContent = '✕';
    } else {
        menuButton.textContent = '☰';
    }
}

// Function to create temple card HTML
function createTempleCard(temple) {
    return `
        <div class="temple-card">
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
            <div class="temple-info">
                <h3 class="temple-name">${temple.templeName}</h3>
                <p class="temple-location">Location: ${temple.location}</p>
                <p class="temple-dedicated">Dedicated: ${temple.dedicated}</p>
                <p class="temple-area">Area: ${temple.area.toLocaleString()} square feet</p>
            </div>
        </div>
    `;
}

// Function to display temples
function displayTemples(templeList) {
    templeContainer.innerHTML = templeList.map(createTempleCard).join('');
}

// Function to filter temples
function filterTemples(filter) {
    let filteredTemples = [];

    switch (filter) {
        case 'old':
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year < 1900;
            });
            pageTitle.textContent = 'Old';
            break;
        case 'new':
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year > 2000;
            });
            pageTitle.textContent = 'New';
            break;
        case 'large':
            filteredTemples = temples.filter(temple => temple.area > 90000);
            pageTitle.textContent = 'Large';
            break;
        case 'small':
            filteredTemples = temples.filter(temple => temple.area < 10000);
            pageTitle.textContent = 'Small';
            break;
        default:
            filteredTemples = temples;
            pageTitle.textContent = 'Home';
    }

    displayTemples(filteredTemples);
}

// Event listeners
menuButton.addEventListener('click', toggleMenu);

// Navigation event listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Filter temples based on data-filter attribute
        const filter = link.getAttribute('data-filter');
        filterTemples(filter);
        
        // Close mobile menu if open
        if (navigation.classList.contains('open')) {
            toggleMenu();
        }
    });
});

// Set current year and last modified date
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last modified: ${lastModified}`;

// Initialize page with all temples
displayTemples(temples);