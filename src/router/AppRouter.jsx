import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdventuresListPage from "../pages/AdventuresListPage";
import AdventureStartPage from "../pages/AdventureStartPage";
import ScenePage from "../pages/ScenePage";
import ProfilePage from "../pages/ProfilePage";
import { useAuth } from "../hooks/useAuth";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdventureList from "../pages/admin/AdventureList";
import AdventureForm from "../pages/admin/AdventureForm";
import SceneList from "../pages/admin/SceneList";
import SceneForm from "../pages/admin/SceneForm";
import OptionList from "../pages/admin/OptionList";
import OptionForm from "../pages/admin/OptionForm";
import UserList from "../pages/admin/UserList";
import UserForm from "../pages/admin/UserForm";

export default function AppRouter() {
    const { user } = useAuth();

    const PrivateRoute = ({ children }) => {
        return user ? children : <Navigate to="/login" replace />;
    };

    const AdminRoute = ({ children }) => {
        return user && user.role === "admin"
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
                    <PrivateRoute>
                        <AdventuresListPage />
                    </PrivateRoute>
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
                        <AdminDashboard />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/aventuras"
                element={
                    <AdminRoute>
                        <AdventureList />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/aventuras/nueva"
                element={
                    <AdminRoute>
                        <AdventureForm />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/aventuras/:id"
                element={
                    <AdminRoute>
                        <AdventureForm />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/escenas"
                element={
                    <AdminRoute>
                        <SceneList />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/escenas/nueva"
                element={
                    <AdminRoute>
                        <SceneForm />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/escenas/:id"
                element={
                    <AdminRoute>
                        <SceneForm />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/opciones"
                element={
                    <AdminRoute>
                        <OptionList />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/opciones/nueva"
                element={
                    <AdminRoute>
                        <OptionForm />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/opciones/:id"
                element={
                    <AdminRoute>
                        <OptionForm />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/usuarios"
                element={
                    <AdminRoute>
                        <UserList />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/usuarios/:id"
                element={
                    <AdminRoute>
                        <UserForm />
                    </AdminRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
    );
}
