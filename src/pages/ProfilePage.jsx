import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
    const { user, token } = useAuth();
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        role: ""
    });

    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!user) return;

        const fetchProfile = async () => {
            try {
                const userResponse = await axios.get(
                    `http://localhost:8080/users/${user.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                setProfileData({
                    username: userResponse.data.username,
                    email: userResponse.data.email,
                    role: userResponse.data.role
                });

                const progressResponse = await axios.get(
                    `http://localhost:8080/progress/user/${user.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                setProgress(progressResponse.data);
            } catch (err) {
                console.error("Error cargando perfil:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, token]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        try {
            await axios.put(
                `http://localhost:8080/users/${user.id}`,
                {
                    username: profileData.username,
                    email: profileData.email
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setMessage("Datos actualizados correctamente.");
        } catch (err) {
            console.error("Error actualizando perfil:", err);
            setMessage("Error al actualizar los datos.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
        <div className="container text-center mt-5">
            <h2 className="section-title">Cargando perfil...</h2>
        </div>
        );
    }

    return (
        <div className="container mt-4 profile-container">

            <h1 className="section-title mb-4 text-center">Mi Perfil</h1>

            {message && (
                <div className="alert alert-info text-center">{message}</div>
            )}

            <div className="row">

                <div className="col-md-5">
                    <div className="card p-4 shadow-sm profile-card">
                        <h3 className="profile-subtitle mb-3">Datos personales</h3>

                        <form onSubmit={handleSave}>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <input
                                type="text"
                                className="form-control"
                                value={profileData.username}
                                onChange={(e) =>
                                    setProfileData({ ...profileData, username: e.target.value })
                                }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Correo electrónico</label>
                                <input
                                type="email"
                                className="form-control"
                                value={profileData.email}
                                onChange={(e) =>
                                    setProfileData({ ...profileData, email: e.target.value })
                                }
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={saving}
                            >
                                {saving ? "Guardando..." : "Guardar cambios"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="col-md-7">
                    <div className="card p-4 shadow-sm profile-card">
                        <h3 className="profile-subtitle mb-3">Mi progreso</h3>

                        {progress.length === 0 ? (
                            <p>No tienes progreso registrado.</p>
                        ) : (
                            <ul className="list-group">
                                {progress.map((p) => (
                                    <li key={p.id} className="list-group-item progress-item">
                                        <div className="fw-bold">{p.adventureTitle}</div>

                                        <div className="small text-muted">
                                            Última escena: {p.currentSceneTitle}
                                        </div>

                                        <div className="small text-muted">
                                            Fecha: {new Date(p.lastGameDate).toLocaleDateString()}
                                        </div>

                                        <span className={`badge mt-2 ${p.completed === 1 ? "bg-success" : "bg-warning text-dark"}`}>
                                            {p.completed === 1 ? "Completado" : "En progreso"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
