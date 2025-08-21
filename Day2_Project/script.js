const THEME_KEY = "prefers-theme";
const btnTheme = document.getElementById("theme-toggle");
const demoBtn = document.getElementById("demo-button");

(function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) {
    document.body.classList.add("dark");
  }
  updateThemeLabel();
})();

btnTheme.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  updateThemeLabel();
});

function updateThemeLabel(){
  const isDark = document.body.classList.contains("dark");
  btnTheme.textContent = isDark ? "🌞 Light Mode" : "🌙 Dark Mode";
  btnTheme.setAttribute("aria-label", isDark ? "라이트 모드 전환" : "다크 모드 전환");
}

demoBtn?.addEventListener("click", () => {
  alert("데모 동작: 이벤트 리스너가 연결돼 있어요!");
});
