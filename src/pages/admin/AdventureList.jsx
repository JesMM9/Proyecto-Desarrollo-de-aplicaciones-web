import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useAuth } from "../../hooks/useAuth";

export default function AdventureList() {
    const { token } = useAuth();
    const [adventures, setAdventures] = useState([]);

    useEffect(() => {
        api.get("/adventures", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setAdventures(res.data));
    }, [token]);

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que quieres borrar esta aventura?")) return;

        await api.delete(`/adventures/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setAdventures(adventures.filter(a => a.id !== id));
    };

    return (
        <div className="container mt-5 admin-white-container">
            <h1 className="mb-4 text-light">Aventuras</h1>

            <Link to="/admin/aventuras/nueva" className="btn btn-success mb-3">
                Crear nueva aventura
            </Link>

            <table className="table admin-white-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {adventures.map(a => (
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.title}</td>
                            <td>
                                <Link
                                    to={`/admin/aventuras/${a.id}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Editar
                                </Link>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(a.id)}
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
