const d = new Date();
a = d.getFullYear();

const firstP = document.getElementById('currentyear');
firstP.textContent = a;

const lastModified = document.lastModified;

const change = document.getElementById('lastModified');

change.textContent = `Last Modification: ${lastModified}`;