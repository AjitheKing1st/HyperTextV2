function Header() {
    return (
        <header class="options">
            <a href="/Math/Calculus"><i class="fa-solid fa-keyboard keyboard" id="keyboardicon"></i></a>
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