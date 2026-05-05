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
        observer.unobserve(entry.target);
      }
    }
  },
  {
    threshold: 0, // Trigger immediately as soon as a single pixel enters
    rootMargin: "0px 0px 50px 0px" // Trigger 50px BEFORE it even enters the view
  }
);

document.querySelectorAll(".reveal").forEach((node, index) => {
  // Cap the maximum delay to 400ms so items at the bottom don't lag
  const delay = Math.min(index * 60, 400);
  node.style.transitionDelay = `${delay}ms`;
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

// Fetch GoatCounter stats
fetch('https://hkpdev.goatcounter.com/counter/TOTAL.json')
  .then(response => {
    if (!response.ok) throw new Error('Network error or blocked by client');
    return response.json();
  })
  .then(data => {
    const statsEl = document.getElementById('stats');
    if (statsEl) {
      statsEl.textContent = data.count;
    }
  })
  .catch(err => {
    console.warn('Analytics blocked or failed:', err);
    // Display '?' if it fails
    const statsEl = document.getElementById('stats');
    if (statsEl) {
      statsEl.textContent = '?';
    }
  });
