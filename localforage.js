///===================Dark/Light Mode Preference =======================///
const userPrefersLight = false;

function setThemePreference(prefersDark) {
    if (prefersDark) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
}

const userPrefersDark = localStorage.getItem("theme") === "dark";

setThemePreference(userPrefersDark);

const toggle = document.getElementById("toggle")

toggle.addEventListener("click", (event) => {
    const isDarkMode = event.target.checked;
    setThemePreference(isDarkMode);

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
})

toggle.checked = userPrefersDark;

///===================Dark/Light Mode Preference =======================///


