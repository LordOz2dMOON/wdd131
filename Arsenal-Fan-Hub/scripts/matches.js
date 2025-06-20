// Match Center JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme and mobile menu
    loadTheme();
    setupMobileMenu();
    
    // Initialize all match center functionality
    setupTabs();
    setupMatchPredictions();
    setupTicketChecker();
    setupLiveScoreSimulator();
    setupMatchReminders();
    setupVirtualTours();
});

// Theme Management
function loadTheme() {
    const savedTheme = localStorage.getItem('arsenalFanHub_theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-toggle').textContent = '☀️ Light';
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙 Dark';
        localStorage.setItem('arsenalFanHub_theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️ Light';
        localStorage.setItem('arsenalFanHub_theme', 'dark');
    }
}

// Mobile Menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.getElementById('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
}

// Tab Navigation
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('onclick').replace("showTab('", "").replace("')", "");
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Match Predictions
function setupMatchPredictions() {
    // Load saved predictions from localStorage
    const savedPredictions = JSON.parse(localStorage.getItem('matchPredictions')) || {};
    
    // Setup prediction modal
    window.showPredictionModal = function(matchTitle, matchDate) {
        const modal = document.getElementById('prediction-modal');
        const title = document.getElementById('prediction-title');
        
        title.textContent = `Predict ${matchTitle} (${matchDate})`;
        modal.style.display = 'block';
        
        // Set saved prediction if exists
        const predictionKey = `${matchTitle}-${matchDate}`;
        if (savedPredictions[predictionKey]) {
            document.getElementById('home-score').value = savedPredictions[predictionKey].home;
            document.getElementById('away-score').value = savedPredictions[predictionKey].away;
        }
    };
    
    window.closePredictionModal = function() {
        document.getElementById('prediction-modal').style.display = 'none';
    };
    
    window.submitPrediction = function() {
        const homeScore = document.getElementById('home-score').value;
        const awayScore = document.getElementById('away-score').value;
        const title = document.getElementById('prediction-title').textContent;
        
        // Extract match info from title
        const matchInfo = title.replace('Predict ', '').split(' (');
        const matchTitle = matchInfo[0];
        const matchDate = matchInfo[1].replace(')', '');
        
        // Save prediction
        const predictionKey = `${matchTitle}-${matchDate}`;
        savedPredictions[predictionKey] = {
            home: homeScore,
            away: awayScore,
            date: new Date().toISOString()
        };
        
        localStorage.setItem('matchPredictions', JSON.stringify(savedPredictions));
        
        // Show confirmation
        alert(`Prediction saved: ${matchTitle} ${homeScore}-${awayScore}`);
        closePredictionModal();
    };
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('prediction-modal');
        if (event.target === modal) {
            closePredictionModal();
        }
    });
}

// Ticket Checker
function setupTicketChecker() {
    const ticketResults = {
        'arsenal-mancity': {
            category1: { available: 2, price: 120, section: 'North Bank Lower', row: 'M', seats: '15-16' },
            category2: { available: 4, price: 85, section: 'Clock End Upper', row: 'D', seats: '32-35' },
            category3: { available: 0, price: 45, section: 'Family Stand', row: '', seats: '' },
            family: { available: 3, price: 60, section: 'Family Stand', row: 'B', seats: '5-7' }
        },
        'brighton-arsenal': {
            category1: { available: 10, price: 80, section: 'Away Section', row: 'C', seats: '10-19' },
            category2: { available: 15, price: 60, section: 'Away Section', row: 'D', seats: '20-34' },
            category3: { available: 20, price: 40, section: 'Away Section', row: 'E', seats: '35-54' },
            family: { available: 0, price: 0, section: '', row: '', seats: '' }
        }
    };
    
    window.checkTicketAvailability = function() {
        const matchSelect = document.getElementById('match-select');
        const ticketType = document.getElementById('ticket-type');
        const quantity = document.getElementById('ticket-quantity');
        const resultDiv = document.getElementById('ticket-result');
        
        const match = matchSelect.value;
        const category = ticketType.value;
        const qty = parseInt(quantity.value);
        
        const availability = ticketResults[match][category];
        
        if (availability.available >= qty && qty > 0) {
            resultDiv.innerHTML = `
                <h3>✅ Tickets Available!</h3>
                <div style="margin: 1rem 0;">
                    <strong>${ticketType.options[ticketType.selectedIndex].text} - ${qty} Available</strong><br>
                    Price: £${availability.price} per ticket<br>
                    Section: ${availability.section}<br>
                    Row: ${availability.row}, Seats: ${availability.seats}
                </div>
                <button style="background: white; color: var(--arsenal-red); border: none; padding: 0.8rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 1rem;">Reserve Now</button>
            `;
        } else {
            resultDiv.innerHTML = `
                <h3>❌ No Tickets Available</h3>
                <div style="margin: 1rem 0;">
                    Sorry, no ${ticketType.options[ticketType.selectedIndex].text} tickets available for ${matchSelect.options[matchSelect.selectedIndex].text}.
                </div>
                <button style="background: var(--arsenal-gold); color: var(--arsenal-navy); border: none; padding: 0.8rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 1rem;">Join Waiting List</button>
            `;
        }
        
        resultDiv.style.display = 'block';
    };
}

