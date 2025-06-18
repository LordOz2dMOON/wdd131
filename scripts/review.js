 // Product array (same as in form.html)
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

        function updateReviewCounter() {
            // Get current count from localStorage
            let reviewCount = localStorage.getItem('reviewCount');
            
            // If no count exists, start at 0
            if (!reviewCount) {
                reviewCount = 0;
            } else {
                reviewCount = parseInt(reviewCount);
            }
            
            // Increment the count
            reviewCount++;
            
            // Store the updated count
            localStorage.setItem('reviewCount', reviewCount);
            
            // Display the count
            document.getElementById('reviewCount').textContent = reviewCount;
        }

        function displayReviewDetails() {
            // Get URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const reviewDetailsDiv = document.getElementById('reviewDetails');
            
            // Get form data from URL parameters
            const productId = urlParams.get('productName');
            const rating = urlParams.get('rating');
            const installDate = urlParams.get('installDate');
            const features = urlParams.getAll('features');
            const writtenReview = urlParams.get('writtenReview');
            const userName = urlParams.get('userName');
            
            // Find product name from ID
            const product = products.find(p => p.id === productId);
            const productName = product ? product.name : 'Unknown Product';
            
            // Build review details HTML
            let detailsHTML = '';
            
            if (productName) {
                detailsHTML += `<div class="detail-item"><strong>Product:</strong> ${productName}</div>`;
            }
            
            if (rating) {
                const stars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5 - parseInt(rating));
                detailsHTML += `<div class="detail-item"><strong>Rating:</strong> ${stars} (${rating}/5)</div>`;
            }
            
            if (installDate) {
                const date = new Date(installDate);
                const formattedDate = date.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                detailsHTML += `<div class="detail-item"><strong>Installation Date:</strong> ${formattedDate}</div>`;
            }
            
            if (features && features.length > 0) {
                detailsHTML += `<div class="detail-item"><strong>Useful Features:</strong> ${features.join(', ')}</div>`;
            }
            
            if (writtenReview && writtenReview.trim()) {
                detailsHTML += `<div class="detail-item"><strong>Written Review:</strong><br><em>"${writtenReview}"</em></div>`;
            }
            
            if (userName && userName.trim()) {
                detailsHTML += `<div class="detail-item"><strong>Reviewer:</strong> ${userName}</div>`;
            }
            
            reviewDetailsDiv.innerHTML = detailsHTML;
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            updateReviewCounter();
            displayReviewDetails();
        });