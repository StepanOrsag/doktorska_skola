import { useProfile } from "../../../entities/user";
import { useAuth } from "../../../features/auth";
import { PageWrapper, Breadcrumb } from "../../../shared/ui";
import "./ProfilePage.css";

function ProfilePage() {
  const { user: currentUser } = useAuth();

  const { user, isLoading, error } = useProfile(currentUser?.id);

  if (isLoading) return <div className="loading">Načítám profil...</div>;
  if (error || !user) return <div className="loading" style={{ color: "red" }}>{error || "Uživatele se nepodařilo načíst."}</div>;

  return (
    <PageWrapper>
      <Breadcrumb current="MŮJ PROFIL" />

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
    </PageWrapper>
  );
}

export default ProfilePage;
