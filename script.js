// DOM elements
const journalForm = document.getElementById('journalForm');
const entryList = document.getElementById('entryList');
const totalEntriesEl = document.getElementById('totalEntries');
const avgSentimentEl = document.getElementById('avgSentiment');
const currentStreakEl = document.getElementById('currentStreak');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const premiumModal = document.getElementById('premiumModal');

// User state
let isPremiumUser = false;
let selectedPlan = 'yearly';
let selectedPaymentMethod = '';

// Chart initialization
const ctx = document.getElementById('moodChart').getContext('2d');
const moodChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Sentiment Score',
            data: [],
            borderColor: '#4361ee',
            backgroundColor: 'rgba(67, 97, 238, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Sentiment: ${context.parsed.y}%`;
                    }
                }
            }
        }
    }
});

// Sample data for demonstration
let journalEntries = [];

// Show notification function
function showNotification(message, isSuccess = true) {
    notificationText.textContent = message;
    notification.className = 'notification show ' + (isSuccess ? 'success' : 'error');
    notification.querySelector('i').className = isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Premium modal functions
function openPremiumModal() {
    premiumModal.classList.add('show');
    // Reset payment method selection
    selectPaymentMethod('');
}

function closePremiumModal() {
    premiumModal.classList.remove('show');
}

function selectPlan(plan) {
    selectedPlan = plan;
    document.querySelectorAll('.pricing-plan').forEach(el => {
        el.classList.remove('selected');
    });
    document.querySelectorAll('.pricing-plan')[plan === 'monthly' ? 0 : 1].classList.add('selected');
}

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    // Update UI
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });
    
    if (method) {
        document.querySelectorAll('.payment-method').forEach(el => {
            if (el.textContent.includes(method.charAt(0).toUpperCase() + method.slice(1))) {
                el.classList.add('selected');
            }
        });
    }
    
    // Show appropriate payment section
    document.querySelectorAll('.payment-section').forEach(el => {
        el.classList.remove('active');
    });
    
    if (method === 'mpesa') {
        document.getElementById('mpesaSection').classList.add('active');
    } else if (method === 'paypal') {
        document.getElementById('paypalSection').classList.add('active');
    } else if (method === 'visa' || method === 'mastercard') {
        document.getElementById('cardSection').classList.add('active');
    } else if (method) {
        document.getElementById('otherSection').classList.add('active');
        document.getElementById('otherMethodTitle').textContent = `${method.charAt(0).toUpperCase() + method.slice(1)} Payment`;
    }
}

// Simulate IntaSend payment processing
function processPayment(method = selectedPaymentMethod) {
    if (!method) {
        showNotification('Please select a payment method', false);
        return;
    }
    
    // Validate form inputs for card payments
    if (method === 'card' || method === 'visa' || method === 'mastercard') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardName = document.getElementById('cardName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!cardNumber || !cardName || !expiryDate || !cvv) {
            showNotification('Please fill all payment details', false);
            return;
        }
    }
    
    // Validate M-Pesa number
    if (method === 'mpesa') {
        const mpesaNumber = document.getElementById('mpesaNumber').value;
        if (!mpesaNumber || mpesaNumber.length < 9) {
            showNotification('Please enter a valid M-Pesa number', false);
            return;
        }
    }
    
    // Simulate payment processing
    showNotification(`Processing payment with ${method} via IntaSend...`);
    
    setTimeout(() => {
        // Simulate successful payment
        isPremiumUser = true;
        closePremiumModal();
        showNotification('Payment successful! Premium features unlocked.');
        
        // Update UI to reflect premium status
        document.querySelector('.premium-badge').innerHTML = '<i class="fas fa-crown"></i> <span>Premium Member</span>';
        
        // Add some premium features to the UI
        addPremiumFeatures();
    }, 2000);
}

function addPremiumFeatures() {
    // Add export button
    const chartContainer = document.querySelector('.chart-container');
    if (!document.getElementById('exportBtn')) {
        const exportBtn = document.createElement('button');
        exportBtn.id = 'exportBtn';
        exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Data';
        exportBtn.style.marginTop = '15px';
        exportBtn.onclick = exportData;
        chartContainer.appendChild(exportBtn);
    }
    
    // Add advanced stats
    const statsContainer = document.querySelector('.stats');
    if (!document.getElementById('premiumStat')) {
        const premiumStat = document.createElement('div');
        premiumStat.id = 'premiumStat';
        premiumStat.className = 'stat-item';
        premiumStat.innerHTML = `
            <div class="stat-value">+27%</div>
            <div class="stat-label">Wellness Score</div>
        `;
        statsContainer.appendChild(premiumStat);
    }
}

function exportData() {
    showNotification('Preparing your data export...');
    
    // Simulate export process
    setTimeout(() => {
        showNotification('Data exported successfully!');
    }, 1500);
}

