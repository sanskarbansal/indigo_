// src/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios, { updateToken } from "./axiosInstance";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        return token ? { loggedIn: true, token, role } : null;
    });

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get(`/flights`);
                setFlights(response.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };

        fetchFlights();
    }, []);

    useEffect(() => {
        updateToken(auth?.token);
    }, [auth?.token]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // updateToken()
                const response = await axios.get("/auth/profile", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
                setAuth({ loggedIn: true, token: response.data.token, role: response.data.role });
                localStorage.setItem("role", response.data.role);
            } catch (err) {
                setAuth(null);
                localStorage.removeItem("token");
                localStorage.removeItem("role");
            }
        };

        checkAuth();
    }, []);
    const createFlight = async (data) => {
        try {
            const response = await axios.post("/flights", data);
            setFlights([...flights, response.data]);
        } catch (err) {
            console.error("Error creating post:", err);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post("/auth/login", { email, password });
            setAuth({ loggedIn: true, token: response.data.token, role: response.data.role });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            return response.data;
        } catch (err) {
            console.error("Error logging in:", err);
        }
    };

    const register = async (email, password, role) => {
        await axios.post(`/auth/register`, { email, password, role });
    };

    const logout = async () => {
        localStorage.removeItem("token");
        setAuth(false);
    };

    return <AuthContext.Provider value={{ auth, setAuth, login, register, logout, createFlight, flights }}>{children}</AuthContext.Provider>;
};
