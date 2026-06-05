import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <nav className="sidebar-container">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <NavLink to="/" end className="sidebar-link">
            Přehled akcí
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/profil" className="sidebar-link">
            Můj profil
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
