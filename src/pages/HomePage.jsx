import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
    const [adventures, setAdventures] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchAdventures = async () => {
            try {
                const response = await axios.get("https://api-aventura.onrender.com/adventures", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAdventures(response.data.slice(0, 3));
            } catch (error) {
                console.error("Error cargando aventuras:", error);
            }
        };

        fetchAdventures();
    }, []);

    return (
        <div className="container home-container">

            <section className="hero-section text-center d-flex flex-column justify-content-center align-items-center">
                <div className="hero-overlay"></div>

                <h1 className="hero-title position-relative">Aventuras Interactivas JI9</h1>
                <p className="hero-subtitle position-relative">
                    Elige tu camino. Vive tu historia. Comparte tu destino.
                </p>

                <Link to="/aventuras" className="btn btn-primary btn-lg mt-4 position-relative">
                    Comenzar Aventura
                </Link>
            </section>

            <section className="mt-5 text-center">
                <h2 className="section-title">Explora nuevas historias</h2>
                <p className="section-text">
                    Sumérgete en aventuras únicas donde cada decisión importa.  
                    Descubre finales distintos, comparte tus resultados y vuelve a intentarlo.
                </p>
            </section>

            <section className="row mt-4 g-4">
                {adventures.length === 0 ? (
                    <p className="text-center">Cargando aventuras... (Por favor incicia sesión o regístrate para poder ver las aventuras)</p>
                ) : (
                    adventures.map((adv) => (
                        <div className="col-md-4" key={adv.id}>
                            <div className="card p-3 home-card shadow-sm">

                                <div className="home-image-wrapper">
                                    <img
                                        src={adv.titleImage || "https://via.placeholder.com/400x200?text=Aventura"}
                                        alt={adv.title}
                                        className="home-image"
                                    />
                                </div>

                                <h3 className="card-title mt-3">{adv.title}</h3>

                                <p className="card-text">
                                    {adv.description}
                                </p>

                                <Link to={`/aventuras/${adv.id}`} className="btn btn-primary mt-2">
                                    Jugar
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </section>

        </div>
    );
}
