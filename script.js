document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const pagesInput = document.getElementById("pages");
  const pageCount = document.getElementById("pageCount");
  const estimateResult = document.getElementById("estimateResult");
  const estimateSummary = document.getElementById("estimateSummary");
  const featureInputs = [
    document.getElementById("bookingFeature"),
    document.getElementById("quoteFeature"),
    document.getElementById("portalFeature"),
    document.getElementById("adminFeature"),
  ].filter(Boolean);

  const money = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  function updateEstimate() {
    if (!pagesInput || !pageCount || !estimateResult || !estimateSummary) return;

    const pages = Number(pagesInput.value);
    let low = 850 + pages * 220;
    let high = 1150 + pages * 260;
    const included = [`${pages} page${pages === 1 ? "" : "s"}`];

    const addFeature = (id, label, lowCost, highCost) => {
      const input = document.getElementById(id);
      if (input?.checked) {
        low += lowCost;
        high += highCost;
        included.push(label);
      }
    };

    addFeature("bookingFeature", "booking", 300, 550);
    addFeature("quoteFeature", "quote capture", 220, 420);
    addFeature("portalFeature", "client portal", 900, 1500);
    addFeature("adminFeature", "admin dashboard", 1200, 2200);

    pageCount.textContent = String(pages);
    estimateResult.textContent = `${money(low)} - ${money(high)}`;
    estimateSummary.textContent = `Includes ${included.join(", ")}.`;
  }

  pagesInput?.addEventListener("input", updateEstimate);
  featureInputs.forEach((input) => input.addEventListener("change", updateEstimate));
  updateEstimate();

  const bookingForm = document.getElementById("bookingForm");
  const bookingNote = document.getElementById("bookingNote");

  bookingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    bookingNote.textContent = "Consultation request saved. Connect this form to a scheduler when you are ready.";
    bookingForm.reset();
  });

  const loginForm = document.getElementById("loginForm");
  const loginNote = document.getElementById("loginNote");

  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    loginNote.textContent = "Portal preview unlocked. Real accounts need a secure backend.";
  });

  const quoteForm = document.getElementById("quoteForm");
  const quoteNote = document.getElementById("quoteNote");

  quoteForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    quoteNote.textContent = "Quote request captured. Add email delivery next to receive these automatically.";
    quoteForm.reset();
  });
});
