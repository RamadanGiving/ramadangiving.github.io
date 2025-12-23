/**
 * =============================================
 * RAMADAN GIVING - DONATION PAGE JAVASCRIPT
 * Comprehensive donation form handling
 * =============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initDonationForm();
    initGoalProgressAnimations();
    initLiveProgressUpdates();
});

/**
 * Main Donation Form Initialization
 */
function initDonationForm() {
    // State management
    const state = {
        amount: 100,
        frequency: 'one-time',
        cause: 'general',
        donorType: 'details',
        paymentMethod: 'card',
        dedication: 'none'
    };

    // DOM Elements
    const elements = {
        // Frequency
        frequencyBtns: document.querySelectorAll('.frequency-btn'),
        recurringNote: document.getElementById('recurringNote'),
        recurringFrequency: document.getElementById('recurringFrequency'),
        
        // Amount
        amountBtns: document.querySelectorAll('.amount-btn'),
        customAmountInput: document.getElementById('customAmount'),
        amountImpact: document.getElementById('amountImpact'),
        
        // Cause
        causeInputs: document.querySelectorAll('input[name="cause"]'),
        
        // Donor Type
        donorTypeInputs: document.querySelectorAll('input[name="donorType"]'),
        donorDetails: document.getElementById('donorDetails'),
        
        // Dedication
        dedicationBtns: document.querySelectorAll('.dedication-btn'),
        dedicationDetails: document.getElementById('dedicationDetails'),
        
        // Payment
        cardPayBtn: document.getElementById('cardPayBtn'),
        bankTransferBtn: document.getElementById('bankTransferBtn'),
        applePayBtn: document.getElementById('applePayBtn'),
        googlePayBtn: document.getElementById('googlePayBtn'),
        cardDetails: document.getElementById('cardDetails'),
        bankDetails: document.getElementById('bankDetails'),
        
        // Summary
        summaryAmount: document.getElementById('summaryAmount'),
        summaryFrequencyLine: document.getElementById('summaryFrequencyLine'),
        summaryFrequency: document.getElementById('summaryFrequency'),
        summaryCause: document.getElementById('summaryCause'),
        summaryTotal: document.getElementById('summaryTotal'),
        
        // Submit
        submitBtn: document.getElementById('donateSubmitBtn'),
        submitBtnAmount: document.querySelector('.donate-submit-btn .btn-amount')
    };

    // Impact messages based on amount
    const impactMessages = {
        25: '$25 can provide hot meals for 5 people',
        50: '$50 can provide a winter kit for a family',
        100: '$100 can provide food packages for 2 families for a week',
        250: '$250 can support a child at our camp program',
        500: '$500 can provide food for 10 families during Ramadan',
        1000: '$1,000 can sponsor emergency relief for displaced families'
    };

    // Cause names
    const causeNames = {
        general: 'Where Needed Most',
        food: 'Food Programs',
        gaza: 'Gaza Relief',
        orphans: 'Orphan Support',
        winter: 'Winter Relief',
        camp: "Children's Camp"
    };

    /**
     * Update Summary Display
     */
    function updateSummary() {
        const formattedAmount = formatCurrency(state.amount);
        
        // Update summary amounts
        if (elements.summaryAmount) {
            elements.summaryAmount.textContent = formattedAmount;
        }
        if (elements.summaryTotal) {
            elements.summaryTotal.textContent = formattedAmount;
        }
        if (elements.submitBtnAmount) {
            elements.submitBtnAmount.textContent = formattedAmount;
        }
        
        // Update frequency display
        if (elements.summaryFrequencyLine) {
            if (state.frequency !== 'one-time') {
                elements.summaryFrequencyLine.style.display = 'flex';
                elements.summaryFrequency.textContent = capitalize(state.frequency);
            } else {
                elements.summaryFrequencyLine.style.display = 'none';
            }
        }
        
        // Update cause display
        if (elements.summaryCause) {
            elements.summaryCause.textContent = causeNames[state.cause] || 'Where Needed Most';
        }
        
        // Update impact message
        updateImpactMessage();
    }

    /**
     * Update Impact Message
     */
    function updateImpactMessage() {
        if (!elements.amountImpact) return;
        
        const impactText = elements.amountImpact.querySelector('.impact-text');
        if (!impactText) return;
        
        // Find closest impact message
        let message = impactMessages[100]; // Default
        const amounts = Object.keys(impactMessages).map(Number).sort((a, b) => a - b);
        
        for (const amt of amounts) {
            if (state.amount >= amt) {
                message = impactMessages[amt];
            }
        }
        
        // Custom message for large amounts
        if (state.amount >= 2000) {
            message = `$${state.amount.toLocaleString()} can make an extraordinary impact across multiple programs`;
        }
        
        impactText.textContent = message;
    }

    /**
     * Initialize Frequency Toggle
     */
    elements.frequencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.frequencyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.frequency = btn.dataset.frequency;
            
            // Show/hide recurring note
            if (elements.recurringNote) {
                if (state.frequency !== 'one-time') {
                    elements.recurringNote.style.display = 'flex';
                    elements.recurringFrequency.textContent = state.frequency;
                } else {
                    elements.recurringNote.style.display = 'none';
                }
            }
            
            updateSummary();
        });
    });

    /**
     * Initialize Amount Selection
     */
    elements.amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.amount = parseInt(btn.dataset.amount);
            
            // Clear custom amount
            if (elements.customAmountInput) {
                elements.customAmountInput.value = '';
            }
            
            updateSummary();
        });
    });

    // Custom amount input
    if (elements.customAmountInput) {
        elements.customAmountInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            if (value > 0) {
                elements.amountBtns.forEach(b => b.classList.remove('active'));
                state.amount = value;
                updateSummary();
            }
        });

        elements.customAmountInput.addEventListener('focus', () => {
            elements.amountBtns.forEach(b => b.classList.remove('active'));
        });
    }

    /**
     * Initialize Cause Selection
     */
    elements.causeInputs.forEach(input => {
        input.addEventListener('change', () => {
            state.cause = input.value;
            updateSummary();
        });
    });

    /**
     * Initialize Donor Type Toggle
     */
    elements.donorTypeInputs.forEach(input => {
        input.addEventListener('change', () => {
            state.donorType = input.value;
            
            if (elements.donorDetails) {
                if (state.donorType === 'anonymous') {
                    elements.donorDetails.style.display = 'none';
                } else {
                    elements.donorDetails.style.display = 'block';
                }
            }
        });
    });

    /**
     * Initialize Dedication Toggle
     */
    elements.dedicationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.dedicationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.dedication = btn.dataset.dedication;
            
            if (elements.dedicationDetails) {
                if (state.dedication !== 'none') {
                    elements.dedicationDetails.style.display = 'block';
                    // Update placeholder based on type
                    const nameInput = document.getElementById('dedicationName');
                    if (nameInput) {
                        nameInput.placeholder = state.dedication === 'honor' 
                            ? 'Name of person being honored'
                            : 'Name of person being remembered';
                    }
                } else {
                    elements.dedicationDetails.style.display = 'none';
                }
            }
        });
    });

    /**
     * Initialize Payment Method Selection
     */
    function setPaymentMethod(method) {
        state.paymentMethod = method;
        
        // Reset all payment buttons
        const allPaymentBtns = document.querySelectorAll('.payment-btn');
        allPaymentBtns.forEach(b => b.classList.remove('active'));
        
        // Hide all payment details
        if (elements.cardDetails) elements.cardDetails.style.display = 'none';
        if (elements.bankDetails) elements.bankDetails.style.display = 'none';
        
        // Show relevant section
        switch (method) {
            case 'card':
                elements.cardPayBtn?.classList.add('active');
                if (elements.cardDetails) elements.cardDetails.style.display = 'block';
                break;
            case 'bank':
                elements.bankTransferBtn?.classList.add('active');
                if (elements.bankDetails) elements.bankDetails.style.display = 'block';
                break;
            case 'apple':
                elements.applePayBtn?.classList.add('active');
                break;
            case 'google':
                elements.googlePayBtn?.classList.add('active');
                break;
        }
    }

    elements.cardPayBtn?.addEventListener('click', () => setPaymentMethod('card'));
    elements.bankTransferBtn?.addEventListener('click', () => setPaymentMethod('bank'));
    elements.applePayBtn?.addEventListener('click', () => setPaymentMethod('apple'));
    elements.googlePayBtn?.addEventListener('click', () => setPaymentMethod('google'));

    /**
     * Card Input Formatting
     */
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCvc = document.getElementById('cardCvc');

    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value.substring(0, 19);
        });
    }

    if (cardExpiry) {
        cardExpiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    if (cardCvc) {
        cardCvc.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }

    /**
     * Form Submission
     */
    if (elements.submitBtn) {
        elements.submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleDonationSubmit(state);
        });
    }

    // Initialize summary
    updateSummary();
}

