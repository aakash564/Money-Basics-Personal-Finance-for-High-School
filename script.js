function initScrollAnimations(root = document) {
  const animatedBlocks = root.querySelectorAll("[data-animate]");

  if (!animatedBlocks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedBlocks.forEach((el) => observer.observe(el));
}

async function loadArticle() {
  const container = document.querySelector("[data-article-container]");
  if (!container) return;

  try {
    const response = await fetch("article.html");
    if (!response.ok) {
      // If article fails to load, keep the page usable.
      console.error("Failed to load article.html:", response.statusText);
      return;
    }
    const html = await response.text();
    container.innerHTML = html;
    initScrollAnimations(container);
  } catch (error) {
    console.error("Error loading article.html:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadArticle();
});

