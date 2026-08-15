import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../App.css";

export default function Settings() {

    const navigate = useNavigate();

    const [showLogoutConfirm, setShowLogoutConfirm] =
        useState(false);

    const [emailNotifications, setEmailNotifications] =
        useState(true);

    const [applicationReminders, setApplicationReminders] =
        useState(true);


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


    // =========================
    // SAVE SETTINGS
    // =========================

    const saveSettings = () => {

        const settings = {
            emailNotifications,
            applicationReminders
        };

        localStorage.setItem(
            "settings",
            JSON.stringify(settings)
        );

        alert("Settings saved successfully!");
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


                {/* MENU */}

                <nav className="sidebar-menu">

                    {/* DASHBOARD */}

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
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


                    {/* APPLICATIONS */}

                    <NavLink
                        to="/applications"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
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


                    {/* PROFILE */}

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
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


                    {/* SETTINGS */}

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
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
                            ⚙️
                        </div>

                        <div>

                            <h1 className="main-title">
                                Settings
                            </h1>

                            <p className="welcome-text">
                                Manage your Job Application Tracker settings
                            </p>

                        </div>

                    </div>

                </div>


                {/* =========================
                    SETTINGS CONTENT
                ========================= */}

                <div className="settings-page">


                    {/* GENERAL SETTINGS */}

                    <div className="settings-card">

                        <h2>
                            ⚙️ General Settings
                        </h2>

                        <p className="settings-description">
                            Manage your application tracker preferences.
                        </p>


                        {/* EMAIL NOTIFICATIONS */}

                        <div className="setting-row">

                            <div>

                                <h3>
                                    Email Notifications
                                </h3>

                                <p>
                                    Receive notifications about your job applications.
                                </p>

                            </div>

                            <label className="switch">

                                <input
                                    type="checkbox"
                                    checked={emailNotifications}
                                    onChange={(e) =>
                                        setEmailNotifications(
                                            e.target.checked
                                        )
                                    }
                                />

                                <span className="slider"></span>

                            </label>

                        </div>


                        {/* APPLICATION REMINDERS */}

                        <div className="setting-row">

                            <div>

                                <h3>
                                    Application Reminders
                                </h3>

                                <p>
                                    Get reminders to follow up on applications.
                                </p>

                            </div>

                            <label className="switch">

                                <input
                                    type="checkbox"
                                    checked={applicationReminders}
                                    onChange={(e) =>
                                        setApplicationReminders(
                                            e.target.checked
                                        )
                                    }
                                />

                                <span className="slider"></span>

                            </label>

                        </div>


                        {/* SAVE */}

                        <button
                            className="settings-save-button"
                            onClick={saveSettings}
                        >
                            💾 Save Settings
                        </button>

                    </div>


                    {/* ACCOUNT SETTINGS */}

                    <div className="settings-card">

                        <h2>
                            👤 Account
                        </h2>

                        <p className="settings-description">
                            Manage your account information.
                        </p>


                        <div className="settings-buttons">

                            <button
                                onClick={() =>
                                    navigate("/profile")
                                }
                            >
                                👤 Go to Profile
                            </button>


                            <button
                                onClick={() =>
                                    setShowLogoutConfirm(true)
                                }
                            >
                                🚪 Logout
                            </button>

                        </div>

                    </div>


                    {/* APPLICATION SETTINGS */}

                    <div className="settings-card">

                        <h2>
                            📊 Application Tracker
                        </h2>

                        <p className="settings-description">
                            Manage your job application tracking system.
                        </p>


                        <div className="settings-buttons">

                            <button
                                onClick={() =>
                                    navigate("/applications")
                                }
                            >
                                📊 View Applications
                            </button>


                            <button
                                onClick={() =>
                                    navigate("/")
                                }
                            >
                                🏠 Back to Dashboard
                            </button>

                        </div>

                    </div>

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
                                    setShowLogoutConfirm(false)
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