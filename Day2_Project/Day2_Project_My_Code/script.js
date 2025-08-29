const THEME_KEY = "prefers-theme";
const btn = document.getElementById("theme-toggle");
const demoBtn = document.getElementById("demo-button");

btn.addEventListener("click", () => {
  const isDark = document.body.dataset.theme === "dark";
  document.body.dataset.theme = isDark ? "light" : "dark";
  document.documentElement.style.setProperty("--bg-color", isDark ? "#ffffff" : "#000000");
  document.documentElement.style.setProperty("--text-color", isDark ? "#000000" : "#ffffff");
  btn.textContent = isDark ? "🌙 Dark Mode" : "🌞 Light Mode";
  btn.setAttribute("aria-label", isDark ? "다크모드로 전환" : "라이트모드로 전환");
});

demoBtn?.addEventListener("click", () => {
  alert("데모 동작: 이벤트 리스너가 연결돼 있어요!");
});