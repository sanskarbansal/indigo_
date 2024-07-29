// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminHomePage from "./components/Admin/AdminHomePage";
import CreateFlight from "./components/Admin/CreateFlight";
import FlightList from "./components/Admin/FlightList";
import UserHomePage from "./components/User/HomePage";
import Flights from "./components/User/Flights";

const App = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path=""
                    element={
                        <ProtectedRoute roles={["user"]}>
                            <UserHomePage />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/notifications" element={<h1>Notifications</h1>} />
                    <Route index element={<Flights />} />
                </Route>

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute roles={["admin"]}>
                            <AdminHomePage />
                        </ProtectedRoute>
                    }
                >
                    <Route path="create-flight" element={<CreateFlight />} />
                    <Route index element={<FlightList />} />
                </Route>
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;
