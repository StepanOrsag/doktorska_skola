import "./Header.css";

function Header({ currentUserId}) {
    return (
        <header className="header-container">
            <a href="/" className= "header-logo-link">
                <img src= "/fim-uhk-abb_rgb-neg.png" alt="FIM logo" className="header-logo-img"/>
                <h1>DOKTORSKÁ ŠKOLA</h1>
            </a>
            <div>
                <a href="#" id="logout">
                    <img src="/logout.png"></img>
                </a>
            </div>
        </header>
    );
}

export default Header;