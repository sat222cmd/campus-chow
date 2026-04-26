const form2 = document.querySelector("#partnerForm");

// This check is the most important part!
if (form2) {
    form2.addEventListener("submit", function(e){
        // Now this will actually run and stop the reload
        e.preventDefault();

        const businessName = document.getElementById("businessName").value;
        const email = document.getElementById("contactEmail").value;
        const interest = document.getElementById("interest").value;
        const note = document.getElementById("message").value;

        const message = `
        Name: ${businessName}
        Email: ${email}
        Interest: ${interest}
        Note: ${note}

        Check your email! We will contact you within 24 hours.
        `;
      
        alert(message);
        form2.reset(); 
    });
}



