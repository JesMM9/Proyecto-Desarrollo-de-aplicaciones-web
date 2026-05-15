import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg px-3 custom-navbar">
            <Link className="navbar-brand fw-bold" to="/">
                Aventuras Interactivas JI9
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/aventuras">
                            Aventuras
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav ms-auto">

                    {!user && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Registro</Link>
                            </li>
                        </>
                    )}

                    {user && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/perfil">Perfil</Link>
                            </li>

                            <li className="nav-item">
                                <span
                                    className="nav-link logout-link"
                                    onClick={logout}
                                    role="button"
                                >
                                    Cerrar sesión
                                </span>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    );
}
