// Sample player data
const players = [
    { name: "Bukayo Saka", position: "RW", goals: 8, assists: 6, appearances: 20, initials: "BS" },
    { name: "Martin Ødegaard", position: "CAM", goals: 5, assists: 9, appearances: 18, initials: "MO" },
    { name: "Gabriel Jesus", position: "ST", goals: 12, assists: 4, appearances: 19, initials: "GJ" },
    { name: "Declan Rice", position: "CDM", goals: 3, assists: 3, appearances: 22, initials: "DR" },
    { name: "Gabriel Martinelli", position: "LW", goals: 7, assists: 5, appearances: 21, initials: "GM" },
    { name: "William Saliba", position: "CB", goals: 2, assists: 1, appearances: 23, initials: "WS" },
    { name: "Gabriel Magalhães", position: "CB", goals: 4, assists: 0, appearances: 22, initials: "GG" },
    { name: "Ben White", position: "RB", goals: 1, assists: 4, appearances: 20, initials: "BW" },
    { name: "Kai Havertz", position: "CAM", goals: 6, assists: 2, appearances: 17, initials: "KH" },
    { name: "David Raya", position: "GK", goals: 0, assists: 0, appearances: 15, initials: "RA" },
    { name: "Zinchenko", position: "LB", goals: 1, assists: 3, appearances: 16, initials: "ZT" },
    { name: "Emile Smith Rowe", position: "AM", goals: 2, assists: 1, appearances: 8, initials: "ES" }
];

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadUserPreferences();
    renderPlayerProfiles();
    setupFormationBuilder();
    setupPlayerComparison();
    setupTabNavigation();
    setupDragAndDrop();
});

// LocalStorage integration for user preferences
function loadUserPreferences() {
    const theme = localStorage.getItem('arsenalFanHub_theme') || 'light';
    const savedFormation = localStorage.getItem('arsenalFanHub_formation') || '4-3-3';
    
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-toggle').textContent = '☀️ Light';
    }
    
    setFormation(savedFormation);
}

function saveUserPreferences() {
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('arsenalFanHub_theme', theme);
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️ Light';
    } else {
        themeToggle.textContent = '🌙 Dark';
    }
    
    saveUserPreferences();
}

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}

