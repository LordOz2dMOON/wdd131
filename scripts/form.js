// Set current year and last modified date
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last modified: ${lastModified}`;

// Product array
        const products = [
            {
                id: "fc-1888",
                name: "flux capacitor",
                averagerating: 4.5
            },
            {
                id: "fc-2050",
                name: "power laces",
                averagerating: 4.7
            },
            {
                id: "fs-1987",
                name: "time circuits",
                averagerating: 3.5
            },
            {
                id: "ac-2000",
                name: "low voltage reactor",
                averagerating: 3.9
            },
            {
                id: "jj-1969",
                name: "warp equalizer",
                averagerating: 5.0
            }
        ];

        // Populate product select options
        function populateProducts() {
            const select = document.getElementById('productName');
            
            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = product.name;
                select.appendChild(option);
            });
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            populateProducts();
        });