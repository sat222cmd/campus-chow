

const report = document.querySelector("#refundForm")
const refine = document.querySelector("#refine")
report.addEventListener("submit", function(e){
    e.preventDefault();


const orderId = document.getElementById("order-id",).value;


const refundName = document.getElementById("name-refund",).value


const reason = document.getElementById("reason",).value

refine.innerHTML += `<li><strong>${orderId}</strong> with the name<strong>${refundName}</strong> wants a refund and her reason is <strong>${reason}</strong></li>`;

report.reset();
})