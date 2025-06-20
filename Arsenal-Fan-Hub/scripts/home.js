 // User preferences and data storage
        let userPreferences = {
            theme: 'light',
            favoritePlayer: null,
            pollVotes: {},
            newsPreferences: []
        };

        // Load user preferences
        function loadUserPreferences() {
            const saved = localStorage.getItem('arsenalFanHubPrefs');
            if (saved) {
                userPreferences = {...userPreferences, ...JSON.parse(saved)};
            }
            
            // Apply saved theme
            if (userPreferences.theme === 'dark') {
                document.body.classList.add('dark-theme');
                document.querySelector('.theme-toggle').textContent = '☀️ Light';
            }
        }

        // Save user preferences
        function saveUserPreferences() {
            localStorage.setItem('arsenalFanHubPrefs', JSON.stringify(userPreferences));
        }

        // Theme toggle functionality
        function toggleTheme() {
            const body = document.body;
            const themeBtn = document.querySelector('.theme-toggle');
            
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                themeBtn.textContent = '🌙 Dark';
                userPreferences.theme = 'light';
            } else {
                body.classList.add('dark-theme');
                themeBtn.textContent = '☀️ Light';
                userPreferences.theme = 'dark';
            }
            saveUserPreferences();
        }

        // Mobile menu toggle
        function toggleMobileMenu() {
            const nav = document.getElementById('nav');
            nav.classList.toggle('active');
        }

        // Countdown timer functionality
        function updateCountdown() {
            const matchDate = new Date();
            matchDate.setDate(matchDate.getDate() + 3); // Next match in 3 days
            matchDate.setHours(15, 0, 0, 0); // 3 PM kickoff
            
            const now = new Date().getTime();
            const distance = matchDate.getTime() - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                document.getElementById('days').textContent = days;
                document.getElementById('hours').textContent = hours;
                document.getElementById('minutes').textContent = minutes;
                document.getElementById('seconds').textContent = seconds;
            } else {
                document.getElementById('countdown').innerHTML = '<div class="countdown-item"><span class="countdown-number">MATCH</span><span class="countdown-label">LIVE</span></div>';
            }
        }

        // Search functionality
        function searchContent() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const newsItems = document.querySelectorAll('.news-item');
            
            newsItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm) || searchTerm === '') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Poll functionality
        function vote(option) {
            const radios = document.querySelectorAll('input[name="poll"]');
            radios.forEach(radio => {
                if (radio.value === option) {
                    radio.checked = true;
                }
            });
            userPreferences.pollVotes.currentPoll = option;
            saveUserPreferences();
        }

        function showPollResults() {
            const results = document.getElementById('pollResults');
            results.style.display = 'block';
            
            // Animate the bars
            setTimeout(() => {
                const bars = results.querySelectorAll('.result-bar');
                bars.forEach(bar => {
                    bar.style.width = bar.style.width;
                });
            }, 100);
        }

        // Load more news functionality
        function loadMoreNews() {
            const newsContainer = document.getElementById('newsContainer');
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading';
            loadingDiv.innerHTML = '<div class="spinner"></div><p>Loading more news...</p>';
            newsContainer.appendChild(loadingDiv);
            
            // Simulate loading delay
            setTimeout(() => {
                loadingDiv.remove();
                
                const moreNews = [
                    {
                        time: '2 days ago',
                        title: 'Arsenal Academy Graduates Shine in Premier League',
                        content: 'The success of Arsenal\'s academy continues to bear fruit as several graduates make their mark in the Premier League...'
                    },
                    {
                        time: '3 days ago',
                        title: 'Transfer Roundup: Arsenal Eye Summer Reinforcements',
                        content: 'With the transfer window approaching, Arsenal are reportedly tracking several key targets to strengthen their squad...'
                    }
                ];
                
                moreNews.forEach(news => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';
                    newsItem.innerHTML = `
                        <div class="news-meta">${news.time}</div>
                        <h3>${news.title}</h3>
                        <p>${news.content}</p>
                    `;
                    newsContainer.appendChild(newsItem);
                });
            }, 1500);
        }

        // Page navigation functions (placeholder for multi-page functionality)
        function showSquadPage() {
            alert('Squad & Statistics page - Feature coming soon!');
        }

        function showMatchCenter() {
            alert('Match Center page - Feature coming soon!');
        }

        function showContact() {
            alert('Contact page - Feature coming soon!');
        }

        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            loadUserPreferences();
            updateCountdown();
            
            // Update countdown every second
            setInterval(updateCountdown, 1000);
            
            // Simulate dynamic news loading
            setTimeout(() => {
                const newsItems = document.querySelectorAll('.news-item');
                newsItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`;
                });
            }, 500);
        });

        // Handle responsive navigation
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                document.getElementById('nav').classList.remove('active');
            }
        });