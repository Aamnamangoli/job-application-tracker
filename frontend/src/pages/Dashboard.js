import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import "../App.css";

export default function Dashboard() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);

    const [showLogoutConfirm, setShowLogoutConfirm] =
        useState(false);


    // =========================
    // FETCH APPLICATIONS
    // =========================

    const fetchApplications = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/applications",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setApplications(response.data);

        } catch (error) {

            console.error(
                "Error fetching applications:",
                error
            );

        }

    };


    useEffect(() => {

        fetchApplications();

    }, []);


    // =========================
    // DASHBOARD COUNTS
    // =========================

    const totalApplications =
        applications.length;

    const appliedCount =
        applications.filter(
            (app) =>
                app.status === "Applied"
        ).length;

    const interviewCount =
        applications.filter(
            (app) =>
                app.status === "Interview"
        ).length;

    const selectedCount =
        applications.filter(
            (app) =>
                app.status === "Selected"
        ).length;

    const rejectedCount =
        applications.filter(
            (app) =>
                app.status === "Rejected"
        ).length;


    // =========================
    // BAR GRAPH DATA
    // =========================

    const chartData = [

        {
            status: "Applied",
            count: appliedCount
        },

        {
            status: "Interview",
            count: interviewCount
        },

        {
            status: "Selected",
            count: selectedCount
        },

        {
            status: "Rejected",
            count: rejectedCount
        }

    ];


    // =========================
    // LOGOUT
    // =========================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", {
            replace: true
        });

    };


    const confirmLogout = () => {

        setShowLogoutConfirm(false);

        logout();

    };


    return (

        <div className="app-layout">


            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="sidebar">


                {/* BRAND */}

                <div className="sidebar-brand">

                    <div className="sidebar-logo">
                        💼
                    </div>

                    <div>

                        <h2>
                            Job Tracker
                        </h2>

                        <span>
                            Placement Manager
                        </span>

                    </div>

                </div>


                {/* NAVIGATION */}

                <nav className="sidebar-menu">


                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive
                                    ? "active"
                                    : ""
                            }`
                        }
                    >

                        <span className="sidebar-icon">
                            🏠
                        </span>

                        <span>
                            Dashboard
                        </span>

                    </NavLink>


                    <NavLink
                        to="/applications"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive
                                    ? "active"
                                    : ""
                            }`
                        }
                    >

                        <span className="sidebar-icon">
                            📊
                        </span>

                        <span>
                            Applications
                        </span>

                    </NavLink>


                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive
                                    ? "active"
                                    : ""
                            }`
                        }
                    >

                        <span className="sidebar-icon">
                            👤
                        </span>

                        <span>
                            Profile
                        </span>

                    </NavLink>


                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive
                                    ? "active"
                                    : ""
                            }`
                        }
                    >

                        <span className="sidebar-icon">
                            ⚙️
                        </span>

                        <span>
                            Settings
                        </span>

                    </NavLink>


                </nav>


                {/* LOGOUT */}

                <div className="sidebar-bottom">

                    <button
                        className="sidebar-item logout-sidebar"
                        onClick={() =>
                            setShowLogoutConfirm(true)
                        }
                    >

                        <span className="sidebar-icon">
                            🚪
                        </span>

                        <span>
                            Logout
                        </span>

                    </button>

                </div>


            </aside>


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="main-content">


                {/* MOBILE HEADER */}

                <div className="mobile-header">

                    <div className="mobile-brand">
                        💼 Job Tracker
                    </div>

                </div>


                {/* =========================
                    TOP HEADER
                ========================= */}

                <div className="top-bar">

                    <div className="brand-section">

                        <div className="brand-icon">
                            💼
                        </div>

                        <div>

                            <h1 className="main-title">
                                Dashboard
                            </h1>

                            <p className="welcome-text">
                                Overview of your job applications
                            </p>

                        </div>

                    </div>

                </div>


                {/* =========================
                    DASHBOARD CARDS
                ========================= */}

                <div className="dashboard">


                    <div className="card">

                        <h3>
                            Total Applications
                        </h3>

                        <h2>
                            {totalApplications}
                        </h2>

                    </div>


                    <div className="card">

                        <h3>
                            Applied
                        </h3>

                        <h2>
                            {appliedCount}
                        </h2>

                    </div>


                    <div className="card">

                        <h3>
                            Interviews
                        </h3>

                        <h2>
                            {interviewCount}
                        </h2>

                    </div>


                    <div className="card">

                        <h3>
                            Selected
                        </h3>

                        <h2>
                            {selectedCount}
                        </h2>

                    </div>


                    <div className="card">

                        <h3>
                            Rejected
                        </h3>

                        <h2>
                            {rejectedCount}
                        </h2>

                    </div>


                </div>


                {/* =========================
                    APPLICATION STATUS GRAPH
                ========================= */}

                <div className="chart-container">

                    <h2>
                        Application Status
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 20
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="status"
                            />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="count"
                                name="Applications"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>


            </main>


            {/* =========================
                LOGOUT CONFIRMATION
            ========================= */}

            {showLogoutConfirm && (

                <div className="logout-overlay">

                    <div className="logout-modal">

                        <h2>
                            Logout?
                        </h2>

                        <p>
                            Are you sure you want to logout?
                        </p>


                        <div className="logout-modal-actions">

                            <button
                                className="cancel-logout"
                                onClick={() =>
                                    setShowLogoutConfirm(
                                        false
                                    )
                                }
                            >
                                Cancel
                            </button>


                            <button
                                className="confirm-logout"
                                onClick={confirmLogout}
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            )}


        </div>

    );

}