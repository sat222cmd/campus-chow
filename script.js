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

    // 2. Pricing Logic (6 GHS Delivery Fee)
    const prices = {
        "waakye-and-fish": 25,
        "jollof-and-chicken": 30,
        "banku-and-tilapia": 45,
        "salad-bowl": 10
    };
    const mealPrice = prices[food] || 0;
    const deliveryFee = 6;
    const totalAmount = mealPrice + deliveryFee;

    // 3. Format Phone for WhatsApp (Converts 024... to 23324...)
    const formattedCustomerPhone = "233" + phone.substring(1);

    // 4. Central Dispatcher Number (Your Master Phone)
    const dispatcherNumber = "233204147897"; 
    
    // 5. Build the "Job Ticket" for the Couriers
        // 5. Build the "Job Ticket" for the Couriers
    const message = `🚀 *CAMPUS CHOW JOB* 🚀%0A%0A` +
                    `*ORDER:* ${food} (${mealPrice} GHS)%0A` +
                    `*DELIVERY:* ${deliveryFee} GHS%0A` +
                    `*TOTAL TO COLLECT:* ${totalAmount} GHS%0A%0A` +
                    `--------------------------%0A` +
                    `👤 *CUSTOMER:* ${name}%0A` +
                    `🏠 *LOCATION:* ${dorm}, ${room}%0A` +
                    `📱 *CONTACT:* https://wa.me{formattedCustomerPhone}%0A%0A` +
                    `🚀 _Sent via *Campus Chow*_`;


    const whatsappURL = "https://wa.me/" + dispatcherNumber + "?text=" + message;

    // 6. Update the Beautiful Glass Notification
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

    // 7. Trigger Display & Redirect
    reveal.style.display = 'block';
    setTimeout(() => reveal.classList.add('active'), 10);

    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1000);

    // 8. Reset & Auto-Hide
    orderForm.reset();
    setTimeout(() => {
        reveal.classList.remove('active');
        setTimeout(() => { reveal.style.display = 'none'; }, 500);
    }, 6000);
});
