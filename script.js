document.addEventListener("DOMContentLoaded", () => {

const orderForm = document.getElementById('orderForm');
const reveal = document.getElementById('reveal');

if (!orderForm) return;

/* ---------------- OWNER ---------------- */

const ownerNumber = "233201198700";

/* ---------------- FORM HANDLER ---------------- */

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    /* ---------------- INPUTS ---------------- */

    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const food = document.getElementById('foodItem').value;
    const dorm = document.getElementById('dorm').value;
    const room = document.getElementById('roomNumber').value;
    const payment = document.getElementById('paymentMethod').value;

    /* ---------------- MENU ---------------- */

    const menu = {
        "waakye-and-fish": { name: "Waakye & Fish", price: 25 },
        "jollof-and-chicken": { name: "Jollof & Chicken", price: 30 },
        "banku-and-tilapia": { name: "Banku & Tilapia", price: 45 },
        "salad-bowl": { name: "Salad Bowl", price: 10 }
    };

    const meal = menu[food] || { name: "Custom Order", price: 0 };
    const deliveryFee = 6;
    const totalAmount = meal.price + deliveryFee;

    /* ---------------- ORDER META ---------------- */

    const orderId = "CC-" + Date.now().toString().slice(-6);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    /* ---------------- PREMIUM MESSAGE ---------------- */

    const message =
`🍽️ *CAMPUS CHOW | NEW ORDER*

━━━━━━━━━━━━━━━━━━
🧾 *Order ID:* ${orderId}
⏱ *Time:* ${time}
━━━━━━━━━━━━━━━━━━

👤 *Customer Details*
Name: ${name}
Phone: ${phone}

📦 *Order Details*
Meal: ${meal.name}
Total: *${totalAmount} GHS* (incl. delivery)

📍 *Delivery Location*
Dorm: ${dorm}
Room: ${room}

💳 *Payment Method:* ${payment || "N/A"}

━━━━━━━━━━━━━━━━━━
⚡ *Status:* Awaiting Dispatch
🚀 Action: Assign Rider & Deliver

_— Campus Chow System_`;

    const whatsappURL = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

    /* ---------------- UI FEEDBACK ---------------- */

    reveal.innerHTML = `
        <div style="font-weight:700; color:#22C55E;">✔ Order Created</div>
        <div>Order ID: ${orderId}</div>
        <div>Total: ${totalAmount} GHS</div>
    `;

    reveal.style.display = "block";

    /* ---------------- SEND ---------------- */

    setTimeout(() => {
        window.open(whatsappURL, "_blank");
    }, 700);

    orderForm.reset();

    /* ---------------- AUTO HIDE ---------------- */

    setTimeout(() => {
        reveal.style.display = "none";
    }, 6000);

});

});