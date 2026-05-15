import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function ScenePage() {
    const { advId, sceneId } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [scene, setScene] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScene = async () => {
            try {
                const res = await axios.get(
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

    if (loading) {
        return <p className="text-center mt-5">Cargando escena...</p>;
    }

    if (!scene) {
        return <p className="text-center mt-5">No se encontró la escena.</p>;
    }

    return (
        <div className="container scene-container">

            <div className="scene-card shadow-lg p-4">

                <h1 className="scene-title">{scene.sceneTitle}</h1>

                <p className="scene-text mt-3">
                    {scene.text}
                </p>

                <div className="options-container mt-4">
                    {scene.optionsToBeOrigin?.length > 0 ? (
                        scene.optionsToBeOrigin.map((opt) => (
                            <button
                                key={opt.id}
                                className="btn btn-primary w-100 mb-3 option-btn"
                                onClick={() => handleOptionClick(opt.sceneDestinationOfOption.id)}
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