// Call backend for sentiment analysis
async function analyzeSentiment(text) {
    const response = await fetch('http://localhost:5000/submit_entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    });
    
    if (!response.ok) {
        throw new Error('Failed to analyze sentiment');
    }
    
    const data = await response.json();
    return {
        sentiment: mapSentiment(data.sentiment),
        score: Math.round(data.score * 100)
    };
}

// Map Hugging Face sentiment labels to our labels
function mapSentiment(label) {
    if (label.includes('POSITIVE') || label === 'LABEL_2') return 'positive';
    if (label.includes('NEGATIVE') || label === 'LABEL_0') return 'negative';
    return 'neutral';
}

// Add new journal entry
journalForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const textarea = this.querySelector('textarea');
    const entryText = textarea.value.trim();
    
    if (!entryText) {
        showNotification("Please write something before saving", false);
        return;
    }
    
    // Check if user has reached free limit
    if (!isPremiumUser && journalEntries.length >= 5) {
        showNotification("You've reached the free limit. Upgrade to premium for unlimited entries.", false);
        openPremiumModal();
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call to analyze sentiment
        const analysis = await analyzeSentiment(entryText);
        
        // Create new entry object
        const newEntry = {
            id: Date.now(),
            text: entryText,
            date: new Date().toISOString(),
            sentiment: analysis.sentiment,
            score: analysis.score
        };
        
        // Add to entries array
        journalEntries.unshift(newEntry);
        
        // Update UI
        renderEntries();
        updateChart();
        updateStats();
        
        // Show success notification
        showNotification(`Entry saved! Your mood is ${analysis.sentiment} (${analysis.score}%)`);
        
        // Check for streak achievement
        checkForStreak();
        
        // Reset form
        textarea.value = '';
    } catch (error) {
        showNotification(error.message, false);
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Render journal entries
function renderEntries() {
    if (journalEntries.length === 0) {
        entryList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>No journal entries yet</p>
                <p>Write your first entry to see it here</p>
            </div>
        `;
        return;
    }
    
    entryList.innerHTML = journalEntries.map(entry => {
        const date = new Date(entry.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        let emoji = '😐';
        if (entry.sentiment === 'positive') emoji = '😊';
        else if (entry.sentiment === 'negative') emoji = '😔';
        
        return `
            <div class="entry-item">
                <div class="entry-content">
                    <div class="entry-date">${date}</div>
                    <div class="entry-text">${entry.text}</div>
                </div>
                <div class="sentiment-display">
                    <span class="mood-emoji">${emoji}</span>
                    <span class="sentiment-score ${entry.sentiment}">${entry.score}%</span>
                </div>
                <div class="actions">
                    <button class="action-btn" onclick="deleteEntry(${entry.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Show upgrade prompt for free users
    if (!isPremiumUser && journalEntries.length >= 3) {
        const upgradePrompt = document.createElement('div');
        upgradePrompt.className = 'streak-notification';
        upgradePrompt.innerHTML = `
            <p>You've made ${journalEntries.length} entries! <a href="#" onclick="openPremiumModal(); return false;">Upgrade to Premium</a> for unlimited entries and advanced features.</p>
        `;
        entryList.appendChild(upgradePrompt);
    }
}

// Update chart with entries data
function updateChart() {
    const lastSevenEntries = journalEntries.slice(0, 7).reverse();
    
    moodChart.data.labels = lastSevenEntries.map(entry => {
        return new Date(entry.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    });
    
    moodChart.data.datasets[0].data = lastSevenEntries.map(entry => entry.score);
    moodChart.update();
}

// Update statistics
function updateStats() {
    totalEntriesEl.textContent = journalEntries.length;
    
    if (journalEntries.length > 0) {
        const avgScore = journalEntries.reduce((sum, entry) => sum + entry.score, 0) / journalEntries.length;
        avgSentimentEl.textContent = `${Math.round(avgScore)}%`;
        
        // Simple streak calculation (for demo purposes)
        const streak = calculateStreak();
        currentStreakEl.textContent = streak;
    } else {
        avgSentimentEl.textContent = '0%';
        currentStreakEl.textContent = '0';
    }
}

// Calculate writing streak
function calculateStreak() {
    if (journalEntries.length < 2) return journalEntries.length;
    
    // Sort entries by date
    const sortedEntries = [...journalEntries].sort((a, b) => 
        new Date(a.date) - new Date(b.date));
    
    let streak = 1;
    let currentDate = new Date(sortedEntries[sortedEntries.length - 1].date);
    
    for (let i = sortedEntries.length - 2; i >= 0; i--) {
        const entryDate = new Date(sortedEntries[i].date);
        const diffTime = Math.abs(currentDate - entryDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            streak++;
            currentDate = entryDate;
        } else if (diffDays > 1) {
            break;
        }
    }
    
    return streak;
}

// Check for streak achievement
function checkForStreak() {
    const streak = calculateStreak();
    
    if (streak === 3) {
        showNotification("🔥 You're on a 3-day streak! Keep it up!");
    } else if (streak === 7) {
        showNotification("🎉 Amazing! You've maintained a 7-day streak!");
    } else if (streak === 30) {
        showNotification("🏆 Legendary! 30 days of journaling!");
    }
}

// Delete entry function
function deleteEntry(id) {
    if (confirm("Are you sure you want to delete this entry?")) {
        journalEntries = journalEntries.filter(entry => entry.id !== id);
        renderEntries();
        updateChart();
        updateStats();
        showNotification("Entry deleted successfully");
    }
}

// Add some sample entries for demo
async function addSampleEntries() {
    const sampleEntries = [
        "Had a great day today! Met with old friends and we had so much fun reminiscing about old times.",
        "Feeling a bit overwhelmed with work deadlines. Need to better manage my time and priorities.",
        "Wonderful family dinner tonight. Mom made my favorite dish and we had meaningful conversations."
    ];
    
    for (const text of sampleEntries) {
        const analysis = await analyzeSentiment(text);
        
        // Create sample entry with past dates for chart demonstration
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 7));
        
        journalEntries.push({
            id: Date.now() + Math.random(),
            text: text,
            date: date.toISOString(),
            sentiment: analysis.sentiment,
            score: analysis.score
        });
    }
    
    // Sort entries by date
    journalEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Update UI
    renderEntries();
    updateChart();
    updateStats();
}

// Initialize with sample entries for demo
addSampleEntries();

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === premiumModal) {
        closePremiumModal();
    }
});
