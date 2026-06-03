import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const current_user_id = 2;

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${current_user_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Chyba při komunikaci se serverem.");
            }
            return response.json();
        })
        .then(data => {
            setUser(data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Chyba při načítání profilu:", error);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div style={{ padding: "20px" }}>Načítám profil...</div>;
    }

    if (!user) {
        return <div style={{ padding: "20px", color: "red" }}>Uživatele se nepodařilo načíst.</div>;
    }

    return (
        
        <div className="profile-wrapper">
            <div className="navlink-container">
                <NavLink to="/" className="nav-link">PŘEHLED AKCÍ</NavLink>
                <h1> &gt; MŮJ PROFIL</h1>
            </div>

            <div className="profile-info-container">
                <div className="info-card">
                    <h3>Jméno a příjmení</h3>
                    <p>{user.fullName }</p>
                </div>
                <div className="info-card">
                    <h3>E-mail</h3>
                    <p>{user.email}</p>
                </div>
            </div>

        </div>
    );
}

export default Profile;