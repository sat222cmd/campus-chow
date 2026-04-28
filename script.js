const orderForm = document.getElementById('orderForm');
const reveal = document.getElementById('reveal');

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Capture all form values
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('phoneNumber').value;
    const food = document.getElementById('foodItem').value;
    const dorm = document.getElementById('dorm').value;
    const room = document.getElementById('roomNumber').value;
    const payment = document.getElementById('paymentMethod').value;

    // 2. Pricing Logic + readable names
    const menu = {
        "waakye-and-fish": { name: "Waakye & Fish", price: 25 },
        "jollof-and-chicken": { name: "Jollof & Chicken", price: 30 },
        "banku-and-tilapia": { name: "Banku & Tilapia", price: 45 },
        "salad-bowl": { name: "Salad Bowl", price: 10 }
    };

    const selectedMeal = menu[food] || { name: food, price: 0 };
    const deliveryFee = 6;
    const totalAmount = selectedMeal.price + deliveryFee;

    // 3. Phone Formatting (Ghana)
    let cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.startsWith('0')) {
        cleanPhone = "233" + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('233')) {
        cleanPhone = "233" + cleanPhone;
    }

    const formattedCustomerPhone = cleanPhone;

    // 4. Dispatcher Number
    const dispatcherNumber = "233204147897";

    // 5. Build Message (clean + correct links)
    const message = 
        `🚀 *CAMPUS CHOW JOB* 🚀\n\n` +
        `*ORDER:* ${selectedMeal.name} (${selectedMeal.price} GHS)\n` +
        `*DELIVERY:* ${deliveryFee} GHS\n` +
        `*TOTAL TO COLLECT:* ${totalAmount} GHS\n\n` +
        `--------------------------\n` +
        `👤 *CUSTOMER:* ${name}\n` +
        `🏠 *LOCATION:* ${dorm}, ${room}\n` +
        `💳 *PAYMENT:* ${payment}\n` +
        `📱 *CONTACT:* https://wa.me/${formattedCustomerPhone}\n\n` +
        `🚀 _Sent via *Campus Chow*_`;

    // 6. Encode message (CRITICAL)
    const encodedMessage = encodeURIComponent(message);

    // 7. Final WhatsApp URL (correct format)
    const whatsappURL = `https://wa.me/${dispatcherNumber}?text=${encodedMessage}`;

    // 8. Notification Card
    reveal.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <div style="background: #22C55E; width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 8px #22C55E;"></div>
            <strong style="color: #FF6B35;">Order Transmitted</strong>
        </div>
        <div style="padding-left: 20px; border-left: 2px solid rgba(255,255,255,0.1);">
            <div style="font-weight: 600;">Total: ${totalAmount} GHS</div>
            <div style="font-size: 0.8rem; opacity: 0.7;">Check your WhatsApp window</div>
        </div>
    `;

    reveal.style.display = 'block';
    setTimeout(() => reveal.classList.add('active'), 10);

    // 9. Open WhatsApp
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1000);

    // 10. Reset form + hide notification
    orderForm.reset();

    setTimeout(() => {
        reveal.classList.remove('active');
        setTimeout(() => {
            reveal.style.display = 'none';
        }, 500);
    }, 6000);
});