import { useState } from "react";
import { Header } from "../../../widgets/header";
import { useNavigate } from "react-router-dom";
import { useAuth, authService } from "../../../features/auth";
import "./LoginPage.css";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userData = await authService.login({ email, password});

            login(userData);

            navigate("/");
            
        } catch (err) {
            setError("Neplatný e-mail nebo heslo.");
        }
    };

    return (
        <>
        <Header />
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Přihlášení</h1>
                {error && <p className="error-msg">{error}</p>}

                <div className="input-group">
                    <label>E-mail</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                </div>

                <div className="input-group">
                    <label>Heslo</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                </div>

                <button type="submit">Přihlásit se</button>
            </form>
        </div>
        </>
    );
};