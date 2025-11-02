
export default function loadLandingPage() {
  const root = document.getElementById("landing-root");
  if (!root) return;

  const themeToggle = document.getElementById("themeToggle");
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");

  let darkMode = localStorage.getItem("darkMode") === "true" || 
                 (!localStorage.getItem("darkMode") && 
                 window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (darkMode) {
    document.documentElement.classList.add("dark");
    if (sunIcon) sunIcon.classList.remove("hidden");
    if (moonIcon) moonIcon.classList.add("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    if (sunIcon) sunIcon.classList.add("hidden");
    if (moonIcon) moonIcon.classList.remove("hidden");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      darkMode = !darkMode;
      document.documentElement.classList.toggle("dark", darkMode);
      
      if (sunIcon) sunIcon.classList.toggle("hidden");
      if (moonIcon) moonIcon.classList.toggle("hidden");
      
      localStorage.setItem("darkMode", darkMode);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

}