/**
 * Handle Donation Submission
 */
function handleDonationSubmit(state) {
    // Validate form
    if (!validateDonationForm(state)) {
        return;
    }

    // Show loading state
    const submitBtn = document.getElementById('donateSubmitBtn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-text">Processing...</span>';
    submitBtn.disabled = true;

    // Simulate payment processing
    // In production, this would integrate with Stripe, PayPal, etc.
    setTimeout(() => {
        if (state.paymentMethod === 'bank') {
            // Show bank transfer confirmation
            showBankTransferConfirmation(state);
        } else if (state.paymentMethod === 'apple' || state.paymentMethod === 'google') {
            // Redirect to digital wallet payment
            showDigitalWalletFlow(state);
        } else {
            // Process card payment
            showPaymentSuccess(state);
        }

        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    }, 1500);
}

/**
 * Validate Donation Form
 */
function validateDonationForm(state) {
    // Check amount
    if (!state.amount || state.amount < 1) {
        showNotification('Please enter a valid donation amount', 'error');
        return false;
    }

    // Check donor details if not anonymous
    if (state.donorType === 'details') {
        const email = document.getElementById('email')?.value;
        if (!email || !isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }
    }

    // Check card details if card payment selected
    if (state.paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber')?.value;
        const cardExpiry = document.getElementById('cardExpiry')?.value;
        const cardCvc = document.getElementById('cardCvc')?.value;

        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
            showNotification('Please enter a valid card number', 'error');
            return false;
        }
        if (!cardExpiry || cardExpiry.length < 5) {
            showNotification('Please enter a valid expiry date', 'error');
            return false;
        }
        if (!cardCvc || cardCvc.length < 3) {
            showNotification('Please enter a valid CVC', 'error');
            return false;
        }
    }

    return true;
}

