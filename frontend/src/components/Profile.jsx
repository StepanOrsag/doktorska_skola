import { useState, useEffect } from "react";

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
        
        <div>
            <h2>Můj profil</h2>
            <p style ={{color: "#333333"}}>{user.fullName }</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
        </div>
    );
}

export default Profile;