const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

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
