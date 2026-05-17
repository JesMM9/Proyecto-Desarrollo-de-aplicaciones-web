import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useAuth } from "../../hooks/useAuth";

export default function SceneForm() {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const navigate = useNavigate();
    const { token } = useAuth();

    const [adventures, setAdventures] = useState([]);

    const [form, setForm] = useState({
        sceneTitle: "",
        text: "",
        sceneImage: "",
        finalType: "N",
        isEnd: 0,
        adventureId: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.get("/adventures", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setAdventures(res.data));

        if (isEditing) {
            api.get(`/scenes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                const s = res.data;
                setForm({
                    sceneTitle: s.sceneTitle,
                    text: s.text,
                    sceneImage: s.sceneImage,
                    finalType: s.finalType,
                    isEnd: s.isEnd,
                    adventureId: s.adventureId ?? ""
                });
            });
        }
    }, [id, isEditing, token]);

    const validate = () => {
        const newErrors = {};

        if (!form.sceneTitle.trim()) {
            newErrors.sceneTitle = "El título es obligatorio";
        } else if (form.sceneTitle.length < 3) {
            newErrors.sceneTitle = "El título debe tener al menos 3 caracteres";
        }

        if (!form.text.trim()) {
            newErrors.text = "El texto es obligatorio";
        } else if (form.text.length < 10) {
            newErrors.text = "El texto debe tener al menos 10 caracteres";
        }

        if (form.sceneImage.trim()) {
            const urlRegex = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
            if (!urlRegex.test(form.sceneImage)) {
                newErrors.sceneImage = "Debe ser una URL válida (o dejarlo vacío)";
            }
        }

        if (!form.adventureId) {
            newErrors.adventureId = "Debes seleccionar una aventura";
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
            sceneTitle: form.sceneTitle,
            text: form.text,
            sceneImage: form.sceneImage,
            finalType: form.finalType,
            isEnd: Number(form.isEnd),
            adventureOfScene: { id: Number(form.adventureId) }
        };

        if (isEditing) {
            await api.put(`/scenes/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } else {
            await api.post("/scenes", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }

        navigate("/admin/escenas");
    };

    return (
        <div className="container mt-5 admin-white-container">
            <h1 className="text-light">{isEditing ? "Editar escena" : "Crear escena"}</h1>

            <form onSubmit={handleSubmit} className="mt-4">

                <div className="mb-3">
                    <label className="form-label text-light">Título</label>
                    <input
                        type="text"
                        name="sceneTitle"
                        className={`form-control ${errors.sceneTitle ? "is-invalid" : ""}`}
                        value={form.sceneTitle}
                        onChange={handleChange}
                        required
                    />
                    {errors.sceneTitle && <div className="invalid-feedback">{errors.sceneTitle}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Texto</label>
                    <textarea
                        name="text"
                        className={`form-control ${errors.text ? "is-invalid" : ""}`}
                        value={form.text}
                        onChange={handleChange}
                        required
                    />
                    {errors.text && <div className="invalid-feedback">{errors.text}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Imagen (URL)</label>
                    <input
                        type="text"
                        name="sceneImage"
                        className={`form-control ${errors.sceneImage ? "is-invalid" : ""}`}
                        value={form.sceneImage}
                        onChange={handleChange}
                    />
                    {errors.sceneImage && <div className="invalid-feedback">{errors.sceneImage}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Tipo de final</label>
                    <select
                        name="finalType"
                        className="form-control"
                        value={form.finalType}
                        onChange={handleChange}
                    >
                        <option value="N">Ninguno</option>
                        <option value="W">Victoria</option>
                        <option value="L">Derrota</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">¿Es final?</label>
                    <select
                        name="isEnd"
                        className="form-control"
                        value={form.isEnd}
                        onChange={handleChange}
                    >
                        <option value="0">No</option>
                        <option value="1">Sí</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Aventura</label>
                    <select
                        name="adventureId"
                        className={`form-control ${errors.adventureId ? "is-invalid" : ""}`}
                        value={form.adventureId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una aventura</option>
                        {adventures.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.title}
                            </option>
                        ))}
                    </select>
                    {errors.adventureId && <div className="invalid-feedback">{errors.adventureId}</div>}
                </div>

                <button className="btn btn-primary">
                    {isEditing ? "Guardar cambios" : "Crear escena"}
                </button>

            </form>
        </div>
    );
}
