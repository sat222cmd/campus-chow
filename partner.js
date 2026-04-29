const form2 = document.querySelector("#partnerForm");

if (form2) {
    form2.addEventListener("submit", function(e){
        e.preventDefault();

        const businessName = document.getElementById("businessName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const interest = document.getElementById("interest").value;
        const note = document.getElementById("message").value.trim();

        const ownerNumber = "233204147897";

        const message = 
        `🤝 *NEW PARTNER REQUEST*\n\n` +
        `🏢 *Business:* ${businessName}\n` +
        `📧 *Email:* ${email}\n` +
        `📌 *Interest:* ${interest}\n` +
        `📝 *Note:* ${note || "N/A"}\n\n` +
        `⚡ Please follow up within 24 hours`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${ownerNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, "_blank");

        alert("Request sent! We'll contact you within 24 hours 👍");

        form2.reset();
    });
}