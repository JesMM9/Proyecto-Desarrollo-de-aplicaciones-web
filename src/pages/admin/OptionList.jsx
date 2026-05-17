import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useAuth } from "../../hooks/useAuth";

export default function OptionList() {
    const { token } = useAuth();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        api.get("/options", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setOptions(res.data));
    }, [token]);

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que quieres borrar esta opción?")) return;

        await api.delete(`/options/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setOptions(options.filter(o => o.id !== id));
    };

    return (
        <div className="container mt-5 admin-white-container">
            <h1 className="mb-4 text-light">Opciones</h1>

            <Link to="/admin/opciones/nueva" className="btn btn-success mb-3">
                Crear nueva opción
            </Link>

            <table className="table admin-white-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Texto</th>
                        <th>Correcta</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {options.map(o => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.optionText}</td>
                            <td>{o.isCorrectOption}</td>
                            <td>{o.originSceneId}</td>
                            <td>{o.destinationSceneId}</td>
                            <td>
                                <Link
                                    to={`/admin/opciones/${o.id}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Editar
                                </Link>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(o.id)}
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
