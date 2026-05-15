export default function HomePage() {
    return (
        <div className="container home-container">

            <section className="hero-section text-center d-flex flex-column justify-content-center align-items-center">
                <div className="hero-overlay"></div>

                <h1 className="hero-title position-relative">Aventura Interactiva JI9</h1>
                <p className="hero-subtitle position-relative">
                    Elige tu camino. Vive tu historia. Comparte tu destino.
                </p>

                <a href="/aventuras" className="btn btn-primary btn-lg mt-4 position-relative">
                    Comenzar Aventura
                </a>
            </section>

            <section className="mt-5 text-center">
                <h2 className="section-title">Explora nuevas historias</h2>
                <p className="section-text">
                Sumérgete en aventuras únicas donde cada decisión importa.  
                Descubre finales distintos, comparte tus resultados y vuelve a intentarlo.
                </p>
            </section>

            <section className="row mt-4 g-4">
                <div className="col-md-4">
                    <div className="card p-3 home-card">
                        <h3 className="card-title">Aventura Fantástica</h3>
                        <p>Explora mundos mágicos llenos de criaturas y misterios.</p>
                        <a href="/aventuras" className="btn btn-primary mt-2">Jugar</a>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-3 home-card">
                        <h3 className="card-title">Aventura de Misterio</h3>
                        <p>Descubre secretos ocultos y resuelve enigmas peligrosos.</p>
                        <a href="/aventuras" className="btn btn-primary mt-2">Jugar</a>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-3 home-card">
                        <h3 className="card-title">Aventura Espacial</h3>
                        <p>Viaja por la galaxia y decide el destino de la humanidad.</p>
                        <a href="/aventuras" className="btn btn-primary mt-2">Jugar</a>
                    </div>
                </div>
            </section>

        </div>
    );
}
