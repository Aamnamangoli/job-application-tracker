import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";


// =========================
// PROTECTED ROUTE
// =========================

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    return children;
}


// =========================
// APP
// =========================

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================
                    LOGIN
                ========================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* =========================
                    REGISTER
                ========================= */}

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    ROOT
                    REDIRECT TO DASHBOARD
                ========================= */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />


                {/* =========================
                    DASHBOARD
                ========================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    APPLICATIONS
                ========================= */}

                <Route
                    path="/applications"
                    element={
                        <ProtectedRoute>
                            <Applications />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    PROFILE
                ========================= */}

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    SETTINGS
                ========================= */}

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    UNKNOWN PAGE
                ========================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;