/**
 * Show Bank Transfer Confirmation
 */
function showBankTransferConfirmation(state) {
    const modal = createModal({
        title: '🏦 Bank Transfer Instructions',
        content: `
            <p>Thank you for choosing to donate <strong>${formatCurrency(state.amount)}</strong>!</p>
            <p>Please complete your bank transfer using the details provided on this page.</p>
            <div style="background: var(--neutral-100); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>Important:</strong> Include your email in the transfer notes so we can send you a receipt.</p>
            </div>
            <p>Your donation will be processed once we receive the transfer (usually 1-3 business days).</p>
        `,
        confirmText: 'Got It',
        onConfirm: () => closeModal()
    });
    
    document.body.appendChild(modal);
}

/**
 * Show Digital Wallet Flow
 */
function showDigitalWalletFlow(state) {
    const walletName = state.paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay';
    
    showNotification(`${walletName} integration coming soon! Please use card payment for now.`, 'info');
}

/**
 * Show Payment Success
 */
function showPaymentSuccess(state) {
    const modal = createModal({
        title: '🎉 Thank You!',
        content: `
            <p style="font-size: 1.1rem; margin-bottom: 1rem;">
                Your donation of <strong>${formatCurrency(state.amount)}</strong> has been received!
            </p>
            ${state.frequency !== 'one-time' ? `
                <p style="color: var(--accent-600); margin-bottom: 1rem;">
                    🔄 This is a ${state.frequency} recurring donation
                </p>
            ` : ''}
            <p style="color: var(--text-muted);">
                A confirmation email will be sent to your email address with your tax receipt.
            </p>
            <div style="text-align: center; margin-top: 1.5rem;">
                <span style="font-size: 3rem;">❤️</span>
            </div>
        `,
        confirmText: 'Close',
        onConfirm: () => {
            closeModal();
            // Optional: redirect to thank you page
            // window.location.href = '/thank-you';
        }
    });
    
    document.body.appendChild(modal);
}

