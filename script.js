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

  const canAnimatePointer =
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (canAnimatePointer) {
    window.addEventListener("pointermove", (event) => {
      const x = Math.round((event.clientX / window.innerWidth) * 100);
      const y = Math.round((event.clientY / window.innerHeight) * 100);
      document.documentElement.style.setProperty("--mx", `${x}%`);
      document.documentElement.style.setProperty("--my", `${y}%`);
    });

    document.querySelectorAll(".portfolio-card, .package-card, .service-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-7px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

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

  const quoteForm = document.getElementById("quoteForm");
  const quoteNote = document.getElementById("quoteNote");
  const quoteSubmit = quoteForm?.querySelector('button[type="submit"]');

  quoteForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!quoteNote || !quoteSubmit) return;

    quoteSubmit.disabled = true;
    quoteSubmit.textContent = "Sending...";
    quoteNote.textContent = "Sending your website quote request...";

    try {
      const response = await fetch(quoteForm.action, {
        method: "POST",
        body: new FormData(quoteForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Formspree rejected the request.");
      }

      quoteNote.textContent = "Thanks. Your website quote request was sent. I will follow up soon.";
      quoteForm.reset();
    } catch (error) {
      quoteNote.textContent = "Something went wrong. Please try again or email me directly.";
    } finally {
      quoteSubmit.disabled = false;
      quoteSubmit.textContent = "Send Website Quote Request";
    }
  });
});