// Live Score Simulator
function setupLiveScoreSimulator() {
    const matches = [
        { home: 'Arsenal', away: 'Man City', score: '2 - 1', events: [
            { minute: 23, type: 'goal', player: 'Gabriel Jesus', team: 'home', description: 'Jesus opens the scoring with a powerful header from Rice\'s corner kick!' },
            { minute: 45, type: 'yellow', player: 'Declan Rice', team: 'home', description: 'Rice picks up a booking for a late challenge on De Bruyne.' },
            { minute: 65, type: 'goal', player: 'Erling Haaland', team: 'away', description: 'Clinical finish from the penalty spot. City level the score.' },
            { minute: 78, type: 'goal', player: 'Bukayo Saka', team: 'home', description: 'Beautiful finish from Saka after a clever pass from Ødegaard. Arsenal take the lead!' }
        ]},
        { home: 'Brighton', away: 'Arsenal', score: '0 - 0', events: [] },
        { home: 'Arsenal', away: 'Liverpool', score: '0 - 0', events: [] }
    ];
    
    // Simulate live match updates
    if (document.getElementById('live')) {
        const liveScore = document.getElementById('live-score');
        const matchEvents = document.getElementById('match-events');
        
        // Clear existing events
        matchEvents.innerHTML = '';
        
        // Display first match as live
        const liveMatch = matches[0];
        liveScore.textContent = liveMatch.score;
        
        // Display match events
        liveMatch.events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.style.padding = '1rem';
            eventDiv.style.borderLeft = `4px solid ${event.team === 'home' ? 'var(--arsenal-red)' : '#6CABDD'}`;
            eventDiv.style.marginBottom = '1rem';
            eventDiv.style.background = 'rgba(220, 20, 60, 0.05)';
            
            let eventType = '';
            let eventColor = '';
            
            if (event.type === 'goal') {
                eventType = '⚽ GOAL!';
                eventColor = event.team === 'home' ? 'var(--arsenal-red)' : '#6CABDD';
            } else if (event.type === 'yellow') {
                eventType = '🟨 YELLOW CARD!';
                eventColor = 'var(--warning)';
            }
            
            eventDiv.innerHTML = `
                <div style="font-weight: bold; color: ${eventColor};">${eventType} ${event.minute}' - ${event.player}</div>
                <div style="color: var(--text-light); font-size: 0.9rem; margin-top: 0.5rem;">${event.description}</div>
            `;
            
            matchEvents.prepend(eventDiv);
        });
        
        // Simulate live updates (for demo purposes)
        setInterval(() => {
            // This would be replaced with real data in a production app
            const randomUpdate = Math.random();
            if (randomUpdate > 0.7) {
                const newEvent = {
                    minute: Math.floor(Math.random() * 10) + 80,
                    type: 'goal',
                    player: ['Bukayo Saka', 'Gabriel Martinelli', 'Martin Ødegaard'][Math.floor(Math.random() * 3)],
                    team: 'home',
                    description: 'Last minute goal! Arsenal extend their lead!'
                };
                
                const eventDiv = document.createElement('div');
                eventDiv.style.padding = '1rem';
                eventDiv.style.borderLeft = '4px solid var(--arsenal-red)';
                eventDiv.style.marginBottom = '1rem';
                eventDiv.style.background = 'rgba(220, 20, 60, 0.05)';
                eventDiv.style.animation = 'fadeIn 0.5s ease';
                
                eventDiv.innerHTML = `
                    <div style="font-weight: bold; color: var(--arsenal-red);">⚽ GOAL! ${newEvent.minute}' - ${newEvent.player}</div>
                    <div style="color: var(--text-light); font-size: 0.9rem; margin-top: 0.5rem;">${newEvent.description}</div>
                `;
                
                matchEvents.prepend(eventDiv);
                
                // Update score
                const scoreParts = liveScore.textContent.split(' - ');
                const homeScore = parseInt(scoreParts[0]) + 1;
                const awayScore = parseInt(scoreParts[1]);
                liveScore.textContent = `${homeScore} - ${awayScore}`;
            }
        }, 10000);
    }
}

// Match Reminders
function setupMatchReminders() {
    const remindersList = document.getElementById('reminders-list');
    const savedReminders = JSON.parse(localStorage.getItem('matchReminders')) || [];
    
    // Display saved reminders
    function displayReminders() {
        remindersList.innerHTML = '';
        savedReminders.forEach((reminder, index) => {
            const reminderDiv = document.createElement('div');
            reminderDiv.style.margin = '1rem 0';
            reminderDiv.style.padding = '1rem';
            reminderDiv.style.background = 'rgba(220, 20, 60, 0.1)';
            reminderDiv.style.borderRadius = '8px';
            
            reminderDiv.innerHTML = `
                <strong>${reminder.match}</strong> - ${reminder.date}
                <button style="float: right; background: var(--arsenal-red); color: white; border: none; padding: 0.3rem 0.8rem; border-radius: 4px; cursor: pointer;" onclick="removeReminder(${index})">Remove</button>
            `;
            
            remindersList.appendChild(reminderDiv);
        });
    }
    
    // Add sample reminder if none exist
    if (savedReminders.length === 0) {
        savedReminders.push({
            match: 'Arsenal vs Man City',
            date: 'June 21, 2025 at 3:00 PM',
            notified: false
        });
        localStorage.setItem('matchReminders', JSON.stringify(savedReminders));
    }
    
    displayReminders();
    
    // Global function to remove reminders
    window.removeReminder = function(index) {
        savedReminders.splice(index, 1);
        localStorage.setItem('matchReminders', JSON.stringify(savedReminders));
        displayReminders();
    };
}

// Virtual Tours
function setupVirtualTours() {
    window.startVirtualTour = function(stadium) {
        let tourContent = '';
        switch(stadium) {
            case 'emirates':
                tourContent = 'Starting Emirates Stadium virtual tour...';
                break;
            case 'wembley':
                tourContent = 'Starting Wembley Stadium virtual tour...';
                break;
            case 'training':
                tourContent = 'Starting London Colney training ground tour...';
                break;
            default:
                tourContent = 'Virtual tour not available for this location';
        }
        
        alert(tourContent);
    };
}