import { useEffect } from "react";

function Header() {

    useEffect(() => {
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

        /*
        const start = document.getElementsByClassName("start");

        console.log(start);

        const paragraphsBox = document.querySelector(".paragraphs-box");

        console.log(paragraphsBox);
        */

    }, [])

    return (
        <header class="options">
            <a href="/"><i class="fa-solid fa-keyboard keyboard" id="keyboardicon"></i></a>
            <div class="title">
                <a href="/">
                    <h3>HyperText</h3>
                </a>
            </div>

            <div class="default-options">
                <ul class="two-options">
                    <a href="/">
                        <li id="home"><i class="fa-solid fa-house"></i> Home</li>
                    </a>
                    <a href="/stats">
                        <li id="stats"><i class="fa-solid fa-chart-simple"></i> Stats</li>
                    </a>
                </ul>
            </div>

            <input type="checkbox" id="toggle" class="toggleCheckbox" />
            <label htmlFor="toggle" class='toggleContainer toggle'>
                <div>Dark Mode</div>
                <div>Light Mode</div>
            </label>

            <a href="/settings">
                <i class="fa-solid fa-gear"></i>
            </a>
        </header>
    )
}

export default Header;