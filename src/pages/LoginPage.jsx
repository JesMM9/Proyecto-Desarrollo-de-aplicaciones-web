import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Debes rellenar todos los campos.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/login", {
                username,
                password,
            });

            const token = response.data.token;

            login(token);

            const decoded = JSON.parse(atob(token.split(".")[1]));

            localStorage.setItem("user", JSON.stringify(decoded));

            if (decoded.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (err) {
            if (err.response?.status === 401) {
                setError("Credenciales incorrectas.");
            } else {
                setError("Error al iniciar sesión. Inténtalo de nuevo.");
            }
        }
    };

    return (
        <div className="login-wrapper d-flex justify-content-center align-items-center">
            <div className="card login-card shadow p-4">
                <h2 className="text-center mb-4 login-title">Iniciar sesión</h2>

                {error && (
                    <div className="alert alert-danger py-2 text-center">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Introduce tu usuario"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduce tu contraseña"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
