import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function AdventureStartPage() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [adventure, setAdventure] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const advRes = await axios.get(`http://localhost:8080/adventures/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setAdventure(advRes.data);

                const progRes = await axios.get(`http://localhost:8080/progress/adventure/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setProgress(progRes.data);

            } catch (error) {
                console.error("Error cargando aventura:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, token]);

    if (loading) {
        return <p className="text-center mt-5">Cargando aventura...</p>;
    }

    if (!adventure) {
        return <p className="text-center mt-5">No se encontró la aventura.</p>;
    }

    return (
        <div className="container adventure-start-container">

            <div className="adventure-card shadow-lg p-4">

                <div className="adventure-image-wrapper">
                    <img
                        src={adventure.titleImage || "https://via.placeholder.com/800x400?text=Aventura"}
                        alt={adventure.title}
                        className="adventure-image"
                    />
                </div>

                <h1 className="adventure-title mt-4">{adventure.title}</h1>

                <p className="adventure-description mt-3">
                    {adventure.description}
                </p>

                <div className="d-flex flex-column flex-md-row gap-3 mt-4">

                    <button
                        className="btn btn-primary btn-lg flex-fill"
                        onClick={() => navigate(`/aventuras/${id}/jugar?start=true`)}
                    >
                        Comenzar aventura
                    </button>

                    {progress && (
                        <button
                            className="btn btn-outline-light btn-lg flex-fill"
                            onClick={() => navigate(`/aventuras/${id}/jugar?continue=true`)}
                        >
                            Continuar progreso
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}
