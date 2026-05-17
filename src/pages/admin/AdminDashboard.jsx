import { Link } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="container mt-5">
            <h1>Panel de Administración</h1>

            <div className="d-flex flex-column gap-3 mt-4">

                <Link to="/admin/aventuras" className="btn btn-primary">
                    Gestionar Aventuras
                </Link>

                <Link to="/admin/escenas" className="btn btn-primary">
                    Gestionar Escenas
                </Link>

                <Link to="/admin/opciones" className="btn btn-primary">
                    Gestionar Opciones
                </Link>

                <Link to="/admin/usuarios" className="btn btn-primary">
                    Gestionar Usuarios
                </Link>

            </div>
        </div>
    );
}