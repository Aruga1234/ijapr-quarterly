// ======================================
// CURRENT YEAR
// ======================================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// ======================================
// SELECT SUBSCRIPTION
// ======================================

let paymentAmount = 0;
let paymentProduct = "";

function selectPayment(product, amount) {

    paymentProduct = product;
    paymentAmount = amount;

    document.getElementById("selectedProduct").textContent =
        product;

    document.getElementById("selectedAmount").textContent =
        amount.toLocaleString("en-IN");

    document.getElementById("selectedPayment")
        .classList.remove("d-none");

    document.getElementById("payment")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ======================================
// COPY BANK DETAILS
// ======================================

function copyText(text) {

    navigator.clipboard.writeText(text)
        .then(() => {

            const toastElement =
                document.getElementById("copyToast");

            const toast =
                bootstrap.Toast.getOrCreateInstance(
                    toastElement
                );

            toast.show();

        })
        .catch(error => {

            console.error(
                "Unable to copy:",
                error
            );

        });
}


// ======================================
// UPI PAYMENT
// ======================================

function payWithUPI() {

    /*
       IMPORTANT:

       Replace the value below with your
       REAL UPI ID.

       Examples only:
       yourname@ybl
       yourname@oksbi
       yourname@paytm

       Do NOT enter your bank account number here.
    */

    const upiId = "8247063268@ibl";

    if (upiId === "8247063268@ibl") {

        alert(
            "Please configure your actual UPI ID in script.js first."
        );

        return;
    }


    let amount = paymentAmount;

    if (!amount || amount <= 0) {

        const userAmount = prompt(
            "Enter payment amount in INR:"
        );

        amount = Number(userAmount);

    }


    if (!amount || amount <= 0) {

        alert(
            "Please enter a valid payment amount."
        );

        return;
    }


    const name =
        encodeURIComponent(
            "International Journal of Ayurveda and Pharmaceutical Research"
        );

    const note =
        encodeURIComponent(
            paymentProduct ||
            "IJAPR Payment"
        );


    const upiUrl =
        `upi://pay?pa=${upiId}` +
        `&pn=${name}` +
        `&am=${amount}` +
        `&cu=INR` +
        `&tn=${note}`;


    window.location.href = upiUrl;
}


// ======================================
// CONTACT FORM
// ======================================

document.getElementById("contactForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById("name").value;

            const email =
                document.getElementById("email").value;

            const message =
                document.getElementById("message").value;


            const subject =
                encodeURIComponent(
                    "IJAPR Website Enquiry from " + name
                );


            const body =
                encodeURIComponent(
                    "Name: " + name +
                    "\nEmail: " + email +
                    "\n\nMessage:\n" + message
                );


            window.location.href =
                "mailto:ijapr.editor@gmail.com" +
                "?subject=" + subject +
                "&body=" + body;

        }
    );