// Tab navigation functionality
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            const tabId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Render player profiles in the squad grid
function renderPlayerProfiles() {
    const squadGrid = document.getElementById('squadGrid');
    squadGrid.innerHTML = '';
    
    players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <div class="player-header">
                <div class="player-avatar">${player.initials}</div>
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <div class="player-position">${player.position}</div>
                </div>
            </div>
            <div class="player-stats">
                <div class="stat-item">
                    <div class="stat-value">${player.goals}</div>
                    <div class="stat-label">Goals</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${player.assists}</div>
                    <div class="stat-label">Assists</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${player.appearances}</div>
                    <div class="stat-label">Apps</div>
                </div>
            </div>
        `;
        squadGrid.appendChild(playerCard);
    });
}

// Formation builder functionality
function setupFormationBuilder() {
    const formationButtons = document.querySelectorAll('.formation-btn');
    
    formationButtons.forEach(button => {
        button.addEventListener('click', function() {
            formationButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const formation = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            setFormation(formation);
            localStorage.setItem('arsenalFanHub_formation', formation);
        });
    });
}

function setFormation(formation) {
    
    // Clear all existing formation lines except goalkeeper
    const field = document.querySelector('.football-field');
    const lines = field.querySelectorAll('.formation-line:not(.goalkeeper)');
    lines.forEach(line => line.remove());
    
    // Recreate the standard lines
    const defenseLine = document.createElement('div');
    defenseLine.className = 'formation-line defense';
    defenseLine.id = 'defense-line';
    defenseLine.style.top = '30%';
    
    const midfieldLine = document.createElement('div');
    midfieldLine.className = 'formation-line midfield';
    midfieldLine.id = 'midfield-line';
    midfieldLine.style.top = '55%';
    
    const attackLine = document.createElement('div');
    attackLine.className = 'formation-line attack';
    attackLine.id = 'attack-line';
    attackLine.style.top = '80%';
    
    field.appendChild(defenseLine);
    field.appendChild(midfieldLine);
    field.appendChild(attackLine);
    
    
    // Add players based on formation
    switch(formation) {
        case '4-4-2':
            // Defense: 4 players
            addFormationPlayer(defenseLine, 'BW');
            addFormationPlayer(defenseLine, 'GG');
            addFormationPlayer(defenseLine, 'WS');
            addFormationPlayer(defenseLine, 'ZT');
            
            // Midfield: 4 players
            addFormationPlayer(midfieldLine, 'DR');
            addFormationPlayer(midfieldLine, 'MO');
            addFormationPlayer(midfieldLine, 'KH');
            addFormationPlayer(midfieldLine, 'GM');
            
            // Attack: 2 players
            addFormationPlayer(attackLine, 'BS');
            addFormationPlayer(attackLine, 'GJ');
            break;
            
        case '3-5-2':
            // Defense: 3 players
            addFormationPlayer(defenseLine, 'GG');
            addFormationPlayer(defenseLine, 'WS');
            addFormationPlayer(defenseLine, 'ZT');
            
            // Midfield: 5 players
            addFormationPlayer(midfieldLine, 'BW');
            addFormationPlayer(midfieldLine, 'DR');
            addFormationPlayer(midfieldLine, 'MO');
            addFormationPlayer(midfieldLine, 'KH');
            addFormationPlayer(midfieldLine, 'GM');
            
            // Attack: 2 players
            addFormationPlayer(attackLine, 'BS');
            addFormationPlayer(attackLine, 'GJ');
            break;
            
       case '4-2-3-1':
            // Defense: 4 players
            addFormationPlayer(defenseLine, 'BW');
            addFormationPlayer(defenseLine, 'GG');
            addFormationPlayer(defenseLine, 'WS');
            addFormationPlayer(defenseLine, 'ZT');
            
            // Midfield: 2 defensive
            addFormationPlayer(midfieldLine, 'DR');
            addFormationPlayer(midfieldLine, 'KH');
            
            // Attacking midfield: 3 players
            // We'll use the attack line for this
            addFormationPlayer(attackLine, 'BS');
            addFormationPlayer(attackLine, 'MO');
            addFormationPlayer(attackLine, 'GM');
            
            // Add striker (create a new line below attack)
            const strikerLine = document.createElement('div');
            strikerLine.className = 'formation-line attack';
            strikerLine.style.top = '90%'; // Position below the attack line
            document.querySelector('.football-field').appendChild(strikerLine);
            addFormationPlayer(strikerLine, 'GJ'); // Gabriel Jesus as striker
            break;
            
        default: // 4-3-3
            // Defense: 4 players
            addFormationPlayer(defenseLine, 'BW');
            addFormationPlayer(defenseLine, 'GG');
            addFormationPlayer(defenseLine, 'WS');
            addFormationPlayer(defenseLine, 'ZT');
            
            // Midfield: 3 players
            addFormationPlayer(midfieldLine, 'DR');
            addFormationPlayer(midfieldLine, 'MO');
            addFormationPlayer(midfieldLine, 'KH');
            
            // Attack: 3 players
            addFormationPlayer(attackLine, 'BS');
            addFormationPlayer(attackLine, 'GJ');
            addFormationPlayer(attackLine, 'GM');
    }
}

function addFormationPlayer(lineElement, initials) {
    const player = players.find(p => p.initials === initials);
    if (player) {
        const playerElement = document.createElement('div');
        playerElement.className = 'formation-player';
        playerElement.setAttribute('draggable', 'true');
        playerElement.textContent = initials;
        lineElement.appendChild(playerElement);
    }
}

// Player comparison functionality
function setupPlayerComparison() {
    const player1Select = document.getElementById('player1Select');
    const player2Select = document.getElementById('player2Select');
    
    // Populate dropdowns with player options
    players.forEach(player => {
        const option1 = document.createElement('option');
        option1.value = player.initials;
        option1.textContent = player.name;
        player1Select.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = player.initials;
        option2.textContent = player.name;
        player2Select.appendChild(option2);
    });
    
    // Add event listeners for comparison
    player1Select.addEventListener('change', updateComparison);
    player2Select.addEventListener('change', updateComparison);
}

function updateComparison() {
    const player1Select = document.getElementById('player1Select');
    const player2Select = document.getElementById('player2Select');
    const comparisonStats = document.getElementById('comparisonStats');
    
    const player1Initials = player1Select.value;
    const player2Initials = player2Select.value;
    
    if (player1Initials && player2Initials) {
        const player1 = players.find(p => p.initials === player1Initials);
        const player2 = players.find(p => p.initials === player2Initials);
        
        comparisonStats.style.display = 'grid';
        comparisonStats.innerHTML = `
            <div class="comparison-stat">
                <div class="player-stat">
                    <span class="stat-value">${player1.goals}</span>
                    <span class="stat-label">Goals</span>
                </div>
                <div class="vs-separator"></div>
                <div class="player-stat">
                    <span class="stat-value">${player2.goals}</span>
                    <span class="stat-label">Goals</span>
                </div>
            </div>
            <div class="comparison-stat">
                <div class="player-stat">
                    <span class="stat-value">${player1.assists}</span>
                    <span class="stat-label">Assists</span>
                </div>
                <div class="vs-separator"></div>
                <div class="player-stat">
                    <span class="stat-value">${player2.assists}</span>
                    <span class="stat-label">Assists</span>
                </div>
            </div>
            <div class="comparison-stat">
                <div class="player-stat">
                    <span class="stat-value">${player1.appearances}</span>
                    <span class="stat-label">Apps</span>
                </div>
                <div class="vs-separator"></div>
                <div class="player-stat">
                    <span class="stat-value">${player2.appearances}</span>
                    <span class="stat-label">Apps</span>
                </div>
            </div>
        `;
    } else {
        comparisonStats.style.display = 'none';
    }
}

// Drag and drop functionality
function setupDragAndDrop() {
    const players = document.querySelectorAll('.formation-player, .bench-player');
    
    players.forEach(player => {
        player.addEventListener('dragstart', dragStart);
        player.addEventListener('dragend', dragEnd);
    });
    
    const dropZones = document.querySelectorAll('.formation-line, .player-bench');
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('dragenter', dragEnter);
        zone.addEventListener('dragleave', dragLeave);
        zone.addEventListener('drop', drop);
    });
}

let draggedPlayer = null;

function dragStart() {
    draggedPlayer = this;
    setTimeout(() => this.style.opacity = '0.4', 0);
}

function dragEnd() {
    this.style.opacity = '1';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.style.backgroundColor = 'rgba(220, 20, 60, 0.1)';
}

function dragLeave() {
    this.style.backgroundColor = '';
}

function drop() {
    this.style.backgroundColor = '';
    if (draggedPlayer.parentNode !== this) {
        this.appendChild(draggedPlayer);
    }
}