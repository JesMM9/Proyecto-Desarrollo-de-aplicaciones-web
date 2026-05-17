import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function AdventureStartPage() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [adventure, setAdventure] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const advRes = await axios.get(
                    `http://localhost:8080/adventures/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setAdventure(advRes.data);

                const progRes = await axios.get(
                    `http://localhost:8080/progress/user/${userId}/adventure/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setProgress(progRes.data);

            } catch (error) {
                console.error("Error cargando aventura o progreso:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, token, userId]);

    const handleStartAdventure = () => {
        const firstSceneId = adventure.scenes[0].id;
        navigate(`/aventuras/${id}/escena/${firstSceneId}`);
    };

    const handleContinueAdventure = () => {
        const currentSceneId = progress[0].currentSceneId;
        navigate(`/aventuras/${id}/escena/${currentSceneId}`);
    };

    if (loading) return <p className="text-center mt-5">Cargando aventura...</p>;
    if (!adventure) return <p className="text-center mt-5">No se encontró la aventura.</p>;

    return (
        <div className="container adventure-start-container">
            <div className="adventure-card shadow-lg p-4">

                <div className="adventure-image-wrapper">
                    <img
                        src={adventure.titleImage}
                        alt={adventure.title}
                        className="adventure-image"
                    />
                </div>

                <h1 className="adventure-title mt-4">{adventure.title}</h1>

                <p className="adventure-description mt-3">{adventure.description}</p>

                <div className="d-flex flex-column flex-md-row gap-3 mt-4">
                    <button className="btn btn-primary btn-lg flex-fill" onClick={handleStartAdventure}>
                        Comenzar aventura
                    </button>

                    {progress && progress.length > 0 && (
                        <button className="btn btn-outline-light btn-lg flex-fill" onClick={handleContinueAdventure}>
                            Continuar progreso
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}
