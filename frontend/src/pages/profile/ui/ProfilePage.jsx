import { NavLink } from "react-router-dom";
import { useProfile } from "../../../entities/user";
import "./ProfilePage.css";

function ProfilePage() {
  const current_user_id = 2;
  const { user, isLoading, error } = useProfile(current_user_id);

  if (isLoading) return <div style={{ padding: "20px" }}>Načítám profil...</div>;
  if (error || !user) return <div style={{ padding: "20px", color: "red" }}>{error || "Uživatele se nepodařilo načíst."}</div>;

  return (
    <div className="profile-wrapper">
      <div className="navlink-container">
        <NavLink to="/" className="nav-link">PŘEHLED AKCÍ</NavLink>
        <h1> &gt; MŮJ PROFIL</h1>
      </div>

      <div className="profile-info-container">
        <div className="info-card">
          <h3>Jméno a příjmení</h3>
          <p>{user.fullName}</p>
        </div>
        <div className="info-card">
          <h3>E-mail</h3>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
