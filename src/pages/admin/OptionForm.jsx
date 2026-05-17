import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useAuth } from "../../hooks/useAuth";

export default function OptionForm() {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const navigate = useNavigate();
    const { token } = useAuth();

    const [scenes, setScenes] = useState([]);

    const [form, setForm] = useState({
        optionText: "",
        deathText: "",
        isCorrectOption: 0,
        originSceneId: "",
        destinationSceneId: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.get("/scenes", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setScenes(res.data));

        if (isEditing) {
            api.get(`/options/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                const o = res.data;
                setForm({
                    optionText: o.optionText,
                    deathText: o.deathText,
                    isCorrectOption: o.isCorrectOption,
                    originSceneId: o.originSceneId,
                    destinationSceneId: o.destinationSceneId
                });
            });
        }
    }, [id, isEditing, token]);

    const validate = () => {
        const newErrors = {};

        if (!form.optionText.trim()) {
            newErrors.optionText = "El texto de la opción es obligatorio";
        } else if (form.optionText.length < 3) {
            newErrors.optionText = "Debe tener al menos 3 caracteres";
        }

        if (form.deathText.trim() && form.deathText.length < 5) {
            newErrors.deathText = "Si se rellena, debe tener al menos 5 caracteres";
        }

        if (!form.originSceneId) {
            newErrors.originSceneId = "Debes seleccionar una escena de origen";
        }

        if (!form.destinationSceneId) {
            newErrors.destinationSceneId = "Debes seleccionar una escena de destino";
        }

        if (form.originSceneId && form.destinationSceneId && form.originSceneId === form.destinationSceneId) {
            newErrors.destinationSceneId = "La escena de destino no puede ser la misma que la de origen";
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
            optionText: form.optionText,
            deathText: form.deathText,
            isCorrectOption: Number(form.isCorrectOption),
            sceneOriginOfOption: { id: Number(form.originSceneId) },
            sceneDestinationOfOption: { id: Number(form.destinationSceneId) }
        };

        if (isEditing) {
            await api.put(`/options/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } else {
            await api.post("/options", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }

        navigate("/admin/opciones");
    };

    return (
        <div className="container mt-5 admin-white-container">
            <h1 className="text-light">{isEditing ? "Editar opción" : "Crear opción"}</h1>

            <form onSubmit={handleSubmit} className="mt-4">

                <div className="mb-3">
                    <label className="form-label text-light">Texto de la opción</label>
                    <input
                        type="text"
                        name="optionText"
                        className={`form-control ${errors.optionText ? "is-invalid" : ""}`}
                        value={form.optionText}
                        onChange={handleChange}
                        required
                    />
                    {errors.optionText && <div className="invalid-feedback">{errors.optionText}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Texto de muerte</label>
                    <textarea
                        name="deathText"
                        className={`form-control ${errors.deathText ? "is-invalid" : ""}`}
                        value={form.deathText}
                        onChange={handleChange}
                    />
                    {errors.deathText && <div className="invalid-feedback">{errors.deathText}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">¿Es correcta?</label>
                    <select
                        name="isCorrectOption"
                        className="form-control"
                        value={form.isCorrectOption}
                        onChange={handleChange}
                    >
                        <option value="0">No</option>
                        <option value="1">Sí</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Escena de origen</label>
                    <select
                        name="originSceneId"
                        className={`form-control ${errors.originSceneId ? "is-invalid" : ""}`}
                        value={form.originSceneId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una escena</option>
                        {scenes.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.sceneTitle}
                            </option>
                        ))}
                    </select>
                    {errors.originSceneId && <div className="invalid-feedback">{errors.originSceneId}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Escena de destino</label>
                    <select
                        name="destinationSceneId"
                        className={`form-control ${errors.destinationSceneId ? "is-invalid" : ""}`}
                        value={form.destinationSceneId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una escena</option>
                        {scenes.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.sceneTitle}
                            </option>
                        ))}
                    </select>
                    {errors.destinationSceneId && <div className="invalid-feedback">{errors.destinationSceneId}</div>}
                </div>

                <button className="btn btn-primary">
                    {isEditing ? "Guardar cambios" : "Crear opción"}
                </button>

            </form>
        </div>
    );
}
