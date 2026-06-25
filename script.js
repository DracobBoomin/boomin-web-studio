document.addEventListener("DOMContentLoaded", () => {
  console.log("Boomin Web Studio Loaded!");

  const cta = document.querySelector(".btn-primary");

  if (cta) {
    cta.addEventListener("click", () => {
      document.querySelector("#services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const pagesInput = document.getElementById("pages");
  const bookingInput = document.getElementById("booking");
  const seoInput = document.getElementById("seo");
  const calculateBtn = document.getElementById("calculateBtn");
  const estimateResult = document.getElementById("estimateResult");

  calculateBtn.addEventListener("click", function () {
    const pages = Number(pagesInput.value);

    let price = 499;

    if (pages > 3) {
      price = price + (pages - 3) * 100;
    }

    if (bookingInput.checked) {
      price = price + 300;
    }

    if (seoInput.checked) {
      price = price + 250;
    }

    estimateResult.textContent = "Estimated Price: $" + price;
  });

  const quoteForm = document.getElementById("quoteForm");

  quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you! Your quote request has been received.");
  });
});
