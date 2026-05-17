import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useAuth } from "../../hooks/useAuth";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [form, setForm] = useState({
        username: "",
        email: "",
        role: "user",
        password: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.get(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            const u = res.data;
            setForm({
                username: u.username,
                email: u.email,
                role: u.role.toLowerCase(),
                password: ""
            });
        });
    }, [id, token]);

    const validate = () => {
        const newErrors = {};

        if (!form.role) {
            newErrors.role = "Debes seleccionar un rol";
        }

        if (form.password.trim() && form.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const payload = {
            id: Number(id),
            username: form.username,
            email: form.email,
            role: form.role,
            password: form.password || null
        };

        await api.put(`/users/${id}`, payload, {
            headers: { Authorization: `Bearer ${token}` }
        });

        navigate("/admin/usuarios");
    };

    return (
        <div className="container mt-5 admin-white-container">
            <h1 className="text-light">Editar usuario</h1>

            <form onSubmit={handleSubmit} className="mt-4">

                <div className="mb-3">
                    <label className="form-label text-light">Usuario</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={form.username}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={form.email}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Rol</label>
                    <select
                        name="role"
                        className={`form-control ${errors.role ? "is-invalid" : ""}`}
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                    {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Nueva contraseña</label>
                    <input
                        type="password"
                        name="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Dejar vacío para no cambiar"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button className="btn btn-primary">Guardar cambios</button>

            </form>
        </div>
    );
}
