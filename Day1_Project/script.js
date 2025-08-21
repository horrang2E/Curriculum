const btn = document.getElementById("theme-toggle");

btn.addEventListener("click", () => {
  if (document.body.dataset.theme === "dark") {
    document.body.dataset.theme = "light";
    document.documentElement.style.setProperty("--bg-color", "#ffffff");
    document.documentElement.style.setProperty("--text-color", "#000000");
    btn.textContent = "🌙 Dark Mode";
    btn.setAttribute("aria-label", "다크모드로 전환")

  } else {
    document.body.dataset.theme = "dark";
    document.documentElement.style.setProperty("--bg-color", "#000000");
    document.documentElement.style.setProperty("--text-color", "#ffffff");
    btn.textContent = "🌞 Light Mode";
    btn.setAttribute("aria-label", "라이트모드로 전환");
  }
}); 