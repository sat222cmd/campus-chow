document.addEventListener("DOMContentLoaded", () => {

const orderForm = document.getElementById('orderForm');
const reveal = document.getElementById('reveal');

if (!orderForm) return;

/* ---------------- OWNER NUMBER ---------------- */

const ownerNumber = "233204147897"; // your WhatsApp (fixed format)

/* ---------------- ORDER FORM ---------------- */

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

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

    const selectedMeal = menu[food] || { name: "Custom Order", price: 0 };
    const deliveryFee = 6;
    const totalAmount = selectedMeal.price + deliveryFee;

    /* ---------------- ORDER ID ---------------- */

    const orderId = "CC-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    /* ---------------- WHATSAPP MESSAGE ---------------- */

    const message =
`🚀 CAMPUS CHOW ORDER

🧾 Order ID: ${orderId}
⏱ Time: ${time}

👤 Customer: ${name}
📱 Phone: ${phone}

🍽️ Food: ${selectedMeal.name}
💰 Total: ${totalAmount} GHS
💳 Payment: ${payment || "N/A"}

📍 Location: ${dorm}, ${room}

⚡ Status: New Order (Awaiting Dispatch)`;

    const whatsappURL = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

    /* ---------------- UI FEEDBACK ---------------- */

    reveal.innerHTML = `
        <div style="font-weight:700;">Order Sent to You</div>
        <div>Order ID: ${orderId}</div>
        <div>Total: ${totalAmount} GHS</div>
    `;

    reveal.style.display = "block";

    setTimeout(() => {
        window.open(whatsappURL, "_blank");
    }, 700);

    orderForm.reset();

});

});git 