/**
 * Create Modal
 */
function createModal({ title, content, confirmText, onConfirm }) {
    const modal = document.createElement('div');
    modal.className = 'donation-modal-overlay';
    modal.innerHTML = `
        <div class="donation-modal">
            <button class="modal-close" onclick="closeModal()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
            <h3>${title}</h3>
            <div class="modal-content">${content}</div>
            <button class="modal-confirm-btn" onclick="(${onConfirm.toString()})()">
                ${confirmText}
            </button>
        </div>
    `;
    
    // Add modal styles if not already present
    if (!document.getElementById('modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .donation-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .donation-modal {
                background: var(--white, #fff);
                border-radius: 20px;
                padding: 2rem;
                max-width: 480px;
                width: 90%;
                position: relative;
                animation: slideUp 0.3s ease;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .donation-modal h3 {
                font-family: 'Cormorant Garamond', serif;
                font-size: 1.8rem;
                color: var(--primary-700, #1C4750);
                margin-bottom: 1rem;
                text-align: center;
            }
            
            .modal-content {
                color: var(--text-secondary, #52524F);
                line-height: 1.7;
                margin-bottom: 1.5rem;
            }
            
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                cursor: pointer;
                color: var(--text-muted, #737370);
                padding: 0.5rem;
                transition: color 0.2s ease;
            }
            
            .modal-close:hover {
                color: var(--text-primary, #1A1A18);
            }
            
            .modal-confirm-btn {
                width: 100%;
                padding: 1rem;
                background: linear-gradient(135deg, var(--primary-500, #2D6E7A), var(--primary-600, #245A64));
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .modal-confirm-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(45, 110, 122, 0.3);
            }
        `;
        document.head.appendChild(styles);
    }
    
    return modal;
}

/**
 * Close Modal
 */
function closeModal() {
    const modal = document.querySelector('.donation-modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => modal.remove(), 300);
    }
}

// Make closeModal available globally
window.closeModal = closeModal;

/**
 * Show Notification
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.donation-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `donation-notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}</span>
        <span class="notification-message">${message}</span>
    `;
    
    // Add notification styles if not present
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .donation-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                background: var(--white, #fff);
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 9998;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .donation-notification.error {
                border-left: 4px solid #ef4444;
            }
            
            .donation-notification.success {
                border-left: 4px solid #22c55e;
            }
            
            .donation-notification.info {
                border-left: 4px solid var(--primary-500, #2D6E7A);
            }
            
            .notification-icon {
                font-size: 1.2rem;
            }
            
            .notification-message {
                color: var(--text-secondary, #52524F);
                font-size: 0.95rem;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/**
 * Initialize Goal Progress Animations
 */
function initGoalProgressAnimations() {
    const progressBars = document.querySelectorAll('.goal-progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.dataset.progress;
                
                // Reset and animate
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = `${progress}%`;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

/**
 * Initialize Live Progress Updates
 * In production, this would connect to a real-time data source
 */
function initLiveProgressUpdates() {
    // Simulate live updates every 30 seconds
    setInterval(() => {
        const goalCards = document.querySelectorAll('.goal-card');
        goalCards.forEach(card => {
            const raisedEl = card.querySelector('.goal-raised');
            const progressBar = card.querySelector('.goal-progress-fill');
            
            if (raisedEl && progressBar) {
                // Simulate small increment (remove in production)
                const currentAmount = parseFloat(raisedEl.textContent.replace(/[$,]/g, ''));
                const increment = Math.random() * 50; // Random increment between 0-50
                const newAmount = currentAmount + increment;
                
                // Update display
                raisedEl.textContent = '$' + newAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
                
                // Update progress bar (assuming $100,000 goal for demo)
                const targetMatch = card.querySelector('.goal-target')?.textContent.match(/\$([0-9,]+)/);
                if (targetMatch) {
                    const target = parseFloat(targetMatch[1].replace(/,/g, ''));
                    const newProgress = Math.min((newAmount / target) * 100, 100);
                    progressBar.style.width = `${newProgress}%`;
                    progressBar.dataset.progress = newProgress;
                }
            }
        });
    }, 30000); // Update every 30 seconds
}

/**
 * Utility Functions
 */
function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

