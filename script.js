document.addEventListener("DOMContentLoaded", () => {

const orderForm = document.getElementById('orderForm');
const reveal = document.getElementById('reveal');

if (!orderForm) return;

/* ---------------- RIDERS ---------------- */

let riders = [
    { name: "Kofi", phone: "233204147897", status: "BUSY" },
    { name: "Ama", phone: "233204082511", status: "BUSY" },
    { name: "Yaw", phone: "233204147897", status: "BUSY" }
];

/* ---------------- ROTATION INDEX ---------------- */
/*
This controls fairness.
Each new order starts search from next rider.
*/
let lastAssignedIndex = -1;

/* ---------------- QUEUE ---------------- */

let orderQueue = [];

/* ---------------- HELPERS ---------------- */

function getNextRider() {
    const total = riders.length;

    for (let i = 0; i < total; i++) {
        const index = (lastAssignedIndex + 1 + i) % total;
        const rider = riders[index];

        if (rider.status === "AVAILABLE") {
            lastAssignedIndex = index;
            return rider;
        }
    }

    return null; // no available rider
}

function setBusy(name) {
    const r = riders.find(x => x.name === name);
    if (r) r.status = "BUSY";
}

function setAvailable(name) {
    const r = riders.find(x => x.name === name);
    if (r) r.status = "AVAILABLE";
}

/* ---------------- PROCESS QUEUE ---------------- */

function processQueue() {
    if (orderQueue.length === 0) return;

    const rider = getNextRider();
    if (!rider) return;

    const next = orderQueue.shift();
    setBusy(rider.name);

    const message =
`🚀 QUEUED ORDER

🧾 ID: ${next.orderId}
🍽️ Food: ${next.food}
💰 Total: ${next.totalAmount} GHS
📍 ${next.dorm}, ${next.room}

⚡ Rider: ${rider.name}`;

    window.open(
        `https://wa.me/${rider.phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );

    setTimeout(() => {
        setAvailable(rider.name);
        processQueue();
    }, 15000);
}

/* ---------------- ORDER SUBMISSION ---------------- */

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const phone = document.getElementById('phoneNumber').value.trim();
    const food = document.getElementById('foodItem').value;
    const dorm = document.getElementById('dorm').value;
    const room = document.getElementById('roomNumber').value;
    const payment = document.getElementById('paymentMethod').value;

    const menu = {
        "waakye-and-fish": { name: "Waakye & Fish", price: 25 },
        "jollof-and-chicken": { name: "Jollof & Chicken", price: 30 },
        "banku-and-tilapia": { name: "Banku & Tilapia", price: 45 },
        "salad-bowl": { name: "Salad Bowl", price: 10 }
    };

    const meal = menu[food] || { name: "Custom Order", price: 0 };
    const total = meal.price + 6;

    const orderId = "CC-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

    const rider = getNextRider();

    /* ---------------- IF ALL BUSY → QUEUE ---------------- */

    if (!rider) {
        orderQueue.push({
            orderId,
            food: meal.name,
            dorm,
            room,
            totalAmount: total
        });

        alert("All riders busy. Order queued.");
        return;
    }

    setBusy(rider.name);

    const message =
`🚀 CAMPUS CHOW ORDER

🧾 ${orderId}
🍽️ ${meal.name}
💰 ${total} GHS
📍 ${dorm}, ${room}
📱 ${phone}

⚡ Rider: ${rider.name}`;

    const url = `https://wa.me/${rider.phone}?text=${encodeURIComponent(message)}`;

    reveal.innerHTML = `
        <strong>Order Sent</strong><br>
        Rider: ${rider.name}<br>
        Total: ${total} GHS
    `;

    reveal.style.display = "block";

    setTimeout(() => {
        window.open(url, "_blank");
    }, 700);

    orderForm.reset();

    setTimeout(() => {
        setAvailable(rider.name);
        processQueue();
    }, 15000);

});

});