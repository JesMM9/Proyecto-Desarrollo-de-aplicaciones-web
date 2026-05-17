import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axiosConfig";

export default function ScenePage() {
    const { id: advId, sceneId } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [scene, setScene] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScene = async () => {
            try {
                const res = await api.get(
                    `http://localhost:8080/scenes/${sceneId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setScene(res.data);
            } catch (error) {
                console.error("Error cargando escena:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScene();
    }, [sceneId, token]);

    const handleOptionClick = (destinationId) => {
        navigate(`/aventuras/${advId}/escena/${destinationId}`);
    };

    if (loading) return <p className="text-center mt-5">Cargando escena...</p>;
    if (!scene) return <p className="text-center mt-5">No se encontró la escena.</p>;

    const deathText = localStorage.getItem("deathText");

    return (
        <div className="container scene-container">

            <div className="scene-card shadow-lg p-4">

                <h1 className="scene-title mb-3">{scene.sceneTitle}</h1>

                <p className="scene-text mb-4">{scene.text}</p>

                {scene.finalType === "M" && (
                    <div className="death-box mt-4 p-3 text-center">
                        {deathText && (
                            <p className="mt-3 fw-semibold">{deathText}</p>
                        )}
                    </div>
                )}

                {scene.sceneImage && (
                    <div className="scene-image-wrapper mb-4">
                        <img
                            src={scene.sceneImage}
                            alt={scene.sceneTitle}
                            className="scene-image"
                        />
                    </div>
                )}

                <button
                    className="btn btn-warning w-100 mb-4"
                    onClick={async () => {
                        try {
                            const user = JSON.parse(localStorage.getItem("user"));

                            const payload = {
                                id: 0,
                                completed: 0,
                                lastGameDate: new Date().toISOString(),
                                userId: user.id,
                                adventureId: Number(advId),
                                adventureTitle: "",
                                currentSceneId: Number(sceneId),
                                currentSceneTitle: scene.sceneTitle
                            };

                            await api.post(
                                "http://localhost:8080/progress",
                                payload,
                                {
                                    headers: { Authorization: `Bearer ${token}` }
                                }
                            );

                            alert("Progreso guardado correctamente");

                        } catch (error) {
                            console.error("Error guardando progreso:", error);
                            alert("No se pudo guardar el progreso");
                        }
                    }}
                >
                    Guardar progreso
                </button>

                <div className="options-container mt-4">
                    {scene.options?.length > 0 ? (
                        scene.options.map((opt) => (
                            <button
                                key={opt.id}
                                className="btn btn-primary w-100 mb-3 option-btn"
                                onClick={() => {
                                    if (opt.deathText) {
                                        localStorage.setItem("deathText", opt.deathText);
                                    } else {
                                        localStorage.removeItem("deathText");
                                    }
                                    handleOptionClick(opt.destinationSceneId);
                                }}
                            >
                                {opt.optionText}
                            </button>
                        ))
                    ) : (
                        <div className="text-center mt-4">
                            <p className="final-text">Fin de la aventura</p>

                            <button
                                className="btn btn-outline-light mt-3"
                                onClick={() => navigate(`/aventuras/${advId}`)}
                            >
                                Volver al inicio
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
