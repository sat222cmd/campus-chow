const orderForm = document.getElementById('orderForm');
const reveal = document.getElementById('reveal');

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Capture all form values
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const food = document.getElementById('foodItem').value;
    const dorm = document.getElementById('dorm').value.trim();
    const room = document.getElementById('roomNumber').value.trim();
    const payment = document.getElementById('paymentMethod').value;

    // 2. Pricing Logic
    const menu = {
        "waakye-and-fish": { name: "Waakye & Fish", price: 25 },
        "jollof-and-chicken": { name: "Jollof & Chicken", price: 30 },
        "banku-and-tilapia": { name: "Banku & Tilapia", price: 45 },
        "salad-bowl": { name: "Salad Bowl", price: 10 }
    };

    const selectedMeal = menu[food] || { name: "Custom Order", price: 0 };
    const deliveryFee = 6;
    const totalAmount = selectedMeal.price + deliveryFee;

    // 3. Phone Formatting
    let cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.startsWith('0')) {
        cleanPhone = "233" + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('233')) {
        cleanPhone = "233" + cleanPhone;
    }

    const formattedCustomerPhone = cleanPhone;

    // 4. Dispatcher Number
    const dispatcherNumber = "233204147897";

    // 5. Order ID + Time
    const orderId = "CC-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 6. CLEAN Customer-Friendly Message (but keeps Order ID)
    const message = 
        `🚀 *CAMPUS CHOW* 🚀\n\n` +
        `Hi 👋 I'd like to place an order:\n\n` +
        `🧾 *Order ID:* ${orderId}\n` +
        `⏱ *Time:* ${time}\n\n` +
        `🍽️ *Order:* ${selectedMeal.name}\n` +
        `💰 *Total:* ${totalAmount} GHS\n` +
        `📍 *Location:* ${dorm || "N/A"}, ${room || "N/A"}\n` +
        `💳 *Payment:* ${payment || "N/A"}\n\n` +
        `📱 *My Number:* ${formattedCustomerPhone}\n\n` +
        `🙏 Thank you!`;

    // 7. Encode
    const encodedMessage = encodeURIComponent(message);

    // 8. WhatsApp URL
    const whatsappURL = `https://wa.me/${dispatcherNumber}?text=${encodedMessage}`;

    // 9. Notification Card
    reveal.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <div style="background: #22C55E; width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 8px #22C55E;"></div>
            <strong style="color: #FF6B35;">Order Sent</strong>
        </div>
        <div style="padding-left: 20px; border-left: 2px solid rgba(255,255,255,0.1);">
            <div style="font-weight: 600;">Total: ${totalAmount} GHS</div>
            <div style="font-size: 0.8rem; opacity: 0.7;">Complete order in WhatsApp</div>
        </div>
    `;

    reveal.style.display = 'block';
    setTimeout(() => reveal.classList.add('active'), 10);

    // 10. Open WhatsApp
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1000);

    // 11. Reset
    orderForm.reset();

    setTimeout(() => {
        reveal.classList.remove('active');
        setTimeout(() => {
            reveal.style.display = 'none';
        }, 500);
    }, 6000);
});