import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useAuth } from "../../hooks/useAuth";

export default function AdventureForm() {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const navigate = useNavigate();
    const { token } = useAuth();

    const [form, setForm] = useState({
        title: "",
        description: "",
        titleImage: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditing) {
            api.get(`/adventures/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setForm({
                    title: res.data.title,
                    description: res.data.description,
                    titleImage: res.data.titleImage
                });
            });
        }
    }, [id, isEditing, token]);

    const validate = () => {
        const newErrors = {};

        if (!form.title.trim()) {
            newErrors.title = "El título es obligatorio";
        } else if (form.title.length < 3) {
            newErrors.title = "El título debe tener al menos 3 caracteres";
        }

        if (!form.description.trim()) {
            newErrors.description = "La descripción es obligatoria";
        } else if (form.description.length < 10) {
            newErrors.description = "La descripción debe tener al menos 10 caracteres";
        }

        if (form.titleImage.trim()) {
            const urlRegex = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
            if (!urlRegex.test(form.titleImage)) {
                newErrors.titleImage = "Debe ser una URL válida (o dejarlo vacío)";
            }
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
            id: isEditing ? Number(id) : 0,
            title: form.title,
            description: form.description,
            creationDate: new Date().toISOString(),
            titleImage: form.titleImage,
            scenes: []
        };

        if (isEditing) {
            await api.put(`/adventures/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } else {
            await api.post("/adventures", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }

        navigate("/admin/aventuras");
    };

    return (
        <div className="container mt-5 admin-white-container">
            <h1 className="text-light">{isEditing ? "Editar aventura" : "Crear aventura"}</h1>

            <form onSubmit={handleSubmit} className="mt-4">

                <div className="mb-3">
                    <label className="form-label text-light">Título</label>
                    <input
                        type="text"
                        name="title"
                        className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Descripción</label>
                    <textarea
                        name="description"
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Imagen de portada (URL)</label>
                    <input
                        type="text"
                        name="titleImage"
                        className={`form-control ${errors.titleImage ? "is-invalid" : ""}`}
                        value={form.titleImage}
                        onChange={handleChange}
                    />
                    {errors.titleImage && <div className="invalid-feedback">{errors.titleImage}</div>}
                </div>

                <button className="btn btn-primary">
                    {isEditing ? "Guardar cambios" : "Crear aventura"}
                </button>

            </form>
        </div>
    );
}
