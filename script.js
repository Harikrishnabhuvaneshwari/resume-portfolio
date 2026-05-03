// Update copyright year
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Handle scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    }
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll(".reveal").forEach((node, index) => {
  node.style.transitionDelay = `${index * 80}ms`;
  observer.observe(node);
});

// Fix: Prevent jump to #projects on refresh
// If there is a hash in the URL, browsers will jump to it on refresh.
// We clear the state on load to allow the browser to restore the scroll position normally.
if (window.location.hash) {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.addEventListener('load', () => {
    // If user refreshed, we want them where they were.
    // If they just arrived via a link, we want the anchor.
    // We'll let the browser handle it but clear the hash to keep the URL clean.
    setTimeout(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'auto';
        }
    }, 100);
  });
}
