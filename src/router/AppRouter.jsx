import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdventuresListPage from "../pages/AdventuresListPage";
import AdventureStartPage from "../pages/AdventureStartPage";
import ScenePage from "../pages/ScenePage";
import ProfilePage from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
    const { user } = useAuth();

    const PrivateRoute = ({ children }) => {
        return user ? children : <Navigate to="/login" replace />;
    };

    const AdminRoute = ({ children }) => {
        return user && user.role === "ADMIN"
        ? children
        : <Navigate to="/" replace />;
    };

    return (
        <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
                path="/aventuras"
                element={
                    <ProtectedRoute>
                    <AdventuresListPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/aventuras/:id" element={<AdventureStartPage />} />
            <Route path="/aventuras/:id/escena/:sceneId" element={<ScenePage />} />

            <Route
            path="/perfil"
            element={
                <PrivateRoute>
                <ProfilePage />
                </PrivateRoute>
            }
            />

            <Route
            path="/admin"
            element={
                <AdminRoute>
                <AdminPage />
                </AdminRoute>
            }
            />

            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
    );
}
