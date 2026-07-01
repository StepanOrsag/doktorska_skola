import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };
  
  return (
    <header className="header-container">
      <a href="/" className="header-logo-link">
        <img src="/fim-uhk-abb_rgb-neg.png" alt="FIM logo" className="header-logo-img" />
        <h1>DOKTORSKÁ ŠKOLA</h1>
      </a>
      <div>
        {user && (
          <a href="#" id="logout" onClick={handleLogout}>
          <img src="/logout.png" alt="Odhlásit" />
        </a>
        )}
      </div>
    </header>
  );
}

export default Header;
