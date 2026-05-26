const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const parallaxImages = document.querySelectorAll("[data-parallax]");
const startsOnLightSection = document.querySelector("main > .compact-hero, main > .contact-hero");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", Boolean(startsOnLightSection) || window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  nav?.classList.toggle("is-open");
  header?.classList.toggle("is-open");
});

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("is-active");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const moveParallax = () => {
  parallaxImages.forEach((image) => {
    const rect = image.parentElement.getBoundingClientRect();
    const offset = rect.top * -0.08;
    image.style.transform = `translateY(${offset}px) scale(1.08)`;
  });
};

moveParallax();
window.addEventListener("scroll", moveParallax, { passive: true });

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("is-sent");
  });
});
