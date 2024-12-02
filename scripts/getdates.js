const currentYear = document.getElementById("currentyear");
currentYear.innerHTML = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
const modTime = document.lastModified;
lastModified.innerHTML = `Last Modification: ${modTime}`;