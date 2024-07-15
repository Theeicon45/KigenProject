const slides = document.querySelectorAll('input[name="slider"]');
let currentSlide = 0;

function showNextSlide() {
    slides[currentSlide].checked = false;
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].checked = true;
}

setInterval(showNextSlide, 3000); // Change slide every 3 seconds
function openPaymentPopup(card, price) {
    const popup = document.getElementById('payment-popup');
    popup.style.display = 'flex';

    // Save card reference and price
    popup.setAttribute('data-card', card);
    popup.setAttribute('data-price', price);
}

function closePaymentPopup() {
    const popup = document.getElementById('payment-popup');
    popup.style.display = 'none';
}

function toggleTextField(paymentMethodId, textFieldId) {
    const paymentForm = document.getElementById('payment-form');
    const inputs = paymentForm.querySelectorAll('.payment-input');

    // Hide all text fields
    inputs.forEach(input => input.style.display = 'none');

    // Uncheck all radio buttons
    const radioButtons = paymentForm.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        if (radio.id !== paymentMethodId) {
            radio.checked = false;
        }
    });

    // Show the relevant text field if applicable
    if (textFieldId) {
        const textField = document.getElementById(textFieldId);
        textField.style.display = 'block';
    }
}

function confirmPayment() {
    const popup = document.getElementById('payment-popup');
    const card = popup.getAttribute('data-card');
    const price = popup.getAttribute('data-price');
    const form = document.getElementById('payment-form');

    // Check if a payment method is selected
    const selectedPaymentMethod = form.querySelector('input[name="payment-method"]:checked');
    if (!selectedPaymentMethod) {
        alert('Please select a payment method.');
        return;
    }

    // Get the additional input field value if applicable
    let additionalInputValue = '';
    if (selectedPaymentMethod.value === 'Card') {
        additionalInputValue = document.getElementById('card-number').value;
    } else if (selectedPaymentMethod.value === 'PayPal') {
        additionalInputValue = document.getElementById('paypal-email').value;
    } else if (selectedPaymentMethod.value === 'Mpesa') {
        additionalInputValue = document.getElementById('mpesa-phone').value;
    }

    // Hide the popup before showing the alert
    closePaymentPopup();

    // Simulate payment processing (you can replace this with real payment logic)
    setTimeout(() => {
        alert(`Payment of Ksh ${price} successful via ${selectedPaymentMethod.value}${additionalInputValue ? `: ${additionalInputValue}` : ''}!`);

        // Change card border color and text
        card.style.borderColor = 'green';
        const buyBtn = card.querySelector('.confirm-btn');
        buyBtn.innerText = 'Successful';
        buyBtn.style.backgroundColor = 'green';
        buyBtn.disabled = true;
    }, 1000);
}
