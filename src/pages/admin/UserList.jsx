import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useAuth } from "../../hooks/useAuth";

export default function UserList() {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("/users", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setUsers(res.data));
    }, [token]);

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que quieres borrar este usuario?")) return;

        await api.delete(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setUsers(users.filter(u => u.id !== id));
    };

    return (
        <div className="container mt-5 admin-white-container">
            <h1 className="mb-4 text-light">Usuarios</h1>

            <table className="table admin-white-table mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <Link
                                    to={`/admin/usuarios/${u.id}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Editar
                                </Link>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(u.id)}
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
