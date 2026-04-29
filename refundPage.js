const report = document.querySelector("#refundForm");
const refine = document.querySelector("#refine");

if (report) {
    report.addEventListener("submit", function(e){
        e.preventDefault();

        const orderId = document.getElementById("order-id").value.trim();
        const refundName = document.getElementById("name-refund").value.trim();
        const reason = document.getElementById("reason").value.trim();

        const ownerNumber = "233204147897";

        // Build WhatsApp message
        const message = 
        `💸 *REFUND REQUEST*\n\n` +
        `🧾 *Order ID:* ${orderId}\n` +
        `👤 *Name:* ${refundName}\n` +
        `❗ *Reason:* ${reason}\n\n` +
        `⚡ Please review this request`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${ownerNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, "_blank");

        // Optional: show on page (cleaner way)
        const li = document.createElement("li");
        li.innerHTML = `<strong>${orderId}</strong> - ${refundName}: ${reason}`;
        refine.appendChild(li);

        report.reset();
    });
}