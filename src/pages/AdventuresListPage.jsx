import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdventuresListPage() {
    const [adventures, setAdventures] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchAdventures = async () => {
            try {
                const response = await axios.get("http://localhost:8080/adventures", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setAdventures(response.data);

            } catch (error) {
                console.error("Error cargando aventuras:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdventures();
    }, []);

    if (loading) {
        return (
        <div className="container text-center mt-5">
            <h2 className="section-title">Cargando aventuras...</h2>
        </div>
        );
    }

    return (
        <div className="container adventures-container">
            <h1 className="section-title text-center mb-4">Aventuras disponibles</h1>

            <div className="row g-4">
                {adventures.map((adv) => (
                    <div className="col-md-4" key={adv.id}>
                        <div className="card adventure-card p-3 shadow-sm">

                        <div className="adventure-image-wrapper">
                            <img
                            src={adv.titleImage || "https://via.placeholder.com/400x200?text=Aventura"}
                            alt={adv.title}
                            className="adventure-image"
                            />
                        </div>

                        <h3 className="adventure-title mt-3">{adv.title}</h3>

                        <p className="adventure-description">
                            {adv.description}
                        </p>

                        <Link to={`/aventuras/${adv.id}`} className="btn btn-primary w-100 mt-2">
                            Jugar
                        </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
