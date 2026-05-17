import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useAuth } from "../../hooks/useAuth";

export default function SceneList() {
    const { token } = useAuth();
    const [scenes, setScenes] = useState([]);

    useEffect(() => {
        api.get("/scenes", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setScenes(res.data));
    }, [token]);

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que quieres borrar esta escena?")) return;

        await api.delete(`/scenes/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setScenes(scenes.filter(s => s.id !== id));
    };

    return (
        <div className="container mt-5 admin-white-container">
            <h1 className="mb-4 text-light">Escenas</h1>

            <Link to="/admin/escenas/nueva" className="btn btn-success mb-3">
                Crear nueva escena
            </Link>

            <table className="table admin-white-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Final</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {scenes.map(s => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.sceneTitle}</td>
                            <td>{s.finalType}</td>
                            <td>
                                <Link
                                    to={`/admin/escenas/${s.id}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Editar
                                </Link>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(s.id)}
                                >
                                    Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
