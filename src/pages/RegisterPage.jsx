import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/users", {
                username,
                email,
                password,
                role: "user"
            });

            setSuccess("Usuario registrado correctamente.");
            setTimeout(() => navigate("/login"), 1500);

        } catch (err) {
            if (err.response?.data) {
                setError(err.response.data);
            } else {
                setError("Error al registrarse. Inténtalo de nuevo.");
            }
        }
    };

    return (
        <div className="register-wrapper d-flex justify-content-center align-items-center">
            <div className="card register-card shadow p-4">
                <h2 className="text-center mb-4 register-title">Crear cuenta</h2>

                {error && <div className="alert alert-danger py-2 text-center">{error}</div>}
                {success && <div className="alert alert-success py-2 text-center">{success}</div>}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Introduce tu usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input
                        type="email"
                        className="form-control"
                        placeholder="Introduce tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirmar contraseña</label>
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Repite tu contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
}
