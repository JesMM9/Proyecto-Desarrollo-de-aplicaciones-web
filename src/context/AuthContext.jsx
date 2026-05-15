import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);

                setUser({
                    id: decoded.id,
                    username: decoded.sub,
                    role: decoded.role
                });

            } catch (err) {
                console.error("Token inválido", err);
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            }
        }
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        const decoded = jwtDecode(newToken);

        setUser({
            id: decoded.id,
            username: decoded.sub,
            role: decoded.role